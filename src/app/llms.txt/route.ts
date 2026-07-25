import { buildLlmsTxt } from "@/lib/llms";

// No request APIs are read, and force-static makes that explicit — the file is
// generated once at build time and served as a static asset.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
