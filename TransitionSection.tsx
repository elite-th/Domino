import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface TransitionSectionProps {
    animationProgress: MotionValue<number>;
}

export const TransitionSection = ({ animationProgress }: TransitionSectionProps) => {
    const contentOpacity = useTransform(
        animationProgress,
        [0.45, 0.55, 0.7],
        [0, 1, 0]
    );
    const contentScale = useTransform(
        animationProgress,
        [0.45, 0.55, 0.7],
        [0.8, 1, 0.8]
    );

  return (
    <section className="h-screen w-screen relative z-20 flex flex-col md:flex-row items-center justify-end bg-[#2d1a1a] overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-amber-600/10 rounded-full blur-[100px] top-1/4 left-1/4 animate-pulse"></div>
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-[100px] bottom-1/4 right-1/4 animate-pulse animation-delay-2000"></div>
      
      {/* Spacer for animation path on mobile */}
      <div className="flex-grow w-full md:hidden" aria-hidden="true"></div>

      <motion.div 
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="text-center md:text-right p-8 pb-24 md:p-16 max-w-2xl relative z-10 w-full"
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          سفری به دنیای طعم‌ها
        </h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-amber-100 leading-relaxed max-w-lg mx-auto md:mx-0">
          هر بستنی ما یک داستان جدید از طعم و تازگی است. ما بهترین میوه‌ها را از دل طبیعت انتخاب می‌کنیم تا شما بهترین و خنک‌ترین لحظات را تجربه کنید.
        </p>
      </motion.div>
    </section>
  );
};