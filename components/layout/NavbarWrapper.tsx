import Navbar from "./Navbar";

import { getMainNavigation } from "@/lib/wordpress/menu";
import { buildMenus } from "@/lib/wordpress/menuMapper";
import { getThemeSettings } from "@/lib/wordpress/themeSettings";

export default async function NavbarWrapper() {
  const [items, themeSettings] = await Promise.all([
    getMainNavigation(),
    getThemeSettings(),
  ]);

  const menus = buildMenus(items);

  return <Navbar menus={menus} themeSettings={themeSettings} />;
}