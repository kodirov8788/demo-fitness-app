'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface PhysicalInfoFormData {
  height: number;
  weight: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  waistCircumference?: number;
}


export default function OnboardingPhysicalInfoPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, updateStepData } = useOnboarding();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bmi, setBmi] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PhysicalInfoFormData>({
    defaultValues: {
      height: data.physicalInfo?.height || undefined,
      weight: data.physicalInfo?.weight || undefined,
      bodyFatPercentage: data.physicalInfo?.bodyFatPercentage || undefined,
      muscleMass: data.physicalInfo?.muscleMass || undefined,
      waistCircumference: data.physicalInfo?.waistCircumference || undefined,
    },
  });

  const height = watch('height');
  const weight = watch('weight');

  // Calculate BMI in real-time
  useEffect(() => {
    if (height && weight && height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = weight / (heightInMeters * heightInMeters);
      setBmi(Number(calculatedBmi.toFixed(1)));
    } else {
      setBmi(null);
    }
  }, [height, weight]);

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const onSubmit = async (formData: PhysicalInfoFormData) => {
    if (!user) {
      setError('Authentication error. Please try again.');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const physicalInfoData: any = {
        height: formData.height,
        weight: formData.weight,
      };

      if (formData.bodyFatPercentage) {
        physicalInfoData.bodyFatPercentage = formData.bodyFatPercentage;
      }
      if (formData.muscleMass) {
        physicalInfoData.muscleMass = formData.muscleMass;
      }
      if (formData.waistCircumference) {
        physicalInfoData.waistCircumference = formData.waistCircumference;
      }

      // Use OnboardingContext to save data (as per documentation)
      await updateStepData('physical-info', physicalInfoData);

      router.push('/onboarding/goals');
    } catch (err: any) {
      console.error('Error saving physical info:', err);
      setError(err.message || 'Failed to save physical information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Physical Information
          </CardTitle>
          <CardDescription className="text-center">
            Step 2 of 9 - Your Physical Measurements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  {...register('height', {
                    required: 'Height is required',
                    min: { value: 100, message: 'Height must be at least 100 cm' },
                    max: { value: 250, message: 'Height must be at most 250 cm' },
                    valueAsNumber: true,
                  })}
                />
                {errors.height && (
                  <p className="text-sm text-red-600">{errors.height.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  step="0.1"
                  {...register('weight', {
                    required: 'Weight is required',
                    min: { value: 30, message: 'Weight must be at least 30 kg' },
                    max: { value: 300, message: 'Weight must be at most 300 kg' },
                    valueAsNumber: true,
                  })}
                />
                {errors.weight && (
                  <p className="text-sm text-red-600">{errors.weight.message}</p>
                )}
              </div>
            </div>

            {bmi && (
              <div className="p-4 bg-muted rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">BMI:</span>
                  <span className="text-lg font-bold">{bmi}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Category: {getBmiCategory(bmi)}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Optional Information</h3>

              <div className="space-y-2">
                <Label htmlFor="bodyFatPercentage">Body Fat Percentage (%)</Label>
                <Input
                  id="bodyFatPercentage"
                  type="number"
                  placeholder="Optional"
                  step="0.1"
                  {...register('bodyFatPercentage', {
                    min: { value: 5, message: 'Must be at least 5%' },
                    max: { value: 50, message: 'Must be at most 50%' },
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="muscleMass">Muscle Mass (kg)</Label>
                <Input
                  id="muscleMass"
                  type="number"
                  placeholder="Optional"
                  step="0.1"
                  {...register('muscleMass', {
                    min: { value: 0, message: 'Must be positive' },
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waistCircumference">Waist Circumference (cm)</Label>
                <Input
                  id="waistCircumference"
                  type="number"
                  placeholder="Optional"
                  step="0.1"
                  {...register('waistCircumference', {
                    min: { value: 0, message: 'Must be positive' },
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? 'Saving...' : 'Next Step'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
