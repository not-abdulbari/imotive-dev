"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, Settings, LayoutGrid, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
  const [isToggled, setIsToggled] = useState<boolean | null>(null);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleToggle = () => {
    setIsToggled((prev) => (prev === null ? true : !prev));
  };

  // Default state classes based on breakpoints:
  // Mobile (<768px): Desktop sidebar hidden, bottom nav visible.
  // Tablet (768-1024px): Desktop sidebar visible but collapsed by default (w-20).
  // Desktop (>1024px): Desktop sidebar visible and expanded by default (w-64).

  return (
    <>
      {/* Mobile Bottom Navigation (<768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background/80 backdrop-blur-xl px-4 pb-safe">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href === '/dashboard' && pathname === '/');
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className="relative flex h-full flex-col items-center justify-center w-full"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active-indicator"
                  className="absolute inset-x-2 top-2 bottom-2 rounded-sm bg-primary/10 border border-primary/20 z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
              <Icon className={`h-5 w-5 relative z-10 transition-colors ${isActive ? 'text-primary' : 'text-foreground/50'}`} />
              <span className={`text-[10px] mt-1 relative z-10 font-medium ${isActive ? 'text-primary' : 'text-foreground/50'}`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop & Tablet Sidebar (>=768px) */}
      <nav 
        className={`hidden md:flex sticky left-0 top-0 h-screen border-r border-border bg-background/50 backdrop-blur-xl flex-col shrink-0 z-40 transition-[width] duration-300 ${
          isToggled === true 
            ? "w-64 lg:w-20" // Reverses default behavior
            : "w-20 lg:w-64" // Default behavior: tablet collapsed, desktop expanded
        }`}
      >
        <header className="flex items-center justify-between p-4 mb-2 h-16">
          <Link href="/" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="flex shrink-0 items-center justify-center">
              <img src="https://imotive.in/assets/logo-3HyrHKwN.png" alt="Imotive Logo" className="h-8 w-auto" />
            </div>
            {/* Show title when expanded */}
            <span className={`text-xl font-bold tracking-tight transition-opacity duration-300 ${
              isToggled === true 
                ? "opacity-100 lg:opacity-0" 
                : "opacity-0 lg:opacity-100"
            }`}>
              Imotive Dashboard
            </span>
          </Link>
        </header>
        
        <button 
          onClick={handleToggle}
          className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-foreground/70 hover:text-foreground hover:scale-110 transition-all z-50 shadow-sm"
        >
          {isToggled === true ? (
            <>
              <ChevronLeft size={14} className="block lg:hidden" />
              <ChevronRight size={14} className="hidden lg:block" />
            </>
          ) : (
            <>
              <ChevronRight size={14} className="block lg:hidden" />
              <ChevronLeft size={14} className="hidden lg:block" />
            </>
          )}
        </button>

        <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-hide flex flex-col justify-between">
          <ul className="space-y-2 font-medium relative">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href === '/dashboard' && pathname === '/');
              
              return (
                <li key={link.name} className="relative z-10">
                  <Link
                    href={link.href}
                    className="group relative flex items-center rounded-sm text-foreground/80 hover:text-foreground transition-all duration-300 overflow-hidden"
                    title={link.name}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute inset-0 rounded-sm bg-primary/10 border border-primary/20 z-0"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                    <div className="flex h-10 w-[56px] shrink-0 items-center justify-center relative z-10">
                      <Icon className={`h-5 w-5 transition duration-300 ${isActive ? 'text-primary' : 'text-foreground/50 group-hover:text-foreground'}`} />
                    </div>
                    <span 
                      className={`whitespace-nowrap pr-4 relative z-10 transition-opacity duration-300 ${isActive ? 'font-semibold text-primary' : ''} ${
                        isToggled === true ? "opacity-100 lg:opacity-0" : "opacity-0 lg:opacity-100"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="mt-6 mb-2">
            <a href="https://imotive.in/" target="_blank" rel="noopener noreferrer">
              <button
                className="group relative flex w-full items-center rounded-sm text-foreground/80 hover:text-destructive hover:bg-destructive/10 transition-all duration-300 overflow-hidden"
                title="Visit Imotive"
                onClick={(e) => e.preventDefault()}
              >
                <div className="flex h-10 w-[56px] shrink-0 items-center justify-center relative z-10">
                  <LogOut className="h-5 w-5 transition duration-300 group-hover:text-destructive" />
                </div>
                <span
                  className={`whitespace-nowrap relative z-10 transition-opacity duration-300 ${
                    isToggled === true ? "opacity-100 lg:opacity-0" : "opacity-0 lg:opacity-100"
                  }`}
                >
                  Logout
                </span>
              </button>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
