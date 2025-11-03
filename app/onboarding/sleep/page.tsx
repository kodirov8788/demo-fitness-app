'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { getDbInstance } from '@/lib/firebase';

function ensureFirebase() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase should only be used on the client side.');
  }
  const dbInstance = getDbInstance();
  if (!dbInstance) {
    throw new Error('Firebase is not initialized.');
  }
  return { db: dbInstance };
}

export default function OnboardingSleepPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { db: dbInstance } = ensureFirebase();
      const userRef = doc(dbInstance, 'users', user.uid);

      await updateDoc(userRef, {
        'assessments.sleep': {
          completed: true,
          updatedAt: Timestamp.now(),
        },
        onboardingCompleted: true,
      });

      router.push('/home');
    } catch (err: any) {
      console.error('Error saving sleep:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sleep Assessment</CardTitle>
          <CardDescription className="text-center">Step 9 of 9 - Final Step</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">This step will be implemented in detail later.</p>
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={() => router.back()} disabled={loading}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : 'Complete Onboarding'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
