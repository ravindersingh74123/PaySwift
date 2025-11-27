"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-sm text-gray-600 animate-pulse">
          Loading, please wait...
        </div>
      </div>
    </div>
  );
}
