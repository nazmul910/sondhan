import type {
  ApiDoctorListItem,
  ApiDoctorDetail,
  DoctorsListResponse,
  DoctorDetailResponse,
  WishlistToggleResponse,
} from "./types";
import { apiFetch, apiUrl } from "@/api/api";

export async function fetchDoctors(params?: {
  category_id?: number;
  search?: string;
  latitude?: number;
  longitude?: number;
}): Promise<ApiDoctorListItem[]> {
  const url = new URL(apiUrl("doctors"));
  if (params?.category_id) url.searchParams.set("category_id", String(params.category_id));
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.latitude) url.searchParams.set("latitude", String(params.latitude));
  if (params?.longitude) url.searchParams.set("longitude", String(params.longitude));

  const res = await apiFetch(url.toString(), {
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
  const res = await apiFetch(`doctors/${id}`, {
    ...(token ? { token } : {}),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch doctor #${id}: ${res.status}`);
  const json: DoctorDetailResponse = await res.json();
  return json.data.doctor;
}

export async function toggleDoctorWishlist(
  doctorId: number | string,
  token: string
): Promise<WishlistToggleResponse> {
  const formData = new FormData();
  formData.append("doctor_id", String(doctorId));

  const res = await apiFetch("wishlist/toggle", {
    method: "POST",
    token,
    body: formData,
  });

  const json: WishlistToggleResponse = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || "প্রিয় তালিকায় পরিবর্তন করা যায়নি");
  }

  return json;
}

export async function fetchWishlistDoctors(token: string): Promise<ApiDoctorListItem[]> {
  const res = await apiFetch("wishlist/doctors", {
    method: "GET",
    token,
    cache: "no-store",
  });

  if (res.status === 401) {
    throw new Error("অননুমোদিত অনুরোধ। দয়া করে লগইন করুন।");
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch wishlist: ${res.status}`);
  }

  const json: DoctorsListResponse = await res.json();
  return json.data || [];
}

export async function rateDoctor(
  doctorId: number | string,
  rating: number,
  token: string
): Promise<{ success: boolean; message: string }> {
  const formData = new FormData();
  formData.append("rating", String(rating));

  const res = await apiFetch(`doctors/${doctorId}/rate`, {
    method: "POST",
    token,
    body: formData,
  });

  const json: { success?: boolean; message?: string } = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || "রেটিং জমা দেওয়া যায়নি।");
  }

  return { success: true, message: json.message || "রেটিং সফলভাবে জমা হয়েছে।" };
}
