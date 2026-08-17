// ============================================================================
// ACF "Theme Settings" options page — global settings (logo, CTA, socials…).
//
// Three fields are now stored per-language in ACF (en / fr / ru):
//   - Header CTA Button Link  -> header_cta_button_link_en / _fr / _ru
//   - Footer Description      -> footer_description_en / _fr / _ru
//   - Copyright Text          -> copyright_text_en / _fr / _ru
//
// The GraphQL query below aliases the correct language-specific field back
// onto the original, language-agnostic key (heroCtaButtonLink,
// footerDescription, copyrightText), so every other type/consumer in the
// codebase is untouched — only the query changes based on `locale`.
// ============================================================================

import { fetchGraphQL } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Locale = "en" | "fr" | "ru";

export const SUPPORTED_LOCALES: Locale[] = ["en", "fr", "ru"];
export const DEFAULT_LOCALE: Locale = "en";

export interface ThemeSettingsIcon {
  sourceUrl: string;
  altText: string;
}

export interface ThemeSettingsCta {
  url: string;
  title: string | null;
  target: string | null;
}

export interface ThemeSettings {
  /** Logo image URL (typically SVG) */
  logoUrl: string | null;

  /** Header CTA button — resolved for the requested locale */
  headerCta: ThemeSettingsCta | null;

  /** Contact numbers */
  phoneNumber: string | null;
  whatsappNumber: string | null;
  emailAddress: string | null;

  /** Icon overrides from WordPress (SVG or raster) */
  phoneIcon: ThemeSettingsIcon | null;
  whatsappIcon: ThemeSettingsIcon | null;

  /** Footer fields — resolved for the requested locale */
  footerDescription: string | null;
  copyrightText: string | null;
  footerAddress: string | null;
  footerWorkingHours: string | null;

  /** Socials */
  socialFacebook: string | null;
  socialInstagram: string | null;
  socialYoutube: string | null;
  socialTiktok: string | null;
  socialX: string | null;
  socialLinkedin: string | null;
  socialPinterest: string | null;
  customSocials: { name: string; url: string }[] | null;
}

// ---------------------------------------------------------------------------
// Locale helpers
// ---------------------------------------------------------------------------

function resolveLocale(locale?: string | null): Locale {
  if (locale && (SUPPORTED_LOCALES as string[]).includes(locale)) {
    return locale as Locale;
  }
  return DEFAULT_LOCALE;
}

/** Capitalized suffix used to build the ACF/WPGraphQL field names, e.g. "En" | "Fr" | "Ru" */
function localeSuffix(locale: Locale): string {
  return locale.charAt(0).toUpperCase() + locale.slice(1);
}

// ---------------------------------------------------------------------------
// GraphQL query (built dynamically so we only ask for the fields we need)
// ---------------------------------------------------------------------------

function buildThemeSettingsQuery(locale: Locale): string {
  const suffix = localeSuffix(locale); // "En" | "Fr" | "Ru"

  return `
    query GetThemeSettings {
      themeSettings {
        themeSettingsFields {
          themeLogo {
            node {
              sourceUrl
              altText
            }
          }
          heroCtaButtonLink: heroCtaButtonLink${suffix} {
            url
            title
            target
          }
          phoneNumber
          whatsappNumber
          emailAddress
          phoneIcon {
            node {
              sourceUrl
              altText
            }
          }
          whatsappIcon {
            node {
              sourceUrl
              altText
            }
          }
          footerDescription: footerDescription${suffix}
          copyrightText: copyrightText${suffix}
          footerAddress
          footerWorkingHours
          socialFacebook
          socialInstagram
          socialYoutube
          socialTiktok
          socialX
          socialLinkedin
          socialPinterest
          customSocials {
            name
            url
          }
        }
      }
    }
  `;
}

// ---------------------------------------------------------------------------
// Raw response shape (mirrors WPGraphQL's camelCase output)
// ---------------------------------------------------------------------------

type RawThemeSettings = {
  themeSettings: {
    themeSettingsFields: {
      themeLogo: { node: { sourceUrl: string; altText: string } } | null;
      // Aliased in the query above, so the shape at this key is always the
      // language-agnostic one regardless of which locale field was queried.
      heroCtaButtonLink: { url: string; title: string | null; target: string | null } | null;
      phoneNumber: string | null;
      whatsappNumber: string | null;
      emailAddress: string | null;
      phoneIcon: { node: { sourceUrl: string; altText: string } } | null;
      whatsappIcon: { node: { sourceUrl: string; altText: string } } | null;
      footerDescription: string | null;
      copyrightText: string | null;
      footerAddress: string | null;
      footerWorkingHours: string | null;
      socialFacebook: string | null;
      socialInstagram: string | null;
      socialYoutube: string | null;
      socialTiktok: string | null;
      socialX: string | null;
      socialLinkedin: string | null;
      socialPinterest: string | null;
      customSocials: { name: string | null; url: string | null }[] | null;
    };
  };
};

// ---------------------------------------------------------------------------
// Fetcher
// ---------------------------------------------------------------------------

/**
 * Fetch Theme Settings, resolving the per-language static-text fields
 * (Header CTA, Footer Description, Copyright Text) for the given locale.
 * Falls back to `DEFAULT_LOCALE` ("en") if an unsupported locale is passed.
 */
export async function getThemeSettings(
  locale: string | Locale = DEFAULT_LOCALE,
): Promise<ThemeSettings> {
  const resolvedLocale = resolveLocale(locale);

  const data = await fetchGraphQL<RawThemeSettings>(
    buildThemeSettingsQuery(resolvedLocale),
    {},
    // Cache tag is locale-scoped so switching languages doesn't serve a
    // stale, wrong-language response from cache.
    [`theme-settings-${resolvedLocale}`],
  );

  const ts = data.themeSettings.themeSettingsFields;

  return {
    logoUrl: ts.themeLogo?.node.sourceUrl ?? null,

    headerCta: ts.heroCtaButtonLink
      ? {
          url: ts.heroCtaButtonLink.url,
          title: ts.heroCtaButtonLink.title,
          target: ts.heroCtaButtonLink.target,
        }
      : null,

    phoneNumber: ts.phoneNumber ?? null,
    whatsappNumber: ts.whatsappNumber ?? null,
    emailAddress: ts.emailAddress ?? null,

    phoneIcon: ts.phoneIcon?.node
      ? { sourceUrl: ts.phoneIcon.node.sourceUrl, altText: ts.phoneIcon.node.altText }
      : null,

    whatsappIcon: ts.whatsappIcon?.node
      ? { sourceUrl: ts.whatsappIcon.node.sourceUrl, altText: ts.whatsappIcon.node.altText }
      : null,

    footerDescription: ts.footerDescription ?? null,
    copyrightText: ts.copyrightText ?? null,
    footerAddress: ts.footerAddress ?? null,
    footerWorkingHours: ts.footerWorkingHours ?? null,

    socialFacebook: ts.socialFacebook ?? null,
    socialInstagram: ts.socialInstagram ?? null,
    socialYoutube: ts.socialYoutube ?? null,
    socialTiktok: ts.socialTiktok ?? null,
    socialX: ts.socialX ?? null,
    socialLinkedin: ts.socialLinkedin ?? null,
    socialPinterest: ts.socialPinterest ?? null,
    customSocials: ts.customSocials
      ? ts.customSocials
          .filter((row) => row.name && row.url)
          .map((row) => ({ name: row.name as string, url: row.url as string }))
      : null,
  };
}
