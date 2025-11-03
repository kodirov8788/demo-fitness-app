export type Gender = 'male' | 'female' | 'prefer-not-to-say';

export interface User {
  uid: string;
  email: string;
  name: string;
  gender?: Gender;
  dateOfBirth?: Date;
  mbti?: string;
  createdAt: Date;
  updatedAt: Date;
  onboardingCompleted: boolean;
}

export interface UserProfile {
  name: string;
  gender: Gender;
  dateOfBirth: Date;
  mbti?: string;
}
