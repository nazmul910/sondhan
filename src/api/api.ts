const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dashboard.shondan.org/api/v1"
).replace(/\/+$/, "");

type ApiFetchOptions = RequestInit & {
  token?: string;
};

export function apiUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

export function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<Response> {
  const { token, headers, ...fetchOptions } = options;
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  return fetch(apiUrl(path), { ...fetchOptions, headers: requestHeaders });
}
