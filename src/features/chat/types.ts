export type ChatSenderType = "user" | "bot" | "human";

export interface ChatMessage {
  id: number;
  chat_id: number;
  sender_type: ChatSenderType;
  sender_name: string;
  message: string;
  created_at: string;
  updated_at?: string;
}

export interface StartChatData {
  chat_id: number;
  is_human_handled: boolean;
}

export interface StartChatResponse {
  status: boolean;
  message: string;
  code: number;
  data: StartChatData;
}

export interface SendMessageData {
  user_message: ChatMessage;
  bot_message: ChatMessage;
  is_human_handled: boolean;
}

export interface SendMessageResponse {
  status: boolean;
  message: string;
  code: number;
  data: SendMessageData;
}

export interface GetMessagesResponse {
  status: boolean;
  message: string;
  code: number;
  data: ChatMessage[];
}

export interface ChatState {
  chatId: number | null;
  messages: ChatMessage[];
  isHumanHandled: boolean;
  isOpen: boolean;
  loading: boolean;
  sending: boolean;
  error: string | null;
}
