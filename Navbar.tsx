import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Ice Cream Logo">
    <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4Z" fill="#4a2c2a" />
    <path d="M24 36C29.5228 36 34 31.5228 34 26C34 20.4772 29.5228 16 24 16C18.4772 16 14 20.4772 14 26C14 31.5228 18.4772 36 24 36Z" fill="url(#paint0_linear_1_2)" />
    <path d="M24 28C25.1046 28 26 27.1046 26 26C26 24.8954 25.1046 24 24 24C22.8954 24 22 24.8954 22 26C22 27.1046 22.8954 28 24 28Z" fill="white" />
    <defs>
      <linearGradient id="paint0_linear_1_2" x1="14" y1="16" x2="34" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
  </svg>
);

const NavLinks = ({ isMobile = false, closeMenu }: { isMobile?: boolean, closeMenu?: () => void }) => {
  const links = ['خانه', 'محصولات', 'درباره ما', 'تماس با ما'];
  const linkClasses = "px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/20";
  const mobileLinkClasses = "block text-2xl text-center py-4 w-full rounded-md";
  
  return (
    <>
      {links.map((link, index) => (
        <a
          key={link}
          href="#"
          onClick={closeMenu}
          className={`
            ${isMobile ? mobileLinkClasses : linkClasses} 
            ${index === 0 
              ? 'bg-blue-600 text-white font-bold shadow-sm focus:ring-blue-400' 
              : 'text-white bg-black/30 hover:bg-black/50 focus:ring-white'}
          `}
        >
          {link}
        </a>
      ))}
    </>
  );
};


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute top-0 left-0 right-0 z-50 p-3"
    >
      <div className="container mx-auto max-w-4xl">
        <nav className="relative flex justify-between items-center bg-black/20 backdrop-blur-lg rounded-xl px-3 py-1 md:py-5 border border-white/10 shadow-lg">
          
          {/* Logo group: Sits on the right (start) in RTL */}
          <div className="flex items-center gap-1.5"> 
            <Logo />
            <span className="font-bold text-sm text-white hidden sm:block">بستنی یخی</span>
          </div>

          {/* Links and Mobile Menu Button Container: Sits on the left (end) in RTL */}
          <div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-0.5">
              <NavLinks />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Toggle navigation menu" aria-expanded={isOpen}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden mt-2 bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg"
            >
              <nav className="flex flex-col items-center gap-2">
                <NavLinks isMobile={true} closeMenu={() => setIsOpen(false)} />
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};