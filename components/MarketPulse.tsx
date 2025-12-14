import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Zap, BarChart3, Globe } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const initialAssets: Asset[] = [
  { symbol: 'SPX', name: 'S&P 500', price: 4783.45, change: 1.2 },
  { symbol: 'NDX', name: 'Nasdaq 100', price: 16832.90, change: 1.8 },
  { symbol: 'BTC', name: 'Bitcoin', price: 64230.50, change: -0.5 },
  { symbol: 'ETH', name: 'Ethereum', price: 3450.12, change: 2.1 },
  { symbol: 'XAU', name: 'Gold', price: 2045.60, change: 0.3 },
];

export const MarketPulse: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [activeTab, setActiveTab] = useState<'overview' | 'movers'>('overview');

  // Simulate live market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => {
        const volatility = asset.price * 0.002; // 0.2% volatility
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = asset.price + change;
        const priceChangePercent = ((newPrice - asset.price) / asset.price) * 100;
        
        return {
          ...asset,
          price: newPrice,
          change: asset.change + (Math.random() - 0.5) * 0.1 // drift change slightly
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 md:px-6 relative z-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-96 bg-primary/5 blur-[120px] -z-10 rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-primary text-sm font-bold tracking-wider uppercase">Live Market Intelligence</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-gray-900 dark:text-white leading-tight">
              Pulse of the <span className="italic text-primary">economy</span>.
            </h2>
          </div>
          
          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
            {['overview', 'movers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Card */}
          <div className="lg:col-span-2">
            <GlassCard className="h-full min-h-[400px] flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Global Sentiment Index</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">AI-derived aggregate of global liquidity</p>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +2.4% Today
                </div>
              </div>

              {/* Animated Chart Area */}
              <div className="flex-1 relative w-full flex items-end px-2 pb-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#90B8F0" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#90B8F0" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    {/* Area under curve */}
                    <motion.path
                        d="M0,50 L0,35 C10,32 20,40 30,30 C40,20 50,25 60,15 C70,5 80,10 90,5 L100,0 L100,50 Z"
                        fill="url(#chartGradient)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />
                    
                    {/* Line path */}
                    <motion.path
                        d="M0,35 C10,32 20,40 30,30 C40,20 50,25 60,15 C70,5 80,10 90,5 L100,0"
                        fill="none"
                        stroke="#90B8F0"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                </svg>
                
                {/* Floating "Live" Point */}
                <motion.div 
                    className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(144,184,240,0.8)]"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between text-xs text-gray-400 mt-4 border-t border-gray-200 dark:border-white/5 pt-4">
                <span>09:30 AM</span>
                <span>11:00 AM</span>
                <span>01:00 PM</span>
                <span>03:00 PM</span>
                <span>LIVE</span>
              </div>
            </GlassCard>
          </div>

          {/* Asset List Side Panel */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-0 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" /> Market Movers
                    </h4>
                    <Globe className="h-4 w-4 text-gray-400" />
                </div>
                <div className="divide-y divide-gray-200 dark:divide-white/5">
                    {assets.map((asset) => (
                        <div key={asset.symbol} className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center font-bold text-xs text-gray-600 dark:text-gray-300 group-hover:bg-primary group-hover:text-[#0F1011] transition-colors">
                                    {asset.symbol}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{asset.name}</div>
                                    <div className="text-xs text-gray-500">Vol: {(asset.price / 100).toFixed(1)}M</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-gray-900 dark:text-white">
                                    {asset.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </div>
                                <div className={`text-xs font-medium flex items-center justify-end gap-1 ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {asset.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {Math.abs(asset.change).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* AI Insight Mini Card */}
            <GlassCard className="bg-gradient-to-br from-primary/20 to-transparent border-primary/20">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary text-[#0F1011] rounded-lg">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <div>
                        <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-1">AI Opportunity Detected</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                            Unusual accumulation volume detected in Tech sector ETFs. Suggesting review of semiconductor allocation.
                        </p>
                    </div>
                </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};