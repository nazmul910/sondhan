import type { AuthSuccessResponse, ProfileResponse, ApiResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dashboard.shondan.org/api/v1";

function parseErrorMessage(data: ApiResponse, defaultMsg: string): string {
  if (data.errors && typeof data.errors === "object") {
    const errorList = Object.values(data.errors).flat();
    if (errorList.length > 0) return errorList.join(" ");
  }
  return data.message || defaultMsg;
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<AuthSuccessResponse> {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const data: ApiResponse<AuthSuccessResponse["data"]> = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false) {
    throw new Error(parseErrorMessage(data, "লগইন ব্যর্থ হয়েছে। ইমেইল ও পাসওয়ার্ড যাচাই করুন।"));
  }

  return data as unknown as AuthSuccessResponse;
}

export async function registerUser(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<AuthSuccessResponse> {
  const formData = new FormData();
  formData.append("first_name", payload.first_name);
  formData.append("last_name", payload.last_name);
  formData.append("email", payload.email);
  formData.append("password", payload.password);

  const res = await fetch(`${BASE_URL}/sign-up`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const data: ApiResponse<AuthSuccessResponse["data"]> = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false) {
    throw new Error(parseErrorMessage(data, "রেজিস্ট্রেশন সম্পন্ন করা যায়নি।"));
  }

  return data as unknown as AuthSuccessResponse;
}

export async function fetchProfile(token: string): Promise<ProfileResponse> {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ApiResponse<ProfileResponse["data"]> = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false) {
    throw new Error(parseErrorMessage(data, "ব্যবহারকারীর তথ্য লোড করা যায়নি।"));
  }

  return data as unknown as ProfileResponse;
}

export async function updateProfile(
  token: string,
  payload: {
    first_name: string;
    last_name: string;
    email: string;
    bio?: string | null;
    avatar?: File | null;
  }
): Promise<ProfileResponse> {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("first_name", payload.first_name);
  formData.append("last_name", payload.last_name);
  formData.append("email", payload.email);
  if (payload.bio !== undefined && payload.bio !== null) {
    formData.append("bio", payload.bio);
  }
  if (payload.avatar instanceof File) {
    formData.append("avatar", payload.avatar);
  }

  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: ApiResponse<ProfileResponse["data"]> = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false) {
    throw new Error(parseErrorMessage(data, "প্রোফাইল আপডেট করা যায়নি।"));
  }

  return data as unknown as ProfileResponse;
}

export async function changePassword(
  token: string,
  payload: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }
): Promise<{ status: boolean; message: string }> {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("current_password", payload.current_password);
  formData.append("password", payload.password);
  formData.append("password_confirmation", payload.password_confirmation);

  const res = await fetch(`${BASE_URL}/auth/profile/password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: ApiResponse = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false) {
    throw new Error(parseErrorMessage(data, "পাসওয়ার্ড পরিবর্তন করা সম্ভব হয়নি।"));
  }

  return { status: true, message: data.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।" };
}

export async function logoutUser(token: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // Ignore network errors on logout
  }
}

export async function forgotPassword(email: string): Promise<{ status: boolean; message: string }> {
  const formData = new FormData();
  formData.append("email", email);

  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const data: ApiResponse = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false) {
    throw new Error(parseErrorMessage(data, "ওটিপি পাঠানো যায়নি। ইমেইল ঠিকানা সঠিক কিনা দেখুন।"));
  }

  return { status: true, message: data.message || "ওটিপি সফলভাবে পাঠানো হয়েছে।" };
}

export async function verifyOtp(
  email: string,
  otp: string
): Promise<{ status: boolean; message: string; token: string }> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otp", otp);

  const res = await fetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const data: ApiResponse<{ token: string }> = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false || !data.data?.token) {
    throw new Error(parseErrorMessage(data, "ওটিপি সঠিক নয় বা মেয়াদ শেষ হয়ে গেছে।"));
  }

  return { status: true, message: data.message || "ওটিপি যাচাই হয়েছে।", token: data.data.token };
}

export async function resetPassword(payload: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}): Promise<{ status: boolean; message: string }> {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("token", payload.token);
  formData.append("password", payload.password);
  formData.append("password_confirmation", payload.password_confirmation);

  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const data: ApiResponse = await res.json().catch(() => ({}));
  if (!res.ok || data.status === false) {
    throw new Error(parseErrorMessage(data, "পাসওয়ার্ড রিসেট করা যায়নি।"));
  }

  return { status: true, message: data.message || "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।" };
}
