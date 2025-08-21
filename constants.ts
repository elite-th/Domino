import { IceCream } from './types';

const strawberry_svg = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTIwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJNMTAsMTUwIFY1MCBDMTAsMjIuMzggMzIuMzgsMTAgNjAsMTAgQzg3LjYyLDEwIDExMCwyMi4zOCAxMTAsNTAgVjE1MCBIMTBaIiBmaWxsPSIjZWY0NDQ0Ii8+PHJlY3QgeD0iNDUiIHk9IjE1MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjYwIiByeD0iNSIgZmlsbD0iI0QyQjA4QyIvPjwvZz48L3N2Zz4=';
const orange_svg = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTIwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJNMTAsMTUwIFY1MCBDMTAsMjIuMzggMzIuMzgsMTAgNjAsMTAgQzg3LjYyLDEwIDExMCwyMi4zOCAxMTAsNTAgVjE1MCBIMTBaIiBmaWxsPSIjZjk3MzE2Ii8+PHJlY3QgeD0iNDUiIHk9IjE1MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjYwIiByeD0iNSIgZmlsbD0iI0QyQjA4QyIvPjwvZz48L3N2Zz4=';
const lime_svg = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTIwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJNMTAsMTUwIFY1MCBDMTAsMjIuMzggMzIuMzgsMTAgNjAsMTAgQzg3LjYyLDEwIDExMCwyMi4zOCAxMTAsNTAgVjE1MCBIMTBaIiBmaWxsPSIjODRjYzE2Ii8+PHJlY3QgeD0iNDUiIHk9IjE1MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjYwIiByeD0iNSIgZmlsbD0iI0QyQjA4QyIvPjwvZz48L3N2Zz4=';
const blackberry_svg = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTIwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJNMTAsMTUwIFY1MCBDMTAsMjIuMzggMzIuMzgsMTAgNjAsMTAgQzg3LjYyLDEwIDExMCwyMi4zOCAxMTAsNTAgVjE1MCBIMTBaIiBmaWxsPSIjN2MzYWVkIi8+PHJlY3QgeD0iNDUiIHk9IjE1MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjYwIiByeD0iNSIgZmlsbD0iI0QyQjA4QyIvPjwvZz48L3N2Zz4=';
const chocolate_svg = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTIwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48cGF0aCBkPSJNMTAsMTUwIFY1MCBDMTAsMjIuMzggMzIuMzgsMTAgNjAsMTAgQzg3LjYyLDEwIDExMCwyMi4zOCAxMTAsNTAgVjE1MCBIMTBaIiBmaWxsPSIjOTI0MDBlIi8+PHJlY3QgeD0iNDUiIHk9IjE1MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjYwIiByeD0iNSIgZmlsbD0iI0QyQjA4QyIvPjwvZz48L3N2Zz4=';

export const ICE_CREAMS: IceCream[] = [
  {
    id: 5,
    name: 'یخی شکلاتی',
    description: 'طعم غنی و کلاسیک شکلات، خامه‌ای و بی‌نظیر.',
    color: 'from-amber-800 to-yellow-900',
    ice: chocolate_svg,
    price: '۱۸,۰۰۰ تومان',
  },
  {
    id: 1,
    name: 'یخی توت فرنگی',
    description: 'ترکیبی دلنشین از توت‌فرنگی‌های تازه و آبدار.',
    color: 'from-red-500 to-pink-500',
    ice: strawberry_svg,
    price: '۱۵,۰۰۰ تومان',
  },
  {
    id: 2,
    name: 'یخی پرتقالی',
    description: 'طعم کلاسیک و پرانرژی پرتقال‌های رسیده.',
    color: 'from-orange-500 to-yellow-500',
    ice: orange_svg,
    price: '۱۵,۰۰۰ تومان',
  },
  {
    id: 3,
    name: 'یخی لیمویی',
    description: 'خنکی و ترشی بی‌نظیر لیمو برای روزهای گرم تابستان.',
    color: 'from-lime-500 to-green-500',
    ice: lime_svg,
    price: '۱۵,۰۰۰ تومان',
  },
  {
    id: 4,
    name: 'یخی شاتوتی',
    description: 'طعم غنی و ملس شاه‌توت‌های وحشی.',
    color: 'from-purple-600 to-indigo-600',
    ice: blackberry_svg,
    price: '۱۵,۰۰۰ تومان',
  },
];

export const TARGET_ICE_CREAM_ID = 5;

export const ANIMATION_STAGES = {
  stages: {
    // Hero Section (Scroll 0 -> 1)
    START: 0.0,
    HERO_EXIT_START: 0.05,
    HERO_EXIT_END: 0.25,

    // Transition Section (Scroll 1 -> 2)
    TRANSITION_ENTER: 0.30,
    TRANSITION_MID: 0.40,
    TRANSITION_EXIT: 0.50,

    // Ingredients Section (Scroll 2 -> 3)
    INGREDIENTS_ENTER: 0.55,
    INGREDIENTS_MID: 0.65,
    INGREDIENTS_EXIT: 0.75,

    // Products Section - Final Approach (Scroll 3 -> Land)
    LANDING_START: 0.9,
    END: 1.0,
  }
};