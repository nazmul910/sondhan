import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { startChatSession, sendChatMessage, fetchChatMessages } from "./chatApi";
import type { ChatState, ChatMessage } from "./types";
import type { RootState } from "@/store/store";

const CHAT_ID_STORAGE_KEY = "shondhan_chat_id";

function getStoredChatId(): number | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CHAT_ID_STORAGE_KEY);
  if (!stored) return null;
  const parsed = parseInt(stored, 10);
  return isNaN(parsed) ? null : parsed;
}

function saveStoredChatId(chatId: number | null) {
  if (typeof window === "undefined") return;
  if (chatId) {
    localStorage.setItem(CHAT_ID_STORAGE_KEY, String(chatId));
  } else {
    localStorage.removeItem(CHAT_ID_STORAGE_KEY);
  }
}

// ─── Async Thunks ────────────────────────────────────────────────────────────

export const initChat = createAsyncThunk(
  "chat/initChat",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("অনুগ্রহ করে চ্যাট শুরু করতে লগইন করুন।");

      let currentChatId = state.chat.chatId || getStoredChatId();

      if (currentChatId) {
        try {
          const messages = await fetchChatMessages(currentChatId, token);
          return { chatId: currentChatId, messages, is_human_handled: false };
        } catch {
          // If existing chat_id failed or expired, start a fresh session
          currentChatId = null;
        }
      }

      const started = await startChatSession(token);
      saveStoredChatId(started.chat_id);
      return {
        chatId: started.chat_id,
        messages: [] as ChatMessage[],
        is_human_handled: started.is_human_handled,
      };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "চ্যাট সেশন লোড করা যায়নি");
    }
  }
);

export const sendUserMessage = createAsyncThunk(
  "chat/sendUserMessage",
  async (
    payload: {
      message: string;
      latitude?: number | string | null;
      longitude?: number | string | null;
    },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("অনুগ্রহ করে বার্তা পাঠাতে লগইন করুন।");

      let chatId = state.chat.chatId || getStoredChatId();
      if (!chatId) {
        const started = await startChatSession(token);
        chatId = started.chat_id;
        saveStoredChatId(chatId);
      }

      // Optimistic user message so it shows in the UI right away
      const tempId = Date.now();
      dispatch(
        chatSlice.actions.addOptimisticMessage({
          id: tempId,
          chat_id: chatId,
          sender_type: "user",
          sender_name: state.auth.user ? `${state.auth.user.first_name} ${state.auth.user.last_name || ""}`.trim() : "User",
          message: payload.message,
          created_at: new Date().toISOString(),
        })
      );

      const response = await sendChatMessage(
        {
          chatId,
          message: payload.message,
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
        token
      );

      return {
        tempId,
        userMessage: response.user_message,
        botMessage: response.bot_message,
        isHumanHandled: response.is_human_handled,
      };
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "বার্তা পাঠানো ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
      );
    }
  }
);

export const resetChat = createAsyncThunk(
  "chat/resetChat",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) throw new Error("অনুগ্রহ করে লগইন করুন।");

      saveStoredChatId(null);
      const started = await startChatSession(token);
      saveStoredChatId(started.chat_id);
      return {
        chatId: started.chat_id,
        messages: [] as ChatMessage[],
        is_human_handled: started.is_human_handled,
      };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "নতুন সেশন শুরু করা যায়নি");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: ChatState = {
  chatId: null,
  messages: [],
  isHumanHandled: false,
  isOpen: false,
  loading: false,
  sending: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    toggleChat(state) {
      state.isOpen = !state.isOpen;
    },
    clearChatError(state) {
      state.error = null;
    },
    addOptimisticMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    clearChatState(state) {
      state.chatId = null;
      state.messages = [];
      state.isHumanHandled = false;
      state.error = null;
      saveStoredChatId(null);
    },
  },
  extraReducers: (builder) => {
    // initChat
    builder
      .addCase(initChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatId = action.payload.chatId;
        state.messages = action.payload.messages;
        state.isHumanHandled = action.payload.is_human_handled;
      })
      .addCase(initChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // sendUserMessage
    builder
      .addCase(sendUserMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendUserMessage.fulfilled, (state, action) => {
        state.sending = false;
        const { tempId, userMessage, botMessage, isHumanHandled } = action.payload;
        // Replace optimistic message with actual user_message from backend if available
        const idx = state.messages.findIndex((m) => m.id === tempId);
        if (idx !== -1 && userMessage) {
          state.messages[idx] = userMessage;
        }
        if (botMessage) {
          state.messages.push(botMessage);
        }
        state.isHumanHandled = isHumanHandled;
      })
      .addCase(sendUserMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload as string;
      });

    // resetChat
    builder
      .addCase(resetChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatId = action.payload.chatId;
        state.messages = action.payload.messages;
        state.isHumanHandled = action.payload.is_human_handled;
      })
      .addCase(resetChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setChatOpen,
  toggleChat,
  clearChatError,
  clearChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
