
import React, { forwardRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { IceCream } from '../types';
import { ANIMATION_STAGES } from '../constants';

interface ProductCardProps {
    iceCream: IceCream;
    isTarget: boolean;
    animationProgress: MotionValue<number>;
    index: number;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ iceCream, isTarget, animationProgress, index }, ref) => {
    const { LANDING_START, END } = ANIMATION_STAGES.stages;

    const imageOpacity = useTransform(
        animationProgress,
        [LANDING_START, (LANDING_START + END) / 2],
        [0, 1]
    );

    const landingScale = useTransform(
        animationProgress,
        [LANDING_START, (LANDING_START + END) / 2, END],
        [1, 1.1, 1]
    );
    const landingRotate = useTransform(
        animationProgress,
        [LANDING_START, LANDING_START + 0.02, LANDING_START + 0.04, LANDING_START + 0.06, LANDING_START + 0.08, END],
        [0, -15, 15, -10, 10, 0]
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.5,
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="group relative rounded-2xl sm:rounded-3xl p-3 sm:p-6 flex flex-col items-center text-center bg-white/60 backdrop-blur-md border border-slate-200/60 shadow-lg h-full overflow-hidden"
        >
            <div className={`absolute -inset-4 bg-gradient-to-r ${iceCream.color} rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
            
            <div className="relative z-10 w-full h-full flex flex-col items-center">
                <div className="relative w-24 h-36 sm:w-32 sm:h-48 mb-2 sm:mb-4">
                    <div ref={ref} className="absolute inset-0"></div>
                    <motion.img
                        src={iceCream.ice}
                        alt={iceCream.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                        style={{
                            opacity: isTarget ? imageOpacity : 1,
                            scale: isTarget ? landingScale : 1,
                            rotate: isTarget ? landingRotate : 0,
                        }}
                    />
                </div>
                <div className="flex-grow flex flex-col justify-between w-full">
                    <div>
                        <h3 className="text-lg sm:text-2xl font-bold text-slate-800">{iceCream.name}</h3>
                        <p className="text-slate-500 mt-1 sm:mt-2 text-xs sm:text-sm">{iceCream.description}</p>
                    </div>
                    <div className="mt-2 sm:mt-4 w-full">
                        <span className={`text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${iceCream.color}`}>{iceCream.price}</span>
                        <button className={`w-full mt-2 sm:mt-4 bg-gradient-to-r ${iceCream.color} text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-md hover:scale-105 active:scale-100 transition-transform duration-300 text-sm sm:text-base`}>
                            افزودن به سبد
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});