"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4"
    >
      <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Something went wrong!</h2>
      <p className="text-foreground/60 max-w-md mx-auto mb-8">
        We encountered a critical error while trying to load the dashboard. This might be due to missing database credentials or connection issues.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:gap-3 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </motion.div>
  );
}
