import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ id: string }> };

export default async function CoursePage({ params }: Props) {
  const { id } = await params;
  const course = getCourse(id);
  if (!course) notFound();

  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-10">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Курсы
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {course.title}
      </h1>
      <p className="mt-2 text-muted-foreground">{course.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary">{course.cards.length} терминов</Badge>
        <Badge variant="outline">6 этапов</Badge>
      </div>
      <ol className="mt-8 space-y-2 text-sm">
        {course.cards.map((c) => (
          <li
            key={c.id}
            className="flex flex-col border-b border-border/60 py-2 sm:flex-row sm:justify-between"
          >
            <span className="font-medium">{c.term}</span>
            <span className="text-muted-foreground">{c.meaning}</span>
          </li>
        ))}
      </ol>
      <Link
        href={`/course/${course.id}/session`}
        className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex w-full sm:w-auto")}
      >
        Запустить урок
      </Link>
    </main>
  );
}
