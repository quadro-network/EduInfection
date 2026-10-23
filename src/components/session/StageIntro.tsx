"use client";

import type { Card } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card as UiCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  cards: Card[];
  onComplete: () => void;
};

export function StageIntro({ cards, onComplete }: Props) {
  return (
    <div className="space-y-6">
      <ul className="grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <li key={c.id}>
            <UiCard className="border-border/80 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold tracking-tight">
                  {c.term}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {c.meaning}
                {c.hint ? (
                  <Badge variant="secondary" className="ml-2 align-middle">
                    {c.hint}
                  </Badge>
                ) : null}
              </CardContent>
            </UiCard>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted-foreground">
        Не зубрите список — один проход глазами. Дальше мозг дожмёт упражнениями.
      </p>
      <Button size="lg" className="w-full sm:w-auto" onClick={onComplete}>
        Готов — к парам
      </Button>
    </div>
  );
}
