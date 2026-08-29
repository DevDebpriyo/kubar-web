"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LegacyStoryRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === "#story") {
      router.replace("/products/navdhan#story");
    }
  }, [router]);

  return null;
}
