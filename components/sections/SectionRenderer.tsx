// ============================================================================
// Renders an array of page-builder blocks by looking each one up in the
// registry via its __typename. Unregistered types warn in dev, no-op in prod.
//
// The Blog Preview block is a special case: it doesn't carry its own posts
// (those are real WP posts, fetched separately in getPageBySlug and attached
// to the page as `latestPosts`). We inject that array as an extra prop only
// for that one block type.
// ============================================================================

import { SECTION_REGISTRY } from "./registry";
import { BLOG_PREVIEW_TYPENAME } from "@/lib/wordpress/fragments";
import type { PageBuilderBlock, WPPostSummary } from "@/lib/wordpress/types";

interface Props {
  blocks: PageBuilderBlock[];
  latestPosts?: WPPostSummary[];
}

export default function SectionRenderer({ blocks, latestPosts }: Props) {
  return (
    <>
      {blocks.map((block, i) => {
        const Component = SECTION_REGISTRY[block.__typename];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`No component registered for section type: ${block.__typename}`);
          }
          return null;
        }

        const extraProps =
          block.__typename === BLOG_PREVIEW_TYPENAME ? { articles: latestPosts ?? [] } : {};

        return <Component key={i} {...block} {...extraProps} />;
      })}
    </>
  );
}
