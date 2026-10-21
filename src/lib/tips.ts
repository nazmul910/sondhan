import { TIP_CATEGORY_KEYS, TIP_CATEGORY_LABELS } from "@/data/tipOptions"
import type { HealthTip, TipQuery } from "@/types/tip";
import { paginate, type Paged } from "./list";
import { first, parsePage, pickOne, type RawSearchParams } from "./query";
import { tips } from "@/data/tips";

export const TIPS_PAGE_SIZE = 8;

export function parseTipQuery(raw: RawSearchParams): TipQuery {
  return {
    q: (first(raw.q) ?? "").trim(),
    category: pickOne(raw.category, TIP_CATEGORY_KEYS),
    page: parsePage(raw.page),
  };
}

/** Newest first. */
const newestFirst = (a: HealthTip, b: HealthTip) => b.publishedAt.localeCompare(a.publishedAt);

export async function getTips(query: TipQuery): Promise<Paged<HealthTip>> {
  const needle = query.q.toLowerCase();

  const filtered = tips.filter((t) => {
    if (needle && ![t.title, t.summary, TIP_CATEGORY_LABELS[t.category]].some((text) => text.toLowerCase().includes(needle))) return false;
    if (query.category && t.category !== query.category) return false;
    return true;
  });

  return paginate(filtered.sort(newestFirst), query.page, TIPS_PAGE_SIZE);
}

export async function getTipById(id: string) {
  return tips.find((t) => t.id === id) ?? null;
}

/** Same category first, then the newest of the rest. */
export async function getRelatedTips(tip: HealthTip, limit = 3) {
  const others = tips.filter((t) => t.id !== tip.id).sort(newestFirst);
  const sameCategory = others.filter((t) => t.category === tip.category);
  return [...sameCategory, ...others.filter((t) => t.category !== tip.category)].slice(0, limit);
}

export const getAllTipIds = () => tips.map((t) => t.id);


export const formatTipDate = (iso: string) =>
  new Intl.DateTimeFormat("bn-BD", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
