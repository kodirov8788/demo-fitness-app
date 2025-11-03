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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gender } from '@/types/user';
import { useOnboarding } from '@/contexts/OnboardingContext';


interface ProfileFormData {
  name: string;
  gender: Gender;
  dateOfBirth: string;
  mbti?: string;
}

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

export default function OnboardingProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, updateStepData, loading: contextLoading } = useOnboarding();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: data.profile?.name || '',
      gender: (data.profile?.gender as Gender | undefined) || undefined,
      dateOfBirth: data.profile?.dateOfBirth 
        ? new Date(data.profile.dateOfBirth).toISOString().split('T')[0]
        : '',
      mbti: data.profile?.mbti || undefined,
    },
  });

  const gender = watch('gender');
  const mbti = watch('mbti');

  const onSubmit = async (formData: ProfileFormData) => {
    if (!user) {
      setError('Authentication error. Please try again.');
      return;
    }

    if (!formData.gender) {
      setError('Please select your gender');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const dateOfBirth = new Date(formData.dateOfBirth);
      
      // Use OnboardingContext to save data (as per documentation)
      await updateStepData('profile', {
        name: formData.name.trim(),
        gender: formData.gender,
        dateOfBirth: dateOfBirth,
        mbti: formData.mbti && formData.mbti !== 'skip' ? formData.mbti : null,
      });

      // Navigate to next step
      router.push('/onboarding/physical-info');
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Let's get to know you
          </CardTitle>
          <CardDescription className="text-center">
            Step 1 of 9 - Basic Profile Information
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
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name or nickname"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Gender *</Label>
              <RadioGroup
                value={gender}
                onValueChange={(value) => setValue('gender', value as Gender)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">
                    Female
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                  <Label htmlFor="prefer-not-to-say" className="cursor-pointer">
                    Prefer not to say
                  </Label>
                </div>
              </RadioGroup>
              {errors.gender && (
                <p className="text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...register('dateOfBirth', {
                  required: 'Date of birth is required',
                  validate: (value) => {
                    const date = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - date.getFullYear();
                    if (age < 13) {
                      return 'You must be at least 13 years old';
                    }
                    if (age > 120) {
                      return 'Please enter a valid date of birth';
                    }
                    return true;
                  },
                })}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mbti">MBTI Type (Optional)</Label>
              <Select
                value={mbti || undefined}
                onValueChange={(value) => {
                  if (value === 'skip') {
                    setValue('mbti', undefined);
                  } else {
                    setValue('mbti', value);
                  }
                }}
              >
                <SelectTrigger id="mbti">
                  <SelectValue placeholder="Select your MBTI type (or skip)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skip">Skip</SelectItem>
                  {MBTI_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Don't know your MBTI type? You can skip this.
              </p>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="submit"
                disabled={loading || !gender}
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
