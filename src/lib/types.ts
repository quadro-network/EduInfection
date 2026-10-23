export type StageId =
  | "intro"
  | "match"
  | "listen"
  | "unscramble"
  | "letters-to-term"
  | "term-from-meaning";

export type Card = {
  id: string;
  term: string;
  meaning: string;
  hint?: string;
  /** BCP 47 for speechSynthesis; defaults to en-US for Latin terms */
  speechLang?: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  accent: string;
  cards: Card[];
};

export const STAGE_ORDER: StageId[] = [
  "intro",
  "match",
  "listen",
  "unscramble",
  "letters-to-term",
  "term-from-meaning",
];

export const STAGE_META: Record<
  StageId,
  { title: string; subtitle: string; step: number }
> = {
  intro: {
    step: 1,
    title: "Знакомство",
    subtitle: "Пробегите глазами список — без зубрёжки, просто контакт",
  },
  match: {
    step: 2,
    title: "Пары",
    subtitle: "Соедините термин и значение",
  },
  listen: {
    step: 3,
    title: "На слух",
    subtitle: "Услышьте термин и введите его",
  },
  unscramble: {
    step: 4,
    title: "Буквы",
    subtitle: "Соберите термин из перемешанных букв",
  },
  "letters-to-term": {
    step: 5,
    title: "По смыслу",
    subtitle: "По переводу соберите термин из набора букв",
  },
  "term-from-meaning": {
    step: 6,
    title: "Закрепление",
    subtitle: "По переводу напишите термин с клавиатуры",
  },
};
