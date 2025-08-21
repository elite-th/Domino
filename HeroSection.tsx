import React, { forwardRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { IceCream } from './types';
import { Navbar } from './Navbar';

interface HeroSectionProps {
  iceCream: IceCream;
  animationProgress: MotionValue<number>;
}

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(({ iceCream, animationProgress }, ref) => {
  const opacity = useTransform(animationProgress, [0.05, 0.1], [1, 0]);
  const scale = useTransform(animationProgress, [0, 0.1], [1, 1]); // Keep scale at 1
  const textY = useTransform(animationProgress, [0, 0.15], [0, -100]);
  const textOpacity = useTransform(animationProgress, [0, 0.15], [1, 0]);

  return (
    <section className="h-screen w-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-b from-white from-50% to-[#4a2c2a] to-50% md:bg-gradient-to-l md:from-[#4a2c2a] md:from-50% md:to-white md:to-50%">
      <Navbar />
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            style={{ y: textY, opacity: textOpacity }} 
            className="text-center md:text-right md:col-start-2"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#4a2c2a] drop-shadow-xl leading-tight">
              طعم غنی <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800`}>{iceCream.name}</span>
            </h1>
            <p className="max-w-md mx-auto md:mx-0 md:ml-auto mt-4 sm:mt-6 text-base sm:text-lg text-gray-700/80 drop-shadow-md">
              تجربه‌ای لوکس و خامه‌ای از بهترین دانه‌های کاکائو. غرق در دنیای شکلات شوید.
            </p>
          </motion.div>

          <div className="relative flex justify-center items-center h-[40vh] md:h-auto md:col-start-1 md:row-start-1">
             <motion.div
              ref={ref}
              style={{ opacity }}
              className="w-48 h-72 sm:w-64 sm:h-96 md:w-80 md:h-[480px] lg:w-96 lg:h-[576px]"
            >
              <motion.img 
                style={{ scale }}
                src={iceCream.ice} 
                alt={iceCream.name} 
                className="w-full h-full object-contain drop-shadow-2xl" 
              />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 animate-bounce text-gray-600 md:text-white z-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
});