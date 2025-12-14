import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import { TrendingUp, ShieldCheck, Globe, Zap, PieChart, Lock } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: '1',
    title: 'Global Markets',
    description: 'Real-time access to international exchanges with zero latency execution.',
    icon: <Globe className="h-6 w-6 text-primary" />,
    colSpan: 'md:col-span-2'
  },
  {
    id: '2',
    title: 'Smart Analytics',
    description: 'Predictive modeling for your portfolio.',
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    colSpan: 'md:col-span-1'
  },
  {
    id: '3',
    title: 'Secure Vault',
    description: 'Military-grade encryption for all assets.',
    icon: <Lock className="h-6 w-6 text-primary" />,
    colSpan: 'md:col-span-1'
  },
  {
    id: '4',
    title: 'AI Advisory',
    description: 'Personalized wealth strategies tailored to your life goals and risk tolerance.',
    icon: <Zap className="h-6 w-6 text-primary" />,
    colSpan: 'md:col-span-2'
  },
  {
    id: '5',
    title: 'Diversification',
    description: 'Automated rebalancing across asset classes.',
    icon: <PieChart className="h-6 w-6 text-primary" />,
    colSpan: 'md:col-span-3'
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
              Orchestrate your <span className="text-primary">financial future</span>.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-light">
              A suite of premium tools designed for the sophisticated investor who demands precision and control.
            </p>
          </div>
          <div className="hidden md:block">
            <button className="text-primary hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
              View all features <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${feature.colSpan || 'md:col-span-1'}`}
            >
              <GlassCard className="h-full flex flex-col justify-between group">
                <div>
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">Explore</span>
                  <ArrowRight className="h-4 w-4 text-primary -translate-x-2 group-hover:translate-x-0 transition-transform" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);