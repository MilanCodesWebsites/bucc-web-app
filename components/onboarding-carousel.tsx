'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'The Ultimate Plug',
    description: 'Everything BUCC in one place. Announcements, events, resources - we got you.',
    imageUrl: '/placeholder.svg?height=800&width=600',
  },
  {
    id: 2,
    title: 'Never miss the vibe',
    description: 'Stay in the loop with events, deadlines, and what\'s happening. Zero FOMO guaranteed.',
    imageUrl: '/placeholder.svg?height=800&width=600',
  },
  {
    id: 3,
    title: 'Level up your game',
    description: 'Past questions, notes, slides - all the academic sauce you need to ace it.',
    imageUrl: '/placeholder.svg?height=800&width=600',
  },
];

export function OnboardingCarousel({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const goToPrevious = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100) {
      goToNext();
    } else if (info.offset.x > 100 && currentSlide > 0) {
      goToPrevious();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-screen w-full bg-white flex flex-col relative overflow-hidden">

      {/* skip button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={handleSkip}
          className="text-gray-500 font-medium hover:text-blue-600 transition-colors bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm"
        >
          Skip
        </button>
      </div>

      {/* image section (top 60%) */}
      <div className="h-[60%] relative bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <img
              src={slide.imageUrl || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* gradient overlay for smooth transition to content */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </div>

      {/* content section (bottom 40%) */}
      <div className="h-[40%] bg-white rounded-t-[2rem] -mt-6 z-10 flex flex-col px-6 relative shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">

        {/* Text Content */}
        <div className="text-center pt-6 flex-1 flex flex-col justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-black mb-2 text-balance leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm text-gray-500 text-balance leading-relaxed">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Area */}
        <div className="pb-4 mt-auto flex flex-col gap-3">

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentSlide ? "w-8 bg-blue-600" : "w-2 bg-gray-200"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button - Full Width (No Back Button) */}
          <div className="flex w-full">
            <Button
              onClick={goToNext}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full shadow-lg shadow-blue-600/20"
            >
              {currentSlide === slides.length - 1 ? (
                'Get Started'
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Next <ChevronRightIcon className="size-5" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
