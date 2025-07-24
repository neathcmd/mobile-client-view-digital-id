"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import File from "./(dashboard)/profile/page";
import { useAuthStore } from "@/store/auth-store";

export default function Profile() {
  const router = useRouter();

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <File />
    </div>
  );
}
