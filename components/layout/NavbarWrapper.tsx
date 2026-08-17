import Navbar from "./Navbar";

import { getMainNavigation } from "@/lib/wordpress/menu";
import { buildMenus } from "@/lib/wordpress/menuMapper";
import { getThemeSettings, type ThemeSettings } from "@/lib/wordpress/themeSettings";

export default async function NavbarWrapper() {
  const [enItems, ruItems, frItems, enTheme, ruTheme, frTheme] = await Promise.all([
    getMainNavigation("en"),
    getMainNavigation("ru"),
    getMainNavigation("fr"),
    getThemeSettings("en"),
    getThemeSettings("ru"),
    getThemeSettings("fr"),
  ]);

  const menusByLanguage = {
    en: buildMenus(enItems),
    ru: buildMenus(ruItems),
    fr: buildMenus(frItems),
  };

  const themeSettingsByLanguage: Record<string, ThemeSettings> = {
    en: enTheme,
    ru: ruTheme,
    fr: frTheme,
  };

  return <Navbar menusByLanguage={menusByLanguage} themeSettingsByLanguage={themeSettingsByLanguage} />;
}