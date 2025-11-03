'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile } from '@/services/firebase/auth';
import { User } from '@/types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export function ProtectedRoute({ children, requireOnboarding = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }

      // Check onboarding status if required
      if (requireOnboarding) {
        getUserProfile(user.uid)
          .then((profile: User | null) => {
            if (profile && !profile.onboardingCompleted) {
              // User is authenticated but onboarding incomplete
              // Allow access (they'll be redirected from onboarding pages)
              return;
            }
            if (profile && profile.onboardingCompleted) {
              // Onboarding complete, redirect to home
              router.push('/home');
            }
          })
          .catch((error) => {
            console.error('Error fetching user profile:', error);
            // Allow access even if profile fetch fails
          });
      }
    }
  }, [user, loading, router, requireOnboarding]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
