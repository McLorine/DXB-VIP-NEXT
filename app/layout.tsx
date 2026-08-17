import type { Metadata } from "next";
import { headers } from "next/headers";
import { Tenor_Sans, Public_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/nav/MobileBar";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import {
  getFooterBottomNavigation,
  getFooterNavigation,
} from "@/lib/wordpress/menu";
import { getThemeSettings } from "@/lib/wordpress/themeSettings";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { toHtmlLang } from "@/lib/i18n/htmlLang";
import { getDocumentLanguage } from "@/lib/wordpress/getDocumentLanguage";

const tenorSans = Tenor_Sans({
  variable: "--font-tenor-sans",
  subsets: ["latin"],
  weight: ["400"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DXB VIP",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = (await headers()).get("x-dxb-pathname") ?? "/";

  const [documentLanguage, enTheme, ruTheme, frTheme, enFooterMenuItems, ruFooterMenuItems, frFooterMenuItems, enBottomMenuItems, ruBottomMenuItems, frBottomMenuItems] = await Promise.all([
    getDocumentLanguage(pathname),
    getThemeSettings("en"),
    getThemeSettings("ru"),
    getThemeSettings("fr"),
    getFooterNavigation("en"),
    getFooterNavigation("ru"),
    getFooterNavigation("fr"),
    getFooterBottomNavigation("en"),
    getFooterBottomNavigation("ru"),
    getFooterBottomNavigation("fr"),
  ]);

  const themeSettingsByLanguage = {
    en: enTheme,
    ru: ruTheme,
    fr: frTheme,
  };

  return (
    <html
      lang={toHtmlLang(documentLanguage)}
      className={`${tenorSans.variable} ${publicSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>

          <NavbarWrapper />

          <main>
            {children}
          </main>
          <Footer
            menusByLanguage={{
              en: enFooterMenuItems,
              ru: ruFooterMenuItems,
              fr: frFooterMenuItems,
            }}
            bottomMenusByLanguage={{
              en: enBottomMenuItems,
              ru: ruBottomMenuItems,
              fr: frBottomMenuItems,
            }}
            themeSettingsByLanguage={themeSettingsByLanguage}
          />
          <MobileBar themeSettingsByLanguage={themeSettingsByLanguage} />
        </LanguageProvider>

      </body>
    </html>
  );
}
