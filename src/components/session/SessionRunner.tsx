"use client";

import { useState } from "react";
import type { Card } from "@/lib/types";
import { STAGE_META, STAGE_ORDER } from "@/lib/types";
import { StageIntro } from "@/components/session/StageIntro";
import { StageMatch } from "@/components/session/StageMatch";
import { StageListen } from "@/components/session/StageListen";
import { StagePerCard } from "@/components/session/StagePerCard";
import { recordSessionComplete } from "@/lib/progress";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  courseId: string;
  courseTitle: string;
  cards: Card[];
};

export function SessionRunner({ courseId, courseTitle, cards }: Props) {
  const [stageIndex, setStageIndex] = useState(0);
  const [done, setDone] = useState(false);

  const stageId = STAGE_ORDER[stageIndex];
  const meta = STAGE_META[stageId];

  function nextStage() {
    if (stageIndex + 1 >= STAGE_ORDER.length) {
      recordSessionComplete(courseId);
      setDone(true);
    } else setStageIndex((i) => i + 1);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Урок закрыт</h2>
        <p className="text-muted-foreground">
          Шесть проходов по «{courseTitle}» — материал уже сидит глубже, чем после
          одного списка слов.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href={`/course/${courseId}/session`}
            className={cn(buttonVariants())}
          >
            Ещё один заход
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            Этап {meta.step} / {STAGE_ORDER.length}
          </Badge>
          <span className="text-sm text-muted-foreground">{courseTitle}</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {meta.title}
        </h1>
        <p className="text-muted-foreground">{meta.subtitle}</p>
      </header>

      {stageId === "intro" ? (
        <StageIntro cards={cards} onComplete={nextStage} />
      ) : null}
      {stageId === "match" ? (
        <StageMatch cards={cards} onComplete={nextStage} />
      ) : null}
      {stageId === "listen" ? (
        <StageListen cards={cards} onComplete={nextStage} />
      ) : null}
      {stageId === "unscramble" ? (
        <StagePerCard cards={cards} mode="unscramble" onComplete={nextStage} />
      ) : null}
      {stageId === "letters-to-term" ? (
        <StagePerCard
          cards={cards}
          mode="letters-to-term"
          onComplete={nextStage}
        />
      ) : null}
      {stageId === "term-from-meaning" ? (
        <StagePerCard
          cards={cards}
          mode="term-from-meaning"
          onComplete={nextStage}
        />
      ) : null}
    </div>
  );
}
