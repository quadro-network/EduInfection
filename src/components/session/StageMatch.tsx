"use client";

import { useMemo, useState } from "react";
import type { Card } from "@/lib/types";
import { shuffle } from "@/lib/shuffle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  cards: Card[];
  onComplete: () => void;
};

type Tile = { id: string; cardId: string; label: string; side: "term" | "meaning" };

export function StageMatch({ cards, onComplete }: Props) {
  const tiles = useMemo(() => {
    const terms: Tile[] = cards.map((c) => ({
      id: `t-${c.id}`,
      cardId: c.id,
      label: c.term,
      side: "term",
    }));
    const meanings: Tile[] = cards.map((c) => ({
      id: `m-${c.id}`,
      cardId: c.id,
      label: c.meaning,
      side: "meaning",
    }));
    return shuffle([...terms, ...meanings]);
  }, [cards]);

  const [selected, setSelected] = useState<Tile | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);

  const allMatched = matched.size === cards.length;

  function onTileClick(tile: Tile) {
    if (matched.has(tile.cardId)) return;
    if (!selected) {
      setSelected(tile);
      setWrong(null);
      return;
    }
    if (selected.id === tile.id) {
      setSelected(null);
      return;
    }
    const ok =
      selected.cardId === tile.cardId && selected.side !== tile.side;
    if (ok) {
      setMatched((m) => new Set(m).add(tile.cardId));
      setSelected(null);
      setWrong(null);
    } else {
      setWrong(tile.id);
      setTimeout(() => {
        setSelected(null);
        setWrong(null);
      }, 450);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {tiles.map((tile) => {
          const isMatched = matched.has(tile.cardId);
          const isSelected = selected?.id === tile.id;
          const isWrong = wrong === tile.id || (wrong && selected?.id === tile.id);
          return (
            <button
              key={tile.id}
              type="button"
              disabled={isMatched}
              onClick={() => onTileClick(tile)}
              className={cn(
                "min-h-[4.5rem] rounded-xl border px-3 py-3 text-left text-sm transition-all",
                "hover:border-primary/50 hover:bg-accent/50",
                isMatched && "border-emerald-500/40 bg-emerald-500/10 opacity-60",
                isSelected && "border-primary ring-2 ring-primary/30",
                isWrong && "border-destructive animate-pulse",
                tile.side === "meaning" && "text-muted-foreground",
              )}
            >
              {tile.label}
            </button>
          );
        })}
      </div>
      {allMatched ? (
        <Button size="lg" onClick={onComplete}>
          Все пары — дальше
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          Выберите термин и его перевод. Ошибка — пара сбрасывается.
        </p>
      )}
    </div>
  );
}
