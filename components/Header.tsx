import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight, ChevronRight, Hexagon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Solutions', href: '#' },
  { name: 'Intelligence', href: '#' },
  { name: 'Private Client', href: '#' },
  { name: 'About', href: '#' },
];

export const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
        when: "afterChildren"
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="pointer-events-auto relative flex items-center justify-between"
          initial={{
            width: "100%",
            marginTop: 0,
            borderRadius: 0,
            padding: "1.5rem 2rem",
            background: "rgba(0,0,0,0)",
            backdropFilter: "blur(0px)",
            border: "1px solid rgba(0,0,0,0)",
          }}
          animate={{
            width: isScrolled ? "90%" : "100%",
            maxWidth: isScrolled ? "1000px" : "100%",
            marginTop: isScrolled ? 20 : 0,
            borderRadius: isScrolled ? "24px" : "0px",
            padding: isScrolled ? "0.75rem 1.5rem" : "1.5rem 3rem",
            background: isScrolled 
              ? (theme === 'dark' ? "rgba(15, 16, 17, 0.75)" : "rgba(255, 255, 255, 0.75)")
              : "rgba(0,0,0,0)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            borderColor: isScrolled
              ? (theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)")
              : "rgba(0,0,0,0)",
            boxShadow: isScrolled 
              ? "0 20px 40px -5px rgba(0,0,0,0.1)" 
              : "none",
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Logo Section */}
            <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => window.location.reload()}
            >
                <motion.div 
                    className="relative w-8 h-8 flex items-center justify-center text-primary"
                    animate={{ rotate: isScrolled ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "backOut" }}
                >
                     <Hexagon className="w-full h-full fill-current opacity-20 absolute" />
                     <Hexagon className="w-6 h-6 stroke-2" />
                </motion.div>
                <motion.span 
                    className="font-serif font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden md:block"
                    animate={{ 
                        opacity: isScrolled ? 0 : 1, 
                        width: isScrolled ? 0 : 'auto', 
                        marginLeft: isScrolled ? 0 : 12 
                    }}
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                    WealthFlow
                </motion.span>
                <motion.span 
                    className="font-serif font-bold text-lg text-gray-900 dark:text-white md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    WF
                </motion.span>
            </div>

            {/* Desktop Navigation */}
             <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(link.name)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <span className="relative z-10">{link.name}</span>
                        <AnimatePresence>
                            {hoveredLink === link.name && (
                                <motion.div
                                    className="absolute left-4 right-4 -bottom-0.5 h-px"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    exit={{ scaleX: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                >
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
                                     <div className="absolute inset-0 blur-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </a>
                ))}
            </nav>

            {/* Right Action Area */}
            <div className="flex items-center gap-3">
                 <motion.button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors relative overflow-hidden"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                 >
                     <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={theme}
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.div>
                     </AnimatePresence>
                 </motion.button>
                 
                 <div className="hidden md:block w-px h-5 bg-gray-200 dark:bg-white/10" />

                 <motion.button
                    className="hidden md:flex items-center gap-2 bg-primary text-[#0F1011] px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:brightness-105 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                 >
                    Get Access
                    <ArrowUpRight size={16} />
                 </motion.button>

                 <motion.button 
                    className="md:hidden p-2 text-gray-900 dark:text-white"
                    onClick={() => setMobileMenuOpen(true)}
                    whileTap={{ scale: 0.9 }}
                 >
                    <Menu size={24} />
                 </motion.button>
            </div>
        </motion.div>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl md:hidden flex flex-col shadow-2xl"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{ originX: 1 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
               <motion.div 
                    variants={itemVariants} 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => window.location.reload()}
               >
                   <div className="w-8 h-8 text-primary flex items-center justify-center">
                       <Hexagon className="w-full h-full stroke-2" />
                   </div>
                  <span className="font-serif text-xl font-bold text-gray-900 dark:text-white">WealthFlow</span>
               </motion.div>
               <motion.button 
                variants={itemVariants}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
               >
                 <X className="h-6 w-6" />
               </motion.button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-between py-4 border-b border-gray-100 dark:border-white/5"
                  variants={itemVariants}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-3xl font-serif font-light text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {link.name}
                  </span>
                  <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                </motion.a>
              ))}
            </div>

            <motion.div variants={itemVariants} className="p-8 pb-12">
              <button className="w-full bg-primary text-[#0F1011] py-4 rounded-2xl font-bold text-lg mb-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                Get Started Now
              </button>
              <div className="flex justify-center gap-6 mt-6">
                  <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Privacy</a>
                  <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Terms</a>
                  <a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">Support</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};