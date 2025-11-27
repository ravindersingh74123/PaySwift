"use client";

import { Center } from "@/ui/src/Center";

export default function Loading() {
  return (
    <Center>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin justify-center" />
          <div className="text-sm text-gray-600 animate-pulse justify-center">
            Loading, please wait...
          </div>
        </div>
      </div>
    </Center>
  );
}
