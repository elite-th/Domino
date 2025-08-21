import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { ANIMATION_STAGES } from '../constants';

interface TransitionSectionProps {
    animationProgress: MotionValue<number>;
}

export const TransitionSection = ({ animationProgress }: TransitionSectionProps) => {
    const { stages } = ANIMATION_STAGES;
    const contentOpacity = useTransform(
        animationProgress,
        [stages.HERO_EXIT_END, stages.TRANSITION_ENTER, stages.TRANSITION_EXIT - 0.05, stages.TRANSITION_EXIT],
        [0, 1, 1, 0]
    );
    const contentScale = useTransform(
        animationProgress,
        [stages.HERO_EXIT_END, stages.TRANSITION_ENTER],
        [0.9, 1]
    );

  return (
    <section className="full-section w-screen relative z-20 flex items-center bg-blue-600 overflow-hidden p-8">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-[100px] top-1/4 left-1/4 animate-pulse"></div>
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-[100px] bottom-1/4 right-1/4 animate-pulse animation-delay-2000"></div>
      
      <div className="container mx-auto w-full">
        <div className="flex justify-end">
            <motion.div 
              style={{ opacity: contentOpacity, scale: contentScale }}
              className="text-right max-w-xl md:max-w-2xl relative z-10"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
                سفری به دنیای طعم‌ها
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-xl text-blue-100 leading-relaxed drop-shadow-md">
                هر بستنی ما یک داستان جدید از طعم و تازگی است. ما بهترین مواد اولیه را از دل طبیعت انتخاب می‌کنیم تا شما بهترین و خنک‌ترین لحظات را تجربه کنید.
              </p>
            </motion.div>
        </div>
      </div>
    </section>
  );
};