const WORDPRESS_GRAPHQL_URL = process.env.WORDPRESS_API_URL!;

const MENU_ID_BY_LANGUAGE: Record<string, number> = {
  en: 1003,
  ru: 1004,
  fr: 1005,
};

const FOOTER_MENU_ID_BY_LANGUAGE: Record<string, number> = {
  en: 1006,
  ru: 1007,
  fr: 1008,
};

const FOOTER_BOTTOM_MENU_ID_BY_LANGUAGE: Record<string, number> = {
  en: 1009,
  ru: 1010,
  fr: 1011,
};

export type WordPressMenuItem = {
  id: string;
  databaseId: number;
  label: string;
  url: string;
  parentId: string | null;

  navigationMenuItemSettings?: {
    description?: string | null;

    menuIcon?: {
      node?: {
        sourceUrl?: string | null;
        altText?: string | null;
      } | null;
    } | null;
  } | null;
};

type WordPressMenu = {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  menuItems: {
    nodes: WordPressMenuItem[];
  };
};

type MenusResponse = {
  menus: {
    nodes: WordPressMenu[];
  };
};

type GraphQLResponse = {
  data?: MenusResponse;
  errors?: unknown;
};

const MENU_FIELDS = `
  id
  databaseId
  name
  slug

  menuItems(first: 100) {
    nodes {
      id
      databaseId
      label
      url
      parentId

      navigationMenuItemSettings {
        description

        menuIcon {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

/**
 * Fetch a WordPress menu by database ID.
 *
 * Example:
 * getMenuById(12)
 */
async function fetchMenuByQuery(
  query: string,
  variables: Record<string, unknown>
): Promise<WordPressMenuItem[]> {
  const response = await fetch(WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed: ${response.status}`
    );
  }

  const json: GraphQLResponse = await response.json();

  if (json.errors) {
    console.error("WordPress GraphQL errors:", json.errors);
    throw new Error("WordPress GraphQL request returned errors");
  }

  const nodes = json.data?.menus?.nodes ?? [];
  return nodes.flatMap((menu) => menu.menuItems?.nodes ?? []);
}

export async function getMenuById(
  menuId: number
): Promise<WordPressMenuItem[]> {
  const attempts = [
    {
      label: `id:${menuId}`,
      query: `
        query GetMenuById($id: Int!) {
          menus(where: { id: $id }) {
            nodes {
              ${MENU_FIELDS}
            }
          }
        }
      `,
      variables: { id: menuId },
    },
    {
      label: `databaseId:${menuId}`,
      query: `
        query GetMenuByDatabaseId($id: Int!) {
          menus(where: { databaseId: $id }) {
            nodes {
              ${MENU_FIELDS}
            }
          }
        }
      `,
      variables: { id: menuId },
    },
  ];

  for (const attempt of attempts) {
    try {
      const items = await fetchMenuByQuery(attempt.query, attempt.variables);
      if (items.length > 0) {
        return items;
      }
    } catch (error) {
      console.warn(`Menu lookup failed for ${attempt.label}:`, error);
    }
  }

  console.warn(`No menu items found for menu ID ${menuId}. Check the WordPress menu ID or menu assignment.`);
  return [];
}

/**
 * Fetch a WordPress menu by slug.
 *
 * Useful if you prefer:
 * getMenuBySlug("main-navigation")
 */
