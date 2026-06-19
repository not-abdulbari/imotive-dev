"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Flame, Activity, AlertCircle } from "lucide-react";
import type { Course } from "@/types";
import { CourseCard } from "./CourseCard";

export default function DashboardClient({ courses, error }: { courses: Course[] | null, error: string | null }) {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("imotive_user_name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  const hoverVariants: Variants = {
    rest: { y: 0, filter: "brightness(1)" },
    hover: { 
      y: -4, 
      filter: "brightness(0.7)", 
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div className="pb-10 w-full">
      {error && (
        <motion.div 
          role="alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-sm bg-destructive/10 p-4 border border-destructive/20 flex items-start gap-3"
        >
          <AlertCircle className="text-destructive mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-semibold text-destructive">Database Connection Error</h3>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(160px,auto)]"
      >
        {/* Hero Tile - Spans 2 columns on tablet and desktop */}
        <motion.article
          variants={itemVariants}
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="col-span-1 md:col-span-2 lg:col-span-2 rounded-sm bg-gradient-to-br from-primary/20 via-primary/5 to-background p-8 border border-primary/10 relative overflow-hidden group flex flex-col justify-center"
        >
          {/* Apply hover variants internally via Framer motion inheritance */}
          <motion.div variants={hoverVariants} className="absolute inset-0 rounded-sm pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <header className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-500 border border-orange-500/20 shadow-sm backdrop-blur-md">
                <Flame size={16} className="fill-orange-500 text-orange-500" />
                <span>12 Day Streak!</span>
              </div>
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20 bg-card shadow-lg ring-4 ring-background">
                <img src="https://i.pravatar.cc/150?img=11" alt="User avatar" className="h-full w-full object-cover" />
              </div>
            </header>
            
            <section>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">
                Welcome back, {userName}
              </h1>
              <p className="text-foreground/70 text-lg max-w-md">
                You're making great progress. Ready to continue your journey today?
              </p>
            </section>
          </div>
        </motion.article>

        {/* Activity Tile */}
        <motion.article
          variants={itemVariants}
          initial="rest"
          whileHover="hover"
          animate="rest"
          className="col-span-1 md:col-span-2 lg:col-span-2 rounded-sm bg-card p-6 border border-border transition-colors flex flex-col relative overflow-hidden group hover:border-primary/30"
        >
          <motion.div variants={hoverVariants} className="absolute inset-0 rounded-sm pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 h-full flex flex-col">
            <header className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-sm bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-inner">
                <Activity size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground">Recent Activity</h3>
            </header>
            
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-foreground">Completed React Module</span>
                </div>
                <span className="text-xs text-foreground/50">2h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-foreground">Started Next.js Basics</span>
                </div>
                <span className="text-xs text-foreground/50">5h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-sm font-medium text-foreground">Earned "Fast Learner" Badge</span>
                </div>
                <span className="text-xs text-foreground/50">1d ago</span>
              </div>
            </div>
            
            <button className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-sm bg-secondary/50 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
              View All Activity
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.article>

        {/* Dynamic Course Tiles */}
        {courses && courses.length > 0 ? courses.map((course) => (
          <CourseCard key={course.id} course={course} variants={itemVariants} hoverVariants={hoverVariants} />
        )) : (
          !error && (
            <motion.article variants={itemVariants} className="col-span-full text-center text-foreground/50 py-10 rounded-sm border border-dashed border-border bg-card/50">
              No courses available. Start by adding some data.
            </motion.article>
          )
        )}
      </motion.section>
    </div>
  );
}
