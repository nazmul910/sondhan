"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AiChatDrawer from "@/components/chat/AiChatDrawer";
import AiChatFAB from "@/components/chat/AiChatFAB";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  if (isAuthPage) return children;

  return (
    <>
      <Navbar />
      {children}
      <AiChatDrawer />
      {/* Global floating AI chatbot FAB – visible on all pages */}
      <AiChatFAB />
      <Footer />
    </>
  );
}
