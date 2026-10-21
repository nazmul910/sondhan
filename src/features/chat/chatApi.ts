import type {
  ChatMessage,
  StartChatData,
  StartChatResponse,
  SendMessageData,
  SendMessageResponse,
  GetMessagesResponse,
} from "./types";
import { apiFetch } from "@/api/api";

export async function startChatSession(token: string): Promise<StartChatData> {
  const res = await apiFetch("chat/start", {
    method: "POST",
    token,
  });

  const json: StartChatResponse = await res.json().catch(() => ({}));
  if (!res.ok || json.status === false) {
    throw new Error(json.message || "চ্যাট সেশন শুরু করা যায়নি।");
  }

  return json.data;
}

export async function sendChatMessage(
  payload: {
    chatId: number;
    message: string;
    latitude?: number | string | null;
    longitude?: number | string | null;
  },
  token: string
): Promise<SendMessageData> {
  const formData = new FormData();
  formData.append("chat_id", String(payload.chatId));
  formData.append("message", payload.message);

  if (payload.latitude !== undefined && payload.latitude !== null && payload.latitude !== "") {
    formData.append("latitude", String(payload.latitude));
  }
  if (payload.longitude !== undefined && payload.longitude !== null && payload.longitude !== "") {
    formData.append("longitude", String(payload.longitude));
  }

  const res = await apiFetch("chat/send", {
    method: "POST",
    token,
    body: formData,
  });

  const json: SendMessageResponse = await res.json().catch(() => ({}));
  if (!res.ok || json.status === false) {
    throw new Error(json.message || "বার্তা পাঠানো যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
  }

  return json.data;
}

export async function fetchChatMessages(
  chatId: number,
  token: string
): Promise<ChatMessage[]> {
  const res = await apiFetch(`chat/messages/${chatId}`, {
    method: "GET",
    token,
    cache: "no-store",
  });

  const json: GetMessagesResponse = await res.json().catch(() => ({}));
  if (!res.ok || json.status === false) {
    throw new Error(json.message || "চ্যাট বার্তা লোড করা যায়নি।");
  }

  return Array.isArray(json.data) ? json.data : [];
}
