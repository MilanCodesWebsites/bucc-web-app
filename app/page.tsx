'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/loading-screen';
import { OnboardingCarousel } from '@/components/onboarding-carousel';
import { OnboardingQuestions } from '@/components/onboarding-questions';

export default function Home() {
  const router = useRouter();
  const [stage, setStage] = useState<'loading' | 'carousel' | 'questions' | 'complete'>('loading');

  useEffect(() => {
    // Check local storage on mount
    const isComplete = localStorage.getItem('onboarding_complete');
    if (isComplete) {
      // For now, let's just let it load normally but maybe we skip the carousel?
      // The user request said "Skip onboarding option should mark user as onboarded".
      // It implies subsequent visits should skip.
      setStage('complete');
    }
  }, []);

  const handleLoadingComplete = () => {
    // If we've already checked LS and set to complete, this might clash if loading is fast.
    // Better to check LS inside this handler or just let the effect override.
    // Given the effect runs once, if it sets 'complete', 'loading' screen might just unmount.
    // Let's rely on standard flow if not complete.
    if (localStorage.getItem('onboarding_complete')) {
      setStage('complete');
    } else {
      setStage('onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    setStage('questions');
  };

  const handleQuestionsComplete = () => {
    setStage('complete');
    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      setStage('carousel');
    }, 2000);
  };

  if (stage === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (stage === 'carousel') {
    return <OnboardingCarousel onComplete={handleOnboardingComplete} />;
  }

  if (stage === 'questions') {
    return <OnboardingQuestions onComplete={handleQuestionsComplete} />;
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-black">Welcome!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your onboarding is complete. Welcome to your adventure!
        </p>
        <button
          onClick={() => {
            localStorage.removeItem('onboarding_complete');
            setStage('loading');
          }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
        >
          Restart Demo
        </button>
      </div>
    </main>
  );
}
