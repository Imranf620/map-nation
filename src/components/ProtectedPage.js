// src/app/(admin)/layout.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        setAuthenticated(true);
      } catch (error) {
        console.error("Auth error:", error.message);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="flex h-screen justify-center items-center">Loading...</div>;
  }

  if (!authenticated) {
    return null; 
  }

  return <>{children}</>;
}