"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { getStoredToken, setToken, loadProfile, setInitialized } from "@/features/auth/authSlice";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      dispatch(setToken(token));
      dispatch(loadProfile(token));
    } else {
      dispatch(setInitialized());
    }
  }, [dispatch]);

  return <>{children}</>;
}
