'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { usePathname } from 'next/navigation';

const ONBOARDING_STEPS = [
  'profile',
  'physical-info',
  'goals',
  'lifestyle-values',
  'motivation',
  'exercise',
  'dietary',
  'mental-health',
  'sleep',
];

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Determine current step from pathname
  const currentStepName = pathname.split('/').pop() || 'profile';
  const currentStep = ONBOARDING_STEPS.indexOf(currentStepName);
  const stepNumber = currentStep >= 0 ? currentStep : 0;

  return (
    <ProtectedRoute requireOnboarding={true}>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto py-6 px-4">
          <ProgressBar currentStep={stepNumber} totalSteps={ONBOARDING_STEPS.length} />
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
