export type TipCategory = "nutrition" | "exercise" | "mental" | "child" | "women" | "chronic" | "first-aid" | "seasonal";

export type HealthTip = {
  id: string;
  title: string;
  summary: string;
  category: TipCategory;
  readMinutes: number;
  /** ISO date, e.g. "2026-09-14" */
  publishedAt: string;
  keyPoints: string[];
  /** One string per paragraph. */
  body: string[];
};

export type TipQuery = {
  q: string;
  category: TipCategory | null;
  page: number;
};
