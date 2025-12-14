import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarketPulse } from './components/MarketPulse';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background font-sans overflow-x-hidden transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <MarketPulse />
          <Features />
          <Pricing />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </ThemeProvider>
  );
};

export default App;