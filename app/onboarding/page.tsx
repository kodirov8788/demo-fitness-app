'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to first onboarding step
    router.push('/onboarding/profile');
  }, [router]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </ProtectedRoute>
  );
}
