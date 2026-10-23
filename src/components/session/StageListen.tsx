"use client";

import { useEffect, useState } from "react";
import type { Card } from "@/lib/types";
import { speakTerm } from "@/lib/speech";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Props = {
  cards: Card[];
  onComplete: () => void;
};

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function StageListen({ cards, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);

  const card = cards[index];
  const progress = ((index + (feedback === "ok" ? 1 : 0)) / cards.length) * 100;

  useEffect(() => {
    if (card) {
      speakTerm(card.term, card.speechLang ?? "en-US");
    }
  }, [card]);

  function check() {
    const ok = normalize(value) === normalize(card.term);
    setFeedback(ok ? "ok" : "bad");
    if (ok) {
      setTimeout(() => {
        if (index + 1 >= cards.length) onComplete();
        else {
          setIndex((i) => i + 1);
          setValue("");
          setFeedback(null);
        }
      }, 500);
    }
  }

  return (
    <div className="space-y-6">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-muted-foreground">
        Карточка {index + 1} из {cards.length}
      </p>
      <Button
        type="button"
        variant="secondary"
        onClick={() => speakTerm(card.term, card.speechLang ?? "en-US")}
      >
        ▶ Прослушать ещё раз
      </Button>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Введите термин"
          autoComplete="off"
          className={feedback === "bad" ? "border-destructive" : undefined}
        />
        <Button type="button" onClick={check}>
          Проверить
        </Button>
      </div>
      {feedback === "bad" ? (
        <p className="text-sm text-destructive">
          Неверно. Правильно: <strong>{card.term}</strong>
        </p>
      ) : null}
    </div>
  );
}
