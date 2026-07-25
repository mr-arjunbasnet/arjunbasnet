import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import GithubSlugger from "github-slugger";
import type { BlogPost, BlogPostMeta, BlogCluster } from "../types.ts";

/**
 * Markdown blog pipeline.
 *
 * Deliberately not @next/mdx: the bundled Next 16 docs state that remark and
 * rehype plugins taking non-serialisable options "cannot be used yet with
 * Turbopack, because JavaScript functions can't be passed to Rust" — and a blog
 * needs heading-slug and TOC handling. @next/mdx also has no frontmatter
 * support, so gray-matter would be required regardless. Reading files with fs
 * at build time avoids the whole Rust boundary and keeps full control over
 * heading IDs, which the AEO anchors depend on.
 */

const POSTS_DIR = path.join(process.cwd(), "src/content/blog/posts");

export const CLUSTERS: {
  id: BlogCluster;
  label: string;
  description: string;
}[] = [
  {
    id: "seo-aeo-geo",
    label: "SEO, AEO & GEO",
    description:
      "Getting found — in Google's results, in AI Overviews, and inside ChatGPT and Perplexity answers.",
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    description:
      "Practical automation for businesses in Nepal: what to automate, what to leave alone, and how to tell the difference.",
  },
  {
    id: "digital-problem-solving",
    label: "Digital Problem Solving",
    description:
      "Build versus buy, vendor selection, and why digital projects fail — written from delivering 100+ of them.",
  },
];

export function getCluster(id: string) {
  return CLUSTERS.find((c) => c.id === id);
}

/** Heading IDs must be stable — they are the anchors AEO answers link to. */
function createRenderer() {
  const slugger = new GithubSlugger();
  const marked = new Marked({ gfm: true, breaks: false });
  const toc: BlogPost["toc"] = [];

  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const plain = text.replace(/<[^>]*>/g, "");
        const id = slugger.slug(plain);
        if (depth === 2 || depth === 3) {
          toc.push({ id, text: plain, level: depth as 2 | 3 });
        }
        return `<h${depth} id="${id}" class="scroll-mt-24">${text}</h${depth}>`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${href}"${title ? ` title="${title}"` : ""}${attrs}>${text}</a>`;
      },
    },
  });

  return { marked, toc };
}

function readPost(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const { marked, toc } = createRenderer();
  const html = marked.parse(content) as string;

  return {
    meta: { ...(data as Omit<BlogPostMeta, "slug">), slug: filename.replace(/\.md$/, "") },
    html,
    toc,
  };
}

/**
 * Frontmatter only — used by the index, sitemap, and llms.txt so those never
 * pull a full post body into their module graph.
 */
export function getAllPostMeta(): BlogPostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
      const { data } = matter(raw);
      return {
        ...(data as Omit<BlogPostMeta, "slug">),
        slug: filename.replace(/\.md$/, ""),
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const post = readPost(`${slug}.md`);
  return post.meta.draft ? undefined : post;
}

export function getPostsByCluster(cluster: BlogCluster): BlogPostMeta[] {
  return getAllPostMeta().filter((p) => p.cluster === cluster);
}

export function getPostsForService(slug: string): BlogPostMeta[] {
  return getAllPostMeta().filter((p) => p.serviceSlugs.includes(slug));
}
