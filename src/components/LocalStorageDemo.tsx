"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function LocalStorageDemo({ pageName }: { pageName: string }) {
  const [name, setName] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedName = localStorage.getItem("imotive_user_name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAccept = () => {
    localStorage.setItem("imotive_user_name", name);
    // Optionally provide some feedback, here we'll just let the UI state represent it
  };

  if (!mounted) return <div className="h-40 animate-pulse bg-card/50 rounded-sm" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-sm bg-card border border-border/50 max-w-2xl w-full"
    >
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">{pageName} Page</h1>
        <p className="text-foreground/70">
          This is a dummy page to demonstrate local storage persistence across the dashboard.
        </p>
      </header>

      <section className="bg-background/50 p-6 rounded-sm border border-border/30">
        <h2 className="text-lg font-semibold mb-4">Local Storage Demo</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name-input" className="text-sm text-foreground/80 font-medium">
            Your Global Display Name:
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name..."
              className="flex-1 bg-card border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button 
              onClick={handleAccept}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-sm font-semibold hover:bg-primary/90 hover:brightness-75 transition-all w-full md:w-auto shrink-0"
            >
              Accept
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-primary font-medium">
          {name ? `Hello, ${name}! Click Accept to sync it across all pages.` : "Enter a name to sync it via local storage."}
        </p>
      </section>
    </motion.div>
  );
}
