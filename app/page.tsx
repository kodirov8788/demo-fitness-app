'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile } from '@/services/firebase/auth';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      getUserProfile(user.uid)
        .then((profile: User | null) => {
          if (profile) {
            if (!profile.onboardingCompleted) {
              router.push('/onboarding');
            } else {
              router.push('/home');
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          // If error, just stay on landing page
        });
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold">Welcome to HabiMate</h1>
        <p className="text-xl text-muted-foreground">
          Your AI-powered personal health companion
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}