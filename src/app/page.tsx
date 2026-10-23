import Link from "next/link";
import { courses } from "@/data/courses";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        <section className="mb-12 space-y-4">
          <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
            Ingrain
          </Badge>
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Учёба, которая не спрашивает, готовы вы или нет
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Шесть этапов на урок — как в сильных приложениях для слов: список,
            пары, слух, буквы, подсказки, чистый ввод. Английский, DevOps,
            Blender — одна механика, разный контент.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.id}
              className={`flex flex-col border-border/80 bg-gradient-to-br ${course.accent}`}
            >
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {course.cards.length} карточек · 6 этапов · ~15 мин
              </CardContent>
              <CardFooter className="mt-auto gap-2">
                <Link
                  href={`/course/${course.id}/session`}
                  className={cn(buttonVariants(), "flex-1")}
                >
                  Начать урок
                </Link>
                <Link
                  href={`/course/${course.id}`}
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                >
                  О курсе
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="mt-16 rounded-2xl border bg-muted/30 p-6 sm:p-8">
          <h2 className="text-lg font-medium">Что дальше по продукту</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Импорт своих колод (CSV / JSON)</li>
            <li>Интервальное повторение и «слабые» карточки</li>
            <li>Интерактивные тесты для DevOps (схемы, команды)</li>
            <li>Картинки и short loops для Blender</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
