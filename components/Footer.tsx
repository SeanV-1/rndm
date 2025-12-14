import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-gray-200 dark:border-white/5 pt-16 pb-8 relative z-10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
                <div className="h-5 w-5 bg-primary rounded-full" />
                <span className="font-serif text-lg font-bold text-gray-900 dark:text-white tracking-tight">WealthFlow</span>
            </div>
            <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed">
              Redefining wealth management for the modern era through intelligence and design.
            </p>
          </div>
          
          {[
            { title: "Platform", links: ["Markets", "Advisory", "Analytics", "Security"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Disclosures", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-gray-900 dark:text-white font-medium mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-gray-600 dark:text-gray-500 text-sm hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-600 text-xs">
            © 2024 WealthFlow Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 dark:text-gray-600 text-xs">San Francisco</span>
            <span className="text-gray-500 dark:text-gray-600 text-xs">London</span>
            <span className="text-gray-500 dark:text-gray-600 text-xs">New York</span>
          </div>
        </div>
      </div>
    </footer>
  );
};