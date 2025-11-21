import React from "react";

export default function LivingBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Glow Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full -top-40 -left-32 animate-pulse" />
      <div className="absolute w-[450px] h-[450px] bg-purple-600/20 blur-[140px] rounded-full top-20 -right-28 animate-pulse" />
      <div className="absolute w-[380px] h-[380px] bg-blue-500/20 blur-[110px] rounded-full bottom-0 left-1/2 -translate-x-1/2 animate-pulse" />
    </div>
  );
}