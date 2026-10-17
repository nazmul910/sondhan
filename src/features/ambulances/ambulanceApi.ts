import type { ApiAmbulance } from "@/types/ambulance";
import { apiFetch } from "@/api/api";

type AmbulancesResponse = {
  status: boolean;
  message: string;
  code: number;
  data: ApiAmbulance[];
  pagination: {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
    from: number;
    to: number;
  };
};

export async function fetchAmbulances(): Promise<ApiAmbulance[]> {
  const response = await apiFetch("ambulances", {
    next: { revalidate: 60 },
  });

  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error(`Failed to fetch ambulances: ${response.status}`);
  }

  const result: AmbulancesResponse = await response.json();
  if (!result.status) {
    throw new Error(result.message || "অ্যাম্বুলেন্সের তথ্য পাওয়া যায়নি");
  }

  return result.data;
}
