"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="pb-10 w-full">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="h-10 w-48 bg-card rounded-sm animate-pulse" />
          <div className="h-4 w-64 bg-card rounded-md mt-4 animate-pulse" />
        </div>
        <div className="h-12 w-12 rounded-full bg-card animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(160px,auto)]">
        {/* Hero skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[344px] rounded-sm bg-card/50 border border-border/20 animate-pulse" />
        
        {/* Activity skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[344px] rounded-sm bg-card/50 border border-border/20 animate-pulse" />
        
        {/* Course skeletons */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="col-span-1 h-[160px] rounded-sm bg-card/50 border border-border/20 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
