import type { Course } from "@/lib/types";

export const courses: Course[] = [
  {
    id: "english-core",
    title: "Английский · база",
    description:
      "",
    accent: "from-violet-500/20 to-fuchsia-500/20",
    cards: [
      { id: "e1", term: "achieve", meaning: "достигать, добиваться" },
      { id: "e2", term: "aware", meaning: "осведомлённый, знающий" },
      { id: "e3", term: "challenge", meaning: "вызов, испытание" },
      { id: "e4", term: "efficient", meaning: "эффективный" },
      { id: "e5", term: "maintain", meaning: "поддерживать, сохранять" },
      { id: "e6", term: "require", meaning: "требовать, нуждаться" },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Термины CI/CD, контейнеров и инфраструктуры — в голову, не в конспект.",
    accent: "from-emerald-500/20 to-cyan-500/20",
    cards: [
      {
        id: "d1",
        term: "pipeline",
        meaning: "конвейер сборки и доставки изменений",
        hint: "CI/CD",
      },
      {
        id: "d2",
        term: "artifact",
        meaning: "артефакт сборки (образ, бинарник, пакет)",
      },
      {
        id: "d3",
        term: "rollback",
        meaning: "откат к предыдущей рабочей версии",
      },
      {
        id: "d4",
        term: "orchestration",
        meaning: "оркестрация контейнеров и сервисов",
        hint: "Kubernetes",
      },
      {
        id: "d5",
        term: "immutable",
        meaning: "неизменяемый (инфраструктура/образы)",
      },
      {
        id: "d6",
        term: "observability",
        meaning: "наблюдаемость системы (логи, метрики, трейсы)",
      },
    ],
  },
  {
    id: "blender",
    title: "Blender",
    description: "Инструменты и понятия 3D — так же, как слова: повтор до автоматизма.",
    accent: "from-orange-500/20 to-amber-500/20",
    cards: [
      {
        id: "b1",
        term: "extrude",
        meaning: "выдавить грань или ребро",
      },
      {
        id: "b2",
        term: "subdivision",
        meaning: "подразделение поверхности (сглаживание)",
        hint: "Subdivision Surface",
      },
      {
        id: "b3",
        term: "rigging",
        meaning: "ригинг — скелет и управление персонажем",
      },
      {
        id: "b4",
        term: "UV unwrap",
        meaning: "развёртка UV для текстур",
        speechLang: "en-US",
      },
      {
        id: "b5",
        term: "shader",
        meaning: "шейдер — материал и его свойства",
      },
      {
        id: "b6",
        term: "render",
        meaning: "рендер — финальный просчёт картинки",
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}
