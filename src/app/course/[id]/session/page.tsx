import { notFound } from "next/navigation";
import Link from "next/link";
import { courses, getCourse } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}
import { SessionRunner } from "@/components/session/SessionRunner";

type Props = { params: Promise<{ id: string }> };

export default async function SessionPage({ params }: Props) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  return (
    <main className="flex-1 px-4 py-8 sm:py-12">
      <div className="mb-6">
        <Link
          href={`/course/${id}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {course.title}
        </Link>
      </div>
      <SessionRunner
        courseId={course.id}
        courseTitle={course.title}
        cards={course.cards}
      />
    </main>
  );
}
