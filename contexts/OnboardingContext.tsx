'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { getDbInstance } from '@/lib/firebase';
import { User } from '@/types/user';

interface OnboardingData {
  profile?: {
    name?: string;
    gender?: string;
    dateOfBirth?: Date;
    mbti?: string;
  };
  physicalInfo?: {
    height?: number;
    weight?: number;
    bodyFatPercentage?: number;
    muscleMass?: number;
    waistCircumference?: number;
  };
  goal?: {
    targetWeight?: number;
    purpose?: string;
    targetTimeline?: number;
  };
  lifestyleValues?: any;
  motivation?: any;
  exercise?: any;
  dietary?: any;
  mentalHealth?: any;
  sleep?: any;
}

interface OnboardingContextType {
  data: OnboardingData;
  currentStep: number;
  loading: boolean;
  updateStepData: (step: string, data: any) => Promise<void>;
  nextStep: () => void;
  previousStep: () => void;
  loadData: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

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

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<OnboardingData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load existing onboarding data from Firestore
  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    try {
      const dbInstance = getDbInstance();
      if (!dbInstance) {
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(dbInstance, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Convert Firestore timestamps to dates
        const dateOfBirth = userData.dateOfBirth?.toDate 
          ? userData.dateOfBirth.toDate() 
          : userData.dateOfBirth;

        setData({
          profile: {
            name: userData.name,
            gender: userData.gender,
            dateOfBirth,
            mbti: userData.mbti,
          },
          physicalInfo: userData.physicalInfo,
          goal: userData.goal,
          lifestyleValues: userData.lifestyleValues,
          motivation: userData.assessments?.motivation,
          exercise: userData.assessments?.exercise,
          dietary: userData.assessments?.dietary,
          mentalHealth: userData.assessments?.mentalHealth,
          sleep: userData.assessments?.sleep,
        });
      }
    } catch (error) {
      console.error('Error loading onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStepData = async (step: string, stepData: any) => {
    if (!user) return;

    try {
      const dbInstance = getDbInstance();
      if (!dbInstance) {
        throw new Error('Firebase is not initialized');
      }

      const userRef = doc(dbInstance, 'users', user.uid);
      const updateData: any = {
        updatedAt: Timestamp.now(),
      };

      // Map step names to Firestore paths
      if (step === 'profile') {
        updateData.name = stepData.name;
        updateData.gender = stepData.gender;
        if (stepData.dateOfBirth) {
          const { Timestamp } = await import('firebase/firestore');
          updateData.dateOfBirth = stepData.dateOfBirth instanceof Date
            ? Timestamp.fromDate(stepData.dateOfBirth)
            : stepData.dateOfBirth;
        }
        updateData.mbti = stepData.mbti || null;
      } else if (step === 'physical-info') {
        updateData.physicalInfo = stepData;
      } else if (step === 'goals') {
        updateData.goal = stepData;
      } else if (step === 'lifestyle-values') {
        updateData.lifestyleValues = stepData;
      } else if (['motivation', 'exercise', 'dietary', 'mental-health', 'sleep'].includes(step)) {
        const assessmentKey = step === 'mental-health' ? 'mentalHealth' : step;
        updateData[`assessments.${assessmentKey}`] = stepData;
      }

      await updateDoc(userRef, updateData);
      
      // Update local state
      setData((prev) => ({
        ...prev,
        [step === 'physical-info' ? 'physicalInfo' : step === 'goals' ? 'goal' : step]: stepData,
      }));
    } catch (error) {
      console.error('Error updating step data:', error);
      throw error;
    }
  };

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        currentStep,
        loading,
        updateStepData,
        nextStep,
        previousStep,
        loadData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
