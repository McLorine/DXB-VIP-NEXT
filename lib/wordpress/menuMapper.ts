import type { WordPressMenuItem } from "./menu";

export type MenuItem = {
  id: string;
  to: string;
  title: string;
  desc: string;
  icon?: string;
};

export type Menu = {
  id: string;
  label: string;
  path: string;
  intro?: string;
  items: MenuItem[];
};

function normalizeUrl(url: string) {
  try {
    const parsed = new URL(url);

    return (
      parsed.pathname +
      parsed.search +
      parsed.hash
    );
  } catch {
    return url;
  }
}

export function buildMenus(
  items: WordPressMenuItem[]
): Record<string, Menu> {
  const parents = items.filter(
    (item) => item.parentId === null
  );

  return Object.fromEntries(
    parents.map((parent) => {
      const children = items.filter(
        (item) => item.parentId === parent.id
      );

      return [
        parent.id,
        {
          id: parent.id,

          label: parent.label,

          path: normalizeUrl(parent.url),

          intro:
            parent
              .navigationMenuItemSettings
              ?.description
              ?.trim() || undefined,

          items: children.map((child) => ({
            id: child.id,

            to: normalizeUrl(child.url),

            title: child.label,

            desc:
              child
                .navigationMenuItemSettings
                ?.description
                ?.trim() ?? "",

            icon:
              child
                .navigationMenuItemSettings
                ?.menuIcon
                ?.node
                ?.sourceUrl ?? undefined,
          })),
        },
      ];
    })
  );
}