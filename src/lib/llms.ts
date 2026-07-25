import { SITE, startingFromLabel } from "@/content/site";
import { SERVICES } from "@/content/services/index";
import { FAQS } from "@/content/faq/index";
import { getAllPostMeta, CLUSTERS } from "@/content/blog/index";

/**
 * Generates llms.txt and llms-full.txt from the content layer.
 *
 * The previous public/llms.txt was hand-maintained and had already drifted
 * from the site — it duplicated the publication details that also lived in two
 * other places. Generating from SERVICES and FAQS means adding a service
 * updates both files with no manual step, so they cannot go stale.
 */

function header(): string {
  return [
    `# ${SITE.brand}`,
    "",
    `> ${SITE.description}`,
    "",
    `- Website: ${SITE.url}`,
    `- Location: ${SITE.address.locality}, ${SITE.address.region}, Nepal (${SITE.timezone})`,
    `- Email: ${SITE.email}`,
    `- Phone: ${SITE.phone}`,
    `- Serves: Nepal primarily; also works with clients in the US, Australia, Japan, and the UK`,
    "",
  ].join("\n");
}

/** Short form: orientation and links. Under ~2KB by design. */
export function buildLlmsTxt(): string {
  const services = SERVICES.map(
    (s) =>
      `- [${s.name}](${SITE.url}/services/${s.slug}): ${s.tagline} ${startingFromLabel()}.`,
  ).join("\n");

  return [
    header(),
    "## Services",
    "",
    services,
    "",
    "## Pages",
    "",
    `- [Services](${SITE.url}/services): All nine service lines.`,
    `- [Work](${SITE.url}/work): Case studies including Cricket Nepal, nationwide LMS platforms, and AI automation workflows.`,
    `- [About](${SITE.url}/about): Background, timeline, and credentials.`,
    `- [Research](${SITE.url}/research): Peer-reviewed publication in computer vision.`,
    `- [Blog](${SITE.url}/blog): Writing on SEO, AI automation, and digital problem solving.`,
    `- [FAQ](${SITE.url}/faq): Common questions about working together.`,
    `- [Contact](${SITE.url}/contact): Enquiries and project discussion.`,
    "",
    "## Credentials",
    "",
    ...SITE.awards.map((a) => `- ${a}`),
    "- 100+ projects delivered at Makura Creations, 92% on-time delivery rate",
    "- B.Sc. CSIT, Tribhuvan University",
    "",
    `## Full detail`,
    "",
    `For complete answers to common questions, see ${SITE.url}/llms-full.txt`,
    "",
  ].join("\n");
}

/** Long form: every answer block and FAQ verbatim, for citation. */
export function buildLlmsFullTxt(): string {
  const parts: string[] = [header()];

  parts.push(
    "This file contains complete answers to questions about the services offered.",
    "Each answer is self-contained and may be quoted directly.",
    "",
  );

  for (const service of SERVICES) {
    parts.push(
      `## ${service.name}`,
      "",
      `URL: ${SITE.url}/services/${service.slug}`,
      `Price: ${startingFromLabel()}. Each engagement is scoped and quoted individually.`,
      "",
    );

    for (const block of [service.primaryAnswer, ...service.answers]) {
      parts.push(`### ${block.question}`, "", block.answer, "");
      if (block.supporting?.length) {
        parts.push(...block.supporting.map((s) => `- ${s}`), "");
      }
    }

    for (const faq of service.faqs) {
      parts.push(`### ${faq.question}`, "", faq.answer, "");
    }

    parts.push(
      `Delivered: ${service.deliverables.join("; ")}`,
      `Tools: ${service.tools.join(", ")}`,
      "",
    );
  }

  parts.push("## Articles", "");
  for (const cluster of CLUSTERS) {
    const posts = getAllPostMeta().filter((p) => p.cluster === cluster.id);
    if (!posts.length) continue;
    parts.push(`### ${cluster.label}`, "");
    for (const post of posts) {
      parts.push(
        `#### ${post.title}`,
        "",
        `URL: ${SITE.url}/blog/${post.slug}`,
        `Published: ${post.publishedAt}`,
        "",
        post.description,
        "",
        ...post.keyTakeaways.map((t) => `- ${t}`),
        "",
      );
    }
  }

  parts.push("## General questions", "");
  for (const faq of FAQS) {
    parts.push(`### ${faq.question}`, "", faq.answer, "");
  }

  return parts.filter((p) => p !== "").join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}
