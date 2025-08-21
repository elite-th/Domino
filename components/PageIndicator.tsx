
import React from 'react';
import { motion } from 'framer-motion';

interface PageIndicatorProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isWheeling: boolean;
}

const sections = ['خانه', 'معرفی', 'محصولات'];

export const PageIndicator: React.FC<PageIndicatorProps> = ({ activeIndex, setActiveIndex, isWheeling }) => {
  const handleClick = (index: number) => {
    if (isWheeling) return;
    setActiveIndex(index);
  }
  
  return (
    <nav 
      className="fixed top-1/2 right-4 md:right-8 -translate-y-1/2 z-50"
      aria-label="Page navigation"
    >
      <ul className="flex flex-col items-center gap-4">
        {sections.map((section, index) => (
          <li key={section} className="relative group">
            <button
              onClick={() => handleClick(index)}
              className="relative w-8 h-8 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform duration-300 hover:scale-110"
              aria-label={`برو به بخش ${section}`}
              aria-current={activeIndex === index ? 'page' : undefined}
              disabled={isWheeling}
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-gray-800 scale-150' : 'bg-gray-800/40 group-hover:bg-gray-800'}`}></div>
              {activeIndex === index && (
                <motion.div
                  layoutId="active-indicator-ring"
                  className="absolute inset-0 border-2 border-blue-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </button>
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 bg-gray-800/80 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {section}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};