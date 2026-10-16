import type {
  ApiPagination,
  ApiHospitalListItem,
  ApiHospitalDetail,
  HospitalsListResponse,
  HospitalDetailResponse,
} from "./types";

const BASE_URL = "https://dashboard.shondan.org/api/v1";
const EMPTY_PAGINATION: ApiPagination = {
  total: 0,
  current_page: 1,
  per_page: 0,
  last_page: 0,
  from: 0,
  to: 0,
};

export async function fetchHospitals(params?: {
  search?: string;
  latitude?: number;
  longitude?: number;
  per_page?: number;
  page?: number;
}): Promise<{ data: ApiHospitalListItem[]; pagination: HospitalsListResponse["pagination"] }> {
  const url = new URL(`${BASE_URL}/hospitals`);
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.latitude) url.searchParams.set("latitude", String(params.latitude));
  if (params?.longitude) url.searchParams.set("longitude", String(params.longitude));
  if (params?.per_page) url.searchParams.set("per_page", String(params.per_page));
  if (params?.page) url.searchParams.set("page", String(params.page));

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (res.status === 404) return { data: [], pagination: EMPTY_PAGINATION };
  if (!res.ok) throw new Error(`Failed to fetch hospitals: ${res.status}`);
  const json: HospitalsListResponse = await res.json();
  return { data: json.data, pagination: json.pagination };
}

export async function fetchHospitalById(id: number | string): Promise<ApiHospitalDetail> {
  const res = await fetch(`${BASE_URL}/hospitals/${id}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Failed to fetch hospital #${id}: ${res.status}`);
  const json: HospitalDetailResponse = await res.json();
  return json.data;
}
