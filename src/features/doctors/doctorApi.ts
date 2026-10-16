import type { ApiDoctorListItem, ApiDoctorDetail, DoctorsListResponse, DoctorDetailResponse } from "./types";

const BASE_URL = "https://dashboard.shondan.org/api/v1";

export async function fetchDoctors(params?: {
  category_id?: number;
  search?: string;
  latitude?: number;
  longitude?: number;
}): Promise<ApiDoctorListItem[]> {
  const url = new URL(`${BASE_URL}/doctors`);
  if (params?.category_id) url.searchParams.set("category_id", String(params.category_id));
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.latitude) url.searchParams.set("latitude", String(params.latitude));
  if (params?.longitude) url.searchParams.set("longitude", String(params.longitude));

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Failed to fetch doctors: ${res.status}`);
  const json: DoctorsListResponse = await res.json();
  return json.data;
}

export async function fetchDoctorById(
  id: number | string,
  token?: string
): Promise<ApiDoctorDetail> {
  const res = await fetch(`${BASE_URL}/doctors/${id}`, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Failed to fetch doctor #${id}: ${res.status}`);
  const json: DoctorDetailResponse = await res.json();
  return json.data.doctor;
}
