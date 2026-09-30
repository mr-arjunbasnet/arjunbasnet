import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePage, { courseMetadata } from "@/components/training/CoursePage";
import { COURSES, getCourse } from "@/content/courses/index";

// An unknown or planned-but-unwritten course is a 404, not a runtime render.
export const dynamicParams = false;

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

// Next 16: params is a Promise in both generateMetadata and the page.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return course ? courseMetadata(course) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <CoursePage course={course} />;
}
