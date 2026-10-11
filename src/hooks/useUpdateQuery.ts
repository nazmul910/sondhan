"use client";

import { useCallback, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Updates = Record<string, string | string[] | null>;

/**
 * Updates the URL query string (filters, sort, page). The server page re-renders
 * with the new params, so the URL stays the single source of truth and every
 * filtered view is shareable. Changing anything except `page` resets to page 1.
 */
export function useUpdateQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const update = useCallback(
    (updates: Updates) => {
      const next = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        next.delete(key);
        const values = value === null ? [] : Array.isArray(value) ? value : [value];
        values.filter(Boolean).forEach((v) => next.append(key, v));
      }
      if (!("page" in updates)) next.delete("page");

      const query = next.toString();
      startTransition(() => router.push(query ? `${pathname}?${query}` : pathname, { scroll: false }));
    },
    [pathname, router, searchParams],
  );

  return { update, isPending };
}
