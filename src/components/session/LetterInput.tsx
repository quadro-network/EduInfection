"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  target: string;
  letters: string[];
  onSuccess: () => void;
  prompt: React.ReactNode;
};

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, "").trim();
}

export function LetterInput({ target, letters, onSuccess, prompt }: Props) {
  const [picked, setPicked] = useState<number[]>([]);
  const [error, setError] = useState(false);

  const current = picked.map((i) => letters[i]).join("");

  function submit() {
    if (normalize(current) === normalize(target)) {
      onSuccess();
      setPicked([]);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 400);
    }
  }

  function backspace() {
    setPicked((p) => p.slice(0, -1));
  }

  return (
    <div className="space-y-4">
      {prompt}
      <div
        className={cn(
          "min-h-12 rounded-lg border bg-muted/40 px-4 py-3 font-mono text-lg tracking-wide",
          error && "border-destructive",
        )}
      >
        {current || "…"}
      </div>
      <div className="flex flex-wrap gap-2">
        {letters.map((ch, i) => {
          const used = picked.includes(i);
          return (
            <Button
              key={`${i}-${ch}-${letters.length}`}
              type="button"
              variant="secondary"
              size="sm"
              disabled={used}
              className="min-w-9 font-mono text-base"
              onClick={() => setPicked((p) => [...p, i])}
            >
              {ch}
            </Button>
          );
        })}
        <Button type="button" variant="outline" size="sm" onClick={backspace}>
          ⌫
        </Button>
        <Button type="button" size="sm" onClick={submit}>
          Проверить
        </Button>
      </div>
    </div>
  );
}
