/**
 * Extra "What do you need?" options on the contact form for the AI training
 * and AI courses clusters. Their CTAs link to /contact?service=<value>.
 *
 * The contact API validates `service` against the registry rather than
 * trusting the client; these values are part of that registry.
 */
export const LEARNING_ENQUIRIES: { value: string; label: string }[] = [
  { value: "ai-training", label: "AI training for my organisation" },
  { value: "ai-course", label: "AI course information" },
];

export function learningEnquiryLabel(value: string): string | undefined {
  return LEARNING_ENQUIRIES.find((e) => e.value === value)?.label;
}
