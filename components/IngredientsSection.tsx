
import React from 'react';
import { motion, MotionValue, useTransform, Variants } from 'framer-motion';
import { ANIMATION_STAGES } from '../constants';

const CocoaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.021,2.021a10,10,0,0,0-9.2,14.616,1,1,0,0,0,1.385.215,10.1,10.1,0,0,0,4.41-3.6,1,1,0,0,0-.2-1.4,4.062,4.062,0,0,1-2.221-5.111,4.024,4.024,0,0,1,5.08-2.235,1,1,0,0,0,1.4-.216A9.914,9.914,0,0,0,12.021,2.021ZM17.3,7.965a4,4,0,0,1-2.206,5.1,1,1,0,0,0-.2,1.4,10.046,10.046,0,0,0,4.421,3.585,1,1,0,0,0,1.384-.216,10,10,0,0,0-3.4-9.864Z"/>
    </svg>
);
const SugarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21,12l-9,9L3,12l3.3-3.3L3,5.4l3.3,3.3L9.6,3,12,5.4,14.4,3l3.3,5.7,3.3-3.3L17.7,8.7Z"/>
    </svg>
);
const WaterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2a10,10,0,0,0-7.8,16.2,1,1,0,0,0,1.6-.8A6.91,6.91,0,0,1,12,4a6.9,6.9,0,0,1,7.2,6,1,1,0,0,0,2,0A8.9,8.9,0,0,0,12,2Z"/>
    </svg>
);


const ingredients = [
    { name: 'کاکائوی خالص', description: 'دانه‌های کاکائوی دست‌چین شده از بهترین مزارع دنیا.', icon: <CocoaIcon /> },
    { name: 'شکر طبیعی', description: 'شیرینی ملایم و طبیعی، بدون هیچ افزودنی مصنوعی.', icon: <SugarIcon /> },
    { name: 'آب معدنی', description: 'آب پاک و گوارا از چشمه‌های کوهستانی.', icon: <WaterIcon /> },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            ease: 'easeOut'
        }
    })
}

export const IngredientsSection = ({ animationProgress }: { animationProgress: MotionValue<number> }) => {
    const { stages } = ANIMATION_STAGES;
    const contentOpacity = useTransform(
        animationProgress,
        [stages.TRANSITION_EXIT, stages.INGREDIENTS_ENTER, stages.INGREDIENTS_EXIT - 0.05, stages.INGREDIENTS_EXIT],
        [0, 1, 1, 0]
    );

    return (
        <section className="full-section w-screen relative z-25 bg-slate-50 text-slate-800 flex flex-col items-center justify-center overflow-hidden p-8">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-blue-300/20 rounded-full blur-[120px] top-1/4 left-1/4 animate-pulse"></div>
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-green-300/20 rounded-full blur-[120px] bottom-1/4 right-1/4 animate-pulse animation-delay-2000"></div>
            
            <motion.div 
                style={{ opacity: contentOpacity }} 
                className="z-10 container mx-auto w-full"
            >
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="text-left md:text-right mr-auto md:mr-0 md:ml-auto max-w-sm sm:max-w-md md:max-w-lg md:self-end">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 drop-shadow-lg">
                            ساخته شده از بهترین‌ها
                        </h2>
                        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 leading-relaxed">
                            کیفیت اتفاقی نیست، یک انتخاب است. ما به شفافیت در مواد اولیه خود افتخار می‌کنیم.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:gap-8 md:self-start">
                        {ingredients.map((item, index) => (
                            <motion.div 
                                key={index}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.8 }}
                                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg flex flex-col sm:flex-row items-center text-center sm:text-right"
                            >
                                <div className="flex-shrink-0 p-4 bg-blue-500/10 rounded-full mb-4 sm:mb-0 sm:ml-6">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{item.name}</h3>
                                    <p className="text-slate-500 mt-2 text-sm sm:text-base">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