export async function getMenuBySlug(
  slug: string
): Promise<WordPressMenuItem[]> {
  const query = `
    query GetMenuBySlug($slug: String!) {
      menus(where: { slug: $slug }) {
        nodes {
          ${MENU_FIELDS}
        }
      }
    }
  `;

  const response = await fetch(WORDPRESS_GRAPHQL_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
      variables: {
        slug,
      },
    }),

    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed: ${response.status}`
    );
  }

  const json: GraphQLResponse = await response.json();

  if (json.errors) {
    console.error("WordPress GraphQL errors:", json.errors);

    throw new Error(
      "WordPress GraphQL request returned errors"
    );
  }

  return (
    json.data?.menus.nodes[0]?.menuItems.nodes ?? []
  );
}

/**
 * Header / primary navigation.
 *
 * Uses the active WordPress locale to select the matching menu.
 */
export function getMenuIdForLanguage(language?: { slug?: string; code?: string } | string | null) {
  const slug = typeof language === "string" ? language : language?.slug ?? language?.code ?? "en";
  const normalized = slug.toLowerCase().replace(/[^a-z]/g, "");

  return MENU_ID_BY_LANGUAGE[normalized] ?? MENU_ID_BY_LANGUAGE.en;
}

function getLanguageKey(language?: { slug?: string; code?: string } | string | null) {
  const slug = typeof language === "string" ? language : language?.slug ?? language?.code ?? "en";
  const normalized = slug.toLowerCase().replace(/[^a-z]/g, "");

  return normalized in MENU_ID_BY_LANGUAGE ? normalized : "en";
}

export async function getMainNavigation(language?: { slug?: string; code?: string } | string | null) {
  const key = getLanguageKey(language);
  const menuId = MENU_ID_BY_LANGUAGE[key] ?? MENU_ID_BY_LANGUAGE.en;
  const items = await getMenuById(menuId);
  if (items.length > 0) return items;

  return getMenuByLocalizedName("main", key);
}

async function getMenuByLocalizedName(type: "main" | "footer" | "bottom", languageKey: string) {
  const candidates = [
    `${type}-${languageKey}`,
    `${type}_${languageKey}`,
    `${languageKey}-${type}`,
    `${languageKey}_${type}`,
    `${type.toUpperCase()}-${languageKey.toUpperCase()}`,
    `${type.toUpperCase()}_${languageKey.toUpperCase()}`,
  ];

  const allMenus = await getAllMenus();

  const found = allMenus.find((menu) => {
    const normalized = `${menu.name} ${menu.slug}`.toLowerCase();
    return candidates.some((candidate) => normalized.includes(candidate.toLowerCase()));
  });

  if (!found) {
    console.warn(`No ${type} menu found for locale ${languageKey}. Tried:`, candidates);
    return [];
  }

  return found.menuItems?.nodes ?? [];
}

async function getAllMenus(): Promise<WordPressMenu[]> {
  const query = `
    query GetAllMenus {
      menus {
        nodes {
          ${MENU_FIELDS}
        }
      }
    }
  `;

  const response = await fetch(WORDPRESS_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`WordPress GraphQL request failed: ${response.status}`);
  }

  const json: GraphQLResponse = await response.json();
  if (json.errors) {
    console.error("WordPress GraphQL errors:", json.errors);
    throw new Error("WordPress GraphQL request returned errors");
  }

  return json.data?.menus?.nodes ?? [];
}

/**
 * Main footer navigation.
 */
export async function getFooterNavigation(language?: { slug?: string; code?: string } | string | null) {
  const key = getLanguageKey(language);
  const menuId = FOOTER_MENU_ID_BY_LANGUAGE[key] ?? FOOTER_MENU_ID_BY_LANGUAGE.en;
  const items = await getMenuById(menuId);
  if (items.length > 0) return items;

  return getMenuByLocalizedName("footer", key);
}

/**
 * Bottom footer / useful links navigation.
 */
export async function getFooterBottomNavigation(language?: { slug?: string; code?: string } | string | null) {
  const key = getLanguageKey(language);
  const menuId = FOOTER_BOTTOM_MENU_ID_BY_LANGUAGE[key] ?? FOOTER_BOTTOM_MENU_ID_BY_LANGUAGE.en;
  const items = await getMenuById(menuId);
  if (items.length > 0) return items;

  return getMenuByLocalizedName("bottom", key);
}

/**
 * Normalize WordPress URLs so internal links
 * work correctly with Next.js.
 *
 * Example:
 * http://dxb-vip.local/about/
 * becomes:
 * /about/
 */
export function normalizeMenuUrl(url: string) {
  if (!url) {
    return "#";
  }

  try {
    const parsed = new URL(url);

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}

/**
 * Get only top-level menu items.
 */
export function getTopLevelMenuItems(
  menuItems: WordPressMenuItem[]
) {
  return menuItems.filter(
    (item) => !item.parentId
  );
}

/**
 * Get children of a specific menu item.
 */
export function getMenuChildren(
  menuItems: WordPressMenuItem[],
  parentId: string
) {
  return menuItems.filter(
    (item) => item.parentId === parentId
  );
}

