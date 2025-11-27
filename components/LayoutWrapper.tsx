"use client";

import { usePathname } from "next/navigation";
import { AppbarClient } from "../components/AppbarClient";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showAppbar = pathname !== "/signin";

  return (
    <div className="min-w-full min-h-screen overflow-x-hidden">
      {showAppbar && <AppbarClient />}
      {children}
    </div>
  );
}
