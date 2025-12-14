import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { getFinancialInsight } from '../services/geminiService';
import { ChatState } from '../types';

export const Hero: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    query: '',
    response: null,
    isLoading: false,
    error: null,
  });

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatState.query.trim()) return;

    setChatState(prev => ({ ...prev, isLoading: true, error: null, response: null }));

    try {
      const result = await getFinancialInsight(chatState.query);
      setChatState(prev => ({ ...prev, isLoading: false, response: result }));
    } catch (err) {
      setChatState(prev => ({ ...prev, isLoading: false, error: "Unable to retrieve insights. Please try again." }));
    }
  }, [chatState.query]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-12 transition-colors duration-300">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Cinematic Background" 
          className="w-full h-full object-cover opacity-20 dark:opacity-40 transition-opacity duration-700 ease-in-out"
        />
        {/* Adaptive Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-slate-50/80 to-background dark:from-background/80 dark:via-background/90 dark:to-background transition-colors duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent dark:from-blue-900/20 dark:via-background/0 dark:to-background transition-colors duration-500" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm transition-colors duration-300"
        >
          <Sparkles className="mr-2 h-3 w-3" />
          <span>Intelligent Wealth OS</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl transition-colors duration-300"
        >
          Own your <span className="text-primary italic">wealth</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl font-light transition-colors duration-300"
        >
          Navigating the complexities of modern capital with AI-driven clarity and precision.
        </motion.p>

        {/* Interactive Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/30 to-blue-600/30 opacity-30 dark:opacity-50 blur transition duration-1000 group-hover:opacity-75 group-hover:duration-200" />
            <div className="relative flex items-center bg-white dark:bg-[#151618] rounded-2xl border border-gray-200 dark:border-white/10 p-2 shadow-2xl transition-all duration-300 ease-in-out">
              <Search className="h-5 w-5 text-gray-400 ml-3 transition-colors duration-300" />
              <input 
                type="text"
                value={chatState.query}
                onChange={(e) => setChatState(prev => ({ ...prev, query: e.target.value }))}
                placeholder="Ask about market trends, portfolio strategies, or asset allocation..."
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white px-4 py-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-light transition-colors duration-300"
              />
              <button 
                type="submit"
                disabled={chatState.isLoading}
                className="bg-primary hover:bg-primary/90 text-[#0F1011] rounded-xl px-4 py-2 transition-all duration-200 disabled:opacity-50 font-medium"
              >
                {chatState.isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </form>

          {/* AI Response Area */}
          {(chatState.response || chatState.error) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-6 text-left rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-lg dark:shadow-none transition-colors duration-300"
            >
              <h3 className="text-primary text-xs font-bold uppercase tracking-wider mb-2">WealthFlow Intelligence</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed transition-colors duration-300">
                {chatState.error ? <span className="text-red-500 dark:text-red-400">{chatState.error}</span> : chatState.response}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};