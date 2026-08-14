// ============================================================================
// Low-level WPGraphQL fetch wrapper. Every query goes through this.
// ============================================================================

const endpoint = process.env.WORDPRESS_API_URL!;

export class GraphQLRequestError extends Error {
  errors: any[];
  constructor(message: string, errors: any[]) {
    super(message);
    this.name = "GraphQLRequestError";
    this.errors = errors;
  }
}

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = []
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
    // Don't log here — some callers (e.g. getContentByUri's front-page
    // fallback path) expect and handle specific GraphQL errors as normal
    // control flow, not failures. Let the caller decide whether to log.
    throw new GraphQLRequestError(
      "WPGraphQL returned errors — check server logs",
      json.errors
    );
  }

  return json.data as T;
}