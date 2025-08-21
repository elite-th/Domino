
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, useTransform, MotionValue, useSpring } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { TransitionSection } from './components/TransitionSection';
import { IngredientsSection } from './components/IngredientsSection';
import { ProductsSection } from './components/ProductsSection';
import { ICE_CREAMS, TARGET_ICE_CREAM_ID, ANIMATION_STAGES } from './constants';
import { IceCream } from './types';
import { PageIndicator } from './PageIndicator';

interface Coords {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AnimationPositions {
  start: Coords;
  end: Coords;
}

const AnimatedIceCream = ({ animationProgress, positions, isMobile }: { animationProgress: MotionValue<number>; positions: AnimationPositions | null, isMobile: boolean }) => {
  const targetIceCream = ICE_CREAMS.find(ic => ic.id === TARGET_ICE_CREAM_ID);
  if (!targetIceCream || !positions) return null;

  const { start, end } = positions;
  const { stages } = ANIMATION_STAGES;
  
  const peakScale = isMobile ? 1.2 : 1.4;

  const midX = (window.innerWidth / 2) - ((start.width * peakScale) / 2);
  const midY = isMobile 
    ? (window.innerHeight / 3) - ((start.height * peakScale) / 2) 
    : (window.innerHeight / 2) - ((start.height * peakScale) / 2);
  
  // Custom values for the Ingredients section animation, adjusted as per user request
  const ingredientsPeakScale = isMobile ? 0.5 : 0.6; // Slightly larger on mobile
  const ingredientsMidX = isMobile 
    ? window.innerWidth - (start.width * ingredientsPeakScale) - 16 // Top-right corner
    : (window.innerWidth * 0.9) - ((start.width * ingredientsPeakScale) / 2); // Further to the right
  const ingredientsMidY = isMobile
    ? -80 // Considerably higher up
    : (window.innerHeight / 5) - ((start.height * ingredientsPeakScale) / 2); // Even higher on desktop

  const restingX = isMobile ? 16 : 40;
  const restingY = isMobile ? 100 : 120;
  const restingScale = isMobile ? 0.3 : 0.25;

  const finalScale = end.width / start.width;

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };

  const xTarget = useTransform(
    animationProgress,
    [stages.START, stages.HERO_EXIT_END, stages.TRANSITION_ENTER, stages.TRANSITION_MID, stages.TRANSITION_EXIT, stages.INGREDIENTS_ENTER, stages.INGREDIENTS_MID, stages.INGREDIENTS_EXIT, stages.LANDING_START, stages.END],
    [start.x,     restingX,             restingX,             midX,               restingX,             restingX,             ingredientsMidX,    restingX,             end.x,            end.x]
  );
  
  const yTarget = useTransform(
    animationProgress,
    [stages.START, stages.HERO_EXIT_END, stages.TRANSITION_ENTER, stages.TRANSITION_MID, stages.TRANSITION_EXIT, stages.INGREDIENTS_ENTER, stages.INGREDIENTS_MID, stages.INGREDIENTS_EXIT, stages.LANDING_START, stages.END],
    [start.y,     restingY,             restingY,             midY,               restingY,             restingY,             ingredientsMidY,    restingY,             end.y,            end.y]
  );
  
  const scaleTarget = useTransform(
    animationProgress,
    [stages.START, stages.HERO_EXIT_START, stages.HERO_EXIT_END, stages.TRANSITION_MID, stages.TRANSITION_EXIT, stages.INGREDIENTS_MID, stages.INGREDIENTS_EXIT, stages.LANDING_START, stages.END],
    [1,           1.1,                  restingScale,        peakScale,            restingScale,        ingredientsPeakScale, restingScale,         finalScale,       finalScale]
  );
  
  const rotateTarget = useTransform(
    animationProgress,
    [stages.START, stages.HERO_EXIT_START, stages.HERO_EXIT_END, stages.TRANSITION_MID, stages.TRANSITION_EXIT, stages.INGREDIENTS_MID, stages.INGREDIENTS_EXIT, stages.LANDING_START, stages.END],
    [-25,         -30,                  0,                    -15,                  0,                    15,                   0,                     0,                0]
  );

  const x = useSpring(xTarget, springConfig);
  const y = useSpring(yTarget, springConfig);
  const scale = useSpring(scaleTarget, springConfig);
  const rotate = useSpring(rotateTarget, springConfig);

  const opacity = useTransform(
    animationProgress,
    [stages.START, stages.HERO_EXIT_START, stages.LANDING_START, stages.END],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        scale,
        rotate,
        opacity,
        zIndex: 50,
        width: start.width,
        height: start.height,
        originX: '50%',
        originY: '50%',
      }}
    >
      <img src={targetIceCream.ice} alt={targetIceCream.name} className="w-full h-full object-contain drop-shadow-2xl" />
    </motion.div>
  );
};


export default function App() {
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const [positions, setPositions] = useState<AnimationPositions | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWheeling, setIsWheeling] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const containerY = useSpring(0, { stiffness: 100, damping: 30 });
  // The animation journey completes when the products section (index 3) is in view.
  const animationProgress = useTransform(containerY, [0, -3 * window.innerHeight], [0, 1]);

  const animatedIceCream = ICE_CREAMS.find(ic => ic.id === TARGET_ICE_CREAM_ID) as IceCream;

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setVh);
    setVh();
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changeSection = (newIndex: number) => {
    if (newIndex < 0 || newIndex > 3 || newIndex === activeIndex || isWheeling) {
      return;
    }
    setActiveIndex(newIndex);
    setIsWheeling(true);
    setTimeout(() => setIsWheeling(false), 1000); // Cooldown
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      let newIndex = activeIndex;
      if (e.deltaY > 5) {
        newIndex++;
      } else if (e.deltaY < -5) {
        newIndex--;
      }
      changeSection(newIndex);
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, isWheeling]);

  useEffect(() => {
    containerY.set(-activeIndex * window.innerHeight);
  }, [activeIndex, containerY]);

  useLayoutEffect(() => {
    const calculatePositions = () => {
      if (startRef.current && endRef.current) {
        const startRect = startRef.current.getBoundingClientRect();
        const endRect = endRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        
        setPositions({
          start: {
            x: startRect.left,
            y: startRect.top,
            width: startRect.width,
            height: startRect.height,
          },
          end: {
            x: endRect.left,
            y: endRect.top - (3 * vh), // endRef is on the 4th section (index 3), so offset by 3 screens
            width: endRect.width,
            height: endRect.height,
          },
        });
      }
    };

    const timeoutId = setTimeout(calculatePositions, 100);
    window.addEventListener('resize', calculatePositions);
    
    return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', calculatePositions);
    }
  }, []);

  return (
    <div className="bg-slate-50 text-gray-800 h-screen w-screen overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <motion.div 
                className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 md:w-1/3 md:h-1/3 bg-blue-400/10 rounded-full blur-3xl filter"
                animate={{ 
                    x: [0, 100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 md:w-1/3 md:h-1/3 bg-cyan-300/10 rounded-full blur-3xl filter"
                animate={{ 
                    x: [0, -100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
        </div>

      <AnimatedIceCream animationProgress={animationProgress} positions={positions} isMobile={isMobile} />
      <PageIndicator activeIndex={activeIndex} setActiveIndex={changeSection} isWheeling={isWheeling} />
      
      <motion.main style={{ y: containerY }} className="relative z-10 h-full">
        <HeroSection ref={startRef} iceCream={animatedIceCream} animationProgress={animationProgress} />
        <TransitionSection animationProgress={animationProgress} />
        <IngredientsSection animationProgress={animationProgress} />
        <ProductsSection ref={endRef} animatedIceCreamId={TARGET_ICE_CREAM_ID} animationProgress={animationProgress} />
      </motion.main>
      
      <footer className="fixed bottom-0 left-0 right-0 text-center py-4 bg-transparent text-gray-500 z-50 pointer-events-none text-sm">
        <p>ساخته شده با عشق برای دوست‌داران بستنی</p>
      </footer>
    </div>
  );
}
