export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function scrambleLetters(word: string): string[] {
  const letters = word.toLowerCase().replace(/\s+/g, "").split("");
  let attempt = shuffle(letters);
  let tries = 0;
  while (attempt.join("") === letters.join("") && tries < 10) {
    attempt = shuffle(letters);
    tries++;
  }
  return attempt;
}

/** Letter bank with a few decoys from the same card set */
export function letterBank(term: string, decoys: string[]): string[] {
  const base = term.toLowerCase().replace(/\s+/g, "").split("");
  const extra = decoys
    .join("")
    .toLowerCase()
    .replace(/[^a-zа-яё]/gi, "")
    .split("")
    .filter((c) => !base.includes(c));
  const pool = shuffle([...base, ...shuffle(extra).slice(0, 3)]);
  return pool.length >= base.length ? pool : [...pool, ...base].slice(0, base.length + 2);
}
