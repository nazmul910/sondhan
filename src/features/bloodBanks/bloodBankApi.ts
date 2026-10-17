import { apiFetch, apiUrl } from "@/api/api";

export type BloodBank = {
  id: number;
  name: string;
  address: string;
  district: string;
  blood_groups: string[];
  phone: string;
  is_emergency: boolean;
  latitude: number;
  longitude: number;
  away: string | null;
};

export type BloodBankPagination = {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  from: number | null;
  to: number | null;
};

type BloodBanksResponse = {
  status: boolean;
  message: string;
  code: number;
  data: BloodBank[];
  pagination: BloodBankPagination;
};

const PER_PAGE = 10;
export const BLOOD_BANK_PAGE_SIZE = PER_PAGE;
const EMPTY_PAGINATION: BloodBankPagination = {
  total: 0,
  current_page: 1,
  per_page: PER_PAGE,
  last_page: 1,
  from: null,
  to: null,
};

export async function fetchBloodBanks(
  page: number,
): Promise<{ items: BloodBank[]; pagination: BloodBankPagination }> {
  const url = new URL(apiUrl("blood-banks"));
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(PER_PAGE));

  const response = await apiFetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return { items: [], pagination: EMPTY_PAGINATION };
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch blood banks: ${response.status}`);
  }

  const result: BloodBanksResponse = await response.json();
  if (!result.status) {
    throw new Error(result.message || "ব্লাড ব্যাংকের তথ্য পাওয়া যায়নি");
  }

  return { items: result.data, pagination: result.pagination };
}

export async function fetchAllBloodBanks(): Promise<BloodBank[]> {
  const firstPage = await fetchBloodBanks(1);
  if (firstPage.pagination.last_page <= 1) return firstPage.items;

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.pagination.last_page - 1 }, (_, index) =>
      fetchBloodBanks(index + 2),
    ),
  );

  return [...firstPage.items, ...remainingPages.flatMap((page) => page.items)];
}
