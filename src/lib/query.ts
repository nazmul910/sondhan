export type RawSearchParams = Record<string, string | string[] | undefined>;

export const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export const many = (value: string | string[] | undefined): string[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

/** Builds "?a=1&b=2" from current params + overrides (null removes a key). */
export function buildQuery(params: RawSearchParams, overrides: Record<string, string | string[] | null> = {}) {
  const merged: RawSearchParams = { ...params };
  for (const [key, value] of Object.entries(overrides)) merged[key] = value === null ? undefined : value;

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    many(value).forEach((v) => v !== "" && search.append(key, v));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

/** Returns the value only if it is one of `allowed`, otherwise null. */
export function pickOne<T extends string>(value: string | string[] | undefined, allowed: readonly T[]): T | null {
  const v = first(value);
  return allowed.includes(v as T) ? (v as T) : null;
}

/** Keeps only the values that are in `allowed`. */
export function pickMany<T extends string>(value: string | string[] | undefined, allowed: readonly T[]): T[] {
  return many(value).filter((v): v is T => allowed.includes(v as T));
}

export function parsePage(value: string | string[] | undefined) {
  const page = Number.parseInt(first(value) ?? "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function parseMinRating(value: string | string[] | undefined) {
  const rating = Number(first(value));
  return rating > 0 ? rating : null;
}
