const WORDPRESS_GRAPHQL_URL = process.env.WORDPRESS_API_URL!;

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
export async function getMenuById(
  menuId: number
): Promise<WordPressMenuItem[]> {
  const query = `
    query GetMenuById($id: Int!) {
      menus(where: { id: $id }) {
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
        id: menuId,
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
 * WordPress menu database ID: 12
 */
export async function getMainNavigation() {
  return getMenuById(2);
}

/**
 * Main footer navigation.
 *
 * WordPress menu database ID: 13
 */
export async function getFooterNavigation() {
  return getMenuById(2);
}

/**
 * Bottom footer / useful links navigation.
 *
 * Change this ID to the actual WordPress
 * database ID of your bottom menu.
 */
export async function getFooterBottomNavigation() {
  return getMenuById(2);
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

