// ============================================================================
// ACF "Theme Settings" options page — global settings (logo, CTA, socials…).
// ============================================================================

import { fetchGraphQL } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

  /** Header CTA button */
  headerCta: ThemeSettingsCta | null;

  /** Contact numbers */
  phoneNumber: string | null;
  whatsappNumber: string | null;
  emailAddress: string | null;

  /** Icon overrides from WordPress (SVG or raster) */
  phoneIcon: ThemeSettingsIcon | null;
  whatsappIcon: ThemeSettingsIcon | null;

  /** Footer fields */
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
// GraphQL query
// ---------------------------------------------------------------------------

const THEME_SETTINGS_QUERY = `
  query GetThemeSettings {
    themeSettings {
      themeSettingsFields {
        themeLogo {
          node {
            sourceUrl
            altText
          }
        }
        heroCtaButtonLink {
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
        footerDescription
        copyrightText
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

// ---------------------------------------------------------------------------
// Raw response shape (mirrors WPGraphQL's camelCase output)
// ---------------------------------------------------------------------------

type RawThemeSettings = {
  themeSettings: {
    themeSettingsFields: {
      themeLogo: { node: { sourceUrl: string; altText: string } } | null;
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

export async function getThemeSettings(): Promise<ThemeSettings> {
  const data = await fetchGraphQL<RawThemeSettings>(
    THEME_SETTINGS_QUERY,
    {},
    ["theme-settings"],
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