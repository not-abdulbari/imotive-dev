"use client";

import { motion } from "framer-motion";
import { Code, Layers, PlayCircle, Database, BookOpen } from "lucide-react";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  variants?: any;
  hoverVariants?: any;
}

export function CourseCard({ course, variants, hoverVariants }: CourseCardProps) {
  const getIcon = (name: string | null) => {
    switch (name) {
      case "Code":
        return <Code size={20} />;
      case "Layers":
        return <Layers size={20} />;
      case "PlayCircle":
        return <PlayCircle size={20} />;
      case "Database":
        return <Database size={20} />;
      default:
        return <BookOpen size={20} />;
    }
  };

  return (
    <motion.article
      variants={variants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative flex flex-col h-full rounded-sm border border-border bg-card p-6 overflow-hidden hover:border-primary/50 transition-colors duration-300 group min-h-[180px]"
    >
      <motion.div variants={hoverVariants} className="absolute inset-0 rounded-sm pointer-events-none z-20" />
      
      {/* Background grain texture and mesh gradient */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-0 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

      <header className="relative z-10 flex items-start gap-4 mb-4 pr-2">
        <motion.div 
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary shadow-inner origin-center"
          variants={{
            rest: { scale: 1, rotate: 0 },
            hover: { scale: 1.1, rotate: 3, transition: { type: "spring", stiffness: 300, damping: 20 } }
          }}
        >
          {getIcon(course.icon_name)}
        </motion.div>
        <h3 title={course.title} className="font-bold text-foreground text-[1.1rem] leading-tight mt-1 line-clamp-2">
          {course.title}
        </h3>
      </header>

      <footer className="relative z-10 mt-auto pt-4 flex flex-col gap-4">
        <div>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-foreground/80 font-bold tracking-wide uppercase">Progress</span>
            <span className="font-extrabold text-primary">{course.progress}%</span>
          </div>
          <div className="h-2.5 w-full rounded-sm bg-secondary/50 overflow-hidden shadow-inner">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: course.progress ? course.progress / 100 : 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.1 }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full rounded-sm bg-gradient-to-r from-primary to-purple-400 relative"
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }} />
            </motion.div>
          </div>
        </div>
        
        <button className="w-full rounded-sm bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground transition-colors py-2 text-sm font-semibold flex justify-center items-center gap-2 group/btn">
          Continue Course
          <svg className="transition-transform group-hover/btn:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </footer>
    </motion.article>
  );
}
