"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      // console.log("lgout", isAuthenticated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, checkAuth]);
  return <div>{children}</div>;
}
