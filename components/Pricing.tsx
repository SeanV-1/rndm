import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Shield, Zap, X, Send, Building2, User, Mail, MessageSquare } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface Plan {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'core',
    name: 'Core',
    price: { monthly: 29, yearly: 290 },
    description: 'Essential tools for the modern investor.',
    features: ['Real-time market data', 'Basic AI insights', 'Portfolio tracking', 'Standard support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 99, yearly: 990 },
    description: 'Advanced intelligence for active wealth building.',
    features: ['Everything in Core', 'Predictive AI modeling', 'Tax-loss harvesting', 'Priority concierge', 'Unlimited rebalancing'],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: { monthly: 299, yearly: 2990 },
    description: 'Full-spectrum family office management.',
    features: ['Everything in Pro', 'Direct advisor access', 'Estate planning tools', 'Private equity access', 'Custom API integration'],
  },
];

export const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            setIsContactOpen(false);
            setIsSuccess(false);
            setFormState({ name: '', email: '', company: '', message: '' });
        }, 2000);
    }, 1500);
  };

  return (
    <section className="py-24 px-4 md:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white mb-6">
            Invest in <span className="text-primary">intelligence</span>.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Choose the tier that aligns with your capital ambitions.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex items-center p-1 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 relative">
            <div className="relative z-10 flex">
                <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                }`}
                >
                Monthly
                </button>
                <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                }`}
                >
                Yearly <span className="text-xs text-primary ml-1 font-bold">-20%</span>
                </button>
            </div>
            <motion.div
                className="absolute top-1 bottom-1 bg-white dark:bg-[#1F2125] rounded-full shadow-sm"
                initial={false}
                animate={{
                    left: billingCycle === 'monthly' ? '4px' : '50%',
                    width: billingCycle === 'monthly' ? 'calc(50% - 4px)' : 'calc(50% - 6px)',
                    x: billingCycle === 'monthly' ? 0 : 2
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div key={plan.id} className="h-full">
                <GlassCard 
                    className={`h-full flex flex-col relative transition-all duration-300 ${plan.popular ? 'border-primary/50 shadow-xl shadow-primary/10' : ''}`}
                    hoverEffect={true}
                >
                    {plan.popular && (
                        <div className="absolute top-0 right-0 bg-primary text-[#0F1011] text-xs font-bold px-3 py-1 rounded-bl-xl">
                            MOST POPULAR
                        </div>
                    )}

                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                        <p className="text-gray-500 text-sm h-10">{plan.description}</p>
                    </div>

                    <div className="mb-8 flex items-baseline">
                        <span className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
                            ${billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.yearly / 12)}
                        </span>
                        <span className="text-gray-500 ml-2">/ month</span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                <div className="mt-0.5 min-w-[16px]">
                                    <Check className="h-4 w-4 text-primary" />
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={() => plan.id === 'elite' ? setIsContactOpen(true) : null}
                        className={`w-full py-3 rounded-xl font-bold transition-all ${
                            plan.popular 
                            ? 'bg-primary text-[#0F1011] hover:brightness-110 shadow-lg shadow-primary/20' 
                            : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
                        }`}
                    >
                        {plan.id === 'elite' ? 'Contact Sales' : 'Start Trial'}
                    </button>
                </GlassCard>
            </div>
          ))}
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-24 border-t border-gray-200 dark:border-white/5 pt-12">
            <h3 className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                        Is my data secure? <Shield className="h-4 w-4 opacity-50" />
                    </h4>
                    <p className="text-sm text-gray-500">We use bank-level AES-256 encryption and never sell your personal data.</p>
                </div>
                <div className="p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                        Can I cancel anytime? <Star className="h-4 w-4 opacity-50" />
                    </h4>
                    <p className="text-sm text-gray-500">Yes, there are no lock-in contracts. You can cancel your subscription instantly.</p>
                </div>
            </div>
        </div>
      </div>

      {/* Contact Sales Modal */}
      <AnimatePresence>
        {isContactOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsContactOpen(false)}
                />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg bg-white dark:bg-[#151618] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {!isSuccess ? (
                        <>
                            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                                <div>
                                    <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">Contact Sales</h3>
                                    <p className="text-sm text-gray-500">Customized solutions for high-net-worth individuals.</p>
                                </div>
                                <button 
                                    onClick={() => setIsContactOpen(false)} 
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleContactSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <input 
                                                required
                                                type="text" 
                                                value={formState.name}
                                                onChange={e => setFormState({...formState, name: e.target.value})}
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">Work Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <input 
                                                    required
                                                    type="email" 
                                                    value={formState.email}
                                                    onChange={e => setFormState({...formState, email: e.target.value})}
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">Company</label>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                <input 
                                                    type="text" 
                                                    value={formState.company}
                                                    onChange={e => setFormState({...formState, company: e.target.value})}
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
                                                    placeholder="Acme Inc."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">Inquiry Details</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <textarea 
                                                required
                                                rows={4}
                                                value={formState.message}
                                                onChange={e => setFormState({...formState, message: e.target.value})}
                                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all resize-none"
                                                placeholder="Tell us about your investment goals..."
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full bg-primary text-[#0F1011] font-bold py-3 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                                    >
                                        {isSubmitting ? (
                                            <>Processing...</>
                                        ) : (
                                            <>Request Consultation <Send size={16} /></>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }} 
                                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                            >
                                <Check className="text-white w-8 h-8" strokeWidth={3} />
                            </motion.div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Request Received</h3>
                            <p className="text-gray-500 mb-6">Our dedicated wealth concierge will contact you within 24 hours.</p>
                            <button 
                                onClick={() => setIsContactOpen(false)}
                                className="px-6 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </section>
  );
};