/**
 * Normalizes image URLs returned from the API, mapping local test domains (e.g. health-app.test)
 * to the live API host if applicable.
 */
export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // If backend returns a health-app.test domain from local development
  if (trimmed.includes("health-app.test")) {
    return trimmed.replace(/^https?:\/\/health-app\.test/, "https://dashboard.shondan.org");
  }

  return trimmed;
}
