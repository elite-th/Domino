
import React, { forwardRef } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ICE_CREAMS } from '../constants';

interface ProductsSectionProps {
    animatedIceCreamId: number;
    animationProgress: MotionValue<number>;
}

export const ProductsSection = forwardRef<HTMLDivElement, ProductsSectionProps>(({ animatedIceCreamId, animationProgress }, ref) => {
  return (
    <section className="full-section w-screen relative z-30 bg-white flex flex-col justify-start pt-24 sm:justify-center sm:pt-0">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800">محصولات ما</h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">یک طعم برای هر سلیقه‌ای</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
          {ICE_CREAMS.map((iceCream, index) => (
            <ProductCard
              key={iceCream.id}
              iceCream={iceCream}
              isTarget={iceCream.id === animatedIceCreamId}
              animationProgress={animationProgress}
              ref={iceCream.id === animatedIceCreamId ? ref : null}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});