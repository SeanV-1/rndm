import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.01 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm dark:shadow-none ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
      <div className="relative z-10 p-6 h-full">
        {children}
      </div>
    </motion.div>
  );
};