"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setChatOpen } from "@/features/chat/chatSlice";

/**
 * Reusable hook for triggering the AI chat drawer.
 * If the user is not authenticated, opens the login modal instead.
 */
export function useAiChat() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenAiChat = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      dispatch(setChatOpen(true));
    }
  };

  return { handleOpenAiChat, showLoginModal, setShowLoginModal };
}
