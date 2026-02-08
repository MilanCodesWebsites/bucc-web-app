'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/loading-screen';
import { OnboardingCarousel } from '@/components/onboarding-carousel';
import { OnboardingQuestions } from '@/components/onboarding-questions';

export default function Home() {
  const router = useRouter();
  const [stage, setStage] = useState<'loading' | 'carousel' | 'questions'>('loading');

  useEffect(() => {
    // Check local storage on mount - if already completed, redirect to dashboard
    const isComplete = localStorage.getItem('onboarding_complete');
    if (isComplete) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleLoadingComplete = () => {
    if (localStorage.getItem('onboarding_complete')) {
      router.replace('/dashboard');
    } else {
      setStage('carousel');
    }
  };

  const handleOnboardingComplete = () => {
    setStage('questions');
  };

  const handleQuestionsComplete = () => {
    // Redirect directly to dashboard
    router.replace('/dashboard');
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

  return null;
}
