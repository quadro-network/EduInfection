"use client";

import { useMemo, useState } from "react";
import type { Card } from "@/lib/types";
import { letterBank, scrambleLetters } from "@/lib/shuffle";
import { LetterInput } from "@/components/session/LetterInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Mode = "unscramble" | "letters-to-term" | "term-from-meaning";

type Props = {
  cards: Card[];
  mode: Mode;
  onComplete: () => void;
};

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export function StagePerCard({ cards, mode, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);

  const card = cards[index];
  const decoys = cards.map((c) => c.term);
  const letters = useMemo(() => {
    if (mode === "unscramble") return scrambleLetters(card.term);
    if (mode === "letters-to-term") return letterBank(card.term, decoys);
    return [];
  }, [card.term, mode, decoys]);

  const progress = ((index + (feedback === "ok" ? 1 : 0)) / cards.length) * 100;

  function advance() {
    if (index + 1 >= cards.length) onComplete();
    else {
      setIndex((i) => i + 1);
      setValue("");
      setFeedback(null);
    }
  }

  function checkTyped() {
    const ok = normalize(value) === normalize(card.term);
    setFeedback(ok ? "ok" : "bad");
    if (ok) setTimeout(advance, 450);
  }

  const meaningPrompt = (
    <p className="text-lg">
      <span className="text-muted-foreground">Перевод: </span>
      <strong>{card.meaning}</strong>
    </p>
  );

  return (
    <div className="space-y-6">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-muted-foreground">
        {index + 1} / {cards.length}
      </p>

      {mode === "unscramble" ? (
        <LetterInput
          key={card.id}
          target={card.term}
          letters={letters}
          onSuccess={advance}
          prompt={
            <p className="text-muted-foreground">
              Соберите термин <strong className="text-foreground">{card.term.length}</strong>{" "}
              букв (подсказка: {card.meaning})
            </p>
          }
        />
      ) : null}

      {mode === "letters-to-term" ? (
        <LetterInput
          key={card.id}
          target={card.term}
          letters={letters}
          onSuccess={advance}
          prompt={meaningPrompt}
        />
      ) : null}

      {mode === "term-from-meaning" ? (
        <>
          {meaningPrompt}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkTyped()}
              placeholder="Термин на языке карточки"
              autoComplete="off"
              className={feedback === "bad" ? "border-destructive" : undefined}
            />
            <Button type="button" onClick={checkTyped}>
              Проверить
            </Button>
          </div>
          {feedback === "bad" ? (
            <p className="text-sm text-destructive">Нужно: {card.term}</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
