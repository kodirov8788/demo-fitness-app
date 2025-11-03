'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface GoalsFormData {
  targetWeight: number;
  purpose: 'diet' | 'muscle-gain' | 'maintenance';
  targetTimeline: number;
}


export default function OnboardingGoalsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, updateStepData } = useOnboarding();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GoalsFormData>({
    defaultValues: {
      targetWeight: data.goal?.targetWeight || undefined,
      purpose: data.goal?.purpose as GoalsFormData['purpose'] || undefined,
      targetTimeline: data.goal?.targetTimeline || 6,
    },
  });

  const targetWeight = watch('targetWeight');
  const purpose = watch('purpose');
  const timeline = watch('targetTimeline');

  const onSubmit = async (formData: GoalsFormData) => {
    if (!user) {
      setError('Authentication error. Please try again.');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      // Use OnboardingContext to save data (as per documentation)
      await updateStepData('goals', {
        targetWeight: formData.targetWeight,
        purpose: formData.purpose,
        targetTimeline: formData.targetTimeline,
      });

      router.push('/onboarding/lifestyle-values');
    } catch (err: any) {
      console.error('Error saving goals:', err);
      setError(err.message || 'Failed to save goals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Your Goals
          </CardTitle>
          <CardDescription className="text-center">
            Step 3 of 9 - Define Your Health Goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="targetWeight">Target Weight (kg) *</Label>
              <Input
                id="targetWeight"
                type="number"
                placeholder="65"
                step="0.1"
                {...register('targetWeight', {
                  required: 'Target weight is required',
                  min: { value: 30, message: 'Target weight must be at least 30 kg' },
                  max: { value: 300, message: 'Target weight must be at most 300 kg' },
                  valueAsNumber: true,
                })}
              />
              {errors.targetWeight && (
                <p className="text-sm text-red-600">{errors.targetWeight.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Primary Goal *</Label>
              <RadioGroup
                value={purpose}
                onValueChange={(value) => setValue('purpose', value as GoalsFormData['purpose'])}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="diet" id="diet" />
                  <Label htmlFor="diet" className="cursor-pointer">
                    Weight Loss / Diet
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                  <Label htmlFor="muscle-gain" className="cursor-pointer">
                    Muscle Gain
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintenance" id="maintenance" />
                  <Label htmlFor="maintenance" className="cursor-pointer">
                    Health Maintenance
                  </Label>
                </div>
              </RadioGroup>
              {errors.purpose && (
                <p className="text-sm text-red-600">{errors.purpose.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label>Target Timeline: {timeline} months *</Label>
              <Slider
                value={[timeline || 6]}
                onValueChange={(value) => setValue('targetTimeline', value[0])}
                min={1}
                max={12}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 month</span>
                <span>12 months</span>
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
                disabled={loading || !purpose || !targetWeight}
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
