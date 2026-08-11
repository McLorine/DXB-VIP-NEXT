// ============================================================================
// Low-level WPGraphQL fetch wrapper. Every query goes through this.
// ============================================================================

const endpoint = process.env.WORDPRESS_API_URL!;

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = [] // cache tags — enables revalidateTag() from the webhook route
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { tags },
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error(JSON.stringify(json.errors, null, 2));
    throw new Error("WPGraphQL returned errors — check server logs");
  }

  return json.data as T;
}
