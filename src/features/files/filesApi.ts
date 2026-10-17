import { apiFetch } from "@/api/api";

export interface ApiMedicalFileRecord {
  id: number;
  doctor_name: string;
  hospital_name: string;
  visit_purpose: string;
  prescriptions?: { id: number; file_url: string; created_at: string }[];
  reports?: { id: number; file_url: string; created_at: string }[];
  created_at: string;
}

export async function fetchMedicalFiles(token: string): Promise<ApiMedicalFileRecord[]> {
  const res = await apiFetch("files?per_page=100", {
    token,
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401) return [];
    throw new Error(`Failed to fetch files: ${res.status}`);
  }

  const json = await res.json().catch(() => ({}));
  return json.data || [];
}

export async function uploadMedicalRecord(
  token: string,
  payload: {
    doctor_name: string;
    hospital_name: string;
    visit_purpose: string;
    file: File;
    isPrescription?: boolean;
  }
): Promise<{ success: boolean; message: string }> {
  const formData = new FormData();
  formData.append("doctor_name", payload.doctor_name);
  formData.append("hospital_name", payload.hospital_name);
  formData.append("visit_purpose", payload.visit_purpose);

  if (payload.isPrescription) {
    formData.append("prescriptions[0]", payload.file);
  } else {
    formData.append("reports[0]", payload.file);
  }

  const res = await apiFetch("files", {
    method: "POST",
    token,
    body: formData,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    let errMsg = json.message || "ফাইল আপলোড ব্যর্থ হয়েছে";
    if (json.errors && typeof json.errors === "object") {
      const firstKey = Object.keys(json.errors)[0];
      if (firstKey && Array.isArray(json.errors[firstKey])) {
        errMsg = json.errors[firstKey][0];
      }
    }
    throw new Error(errMsg);
  }

  return { success: true, message: json.message || "ফাইল সফলভাবে আপলোড হয়েছে।" };
}

export async function deleteMedicalFile(
  token: string,
  id: number | string
): Promise<{ success: boolean; message: string }> {
  const res = await apiFetch(`files/${id}`, {
    method: "DELETE",
    token,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || "ফাইল মোছা সম্ভব হয়নি");
  }

  return { success: true, message: json.message || "ফাইল সফলভাবে মুছে ফেলা হয়েছে।" };
}
