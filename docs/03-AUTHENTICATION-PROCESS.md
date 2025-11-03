# Web Authentication Process

## 🎯 Purpose

This document guides you through implementing the authentication system for Habi Mate web app. It covers the complete process from Firebase setup to user session management.

## ⏱️ Time Estimate

**1 week**

## 📋 Overview

Authentication allows users to:
- Create accounts (Email/Password + Google Sign In)
- Sign in securely
- Maintain session across browser sessions
- Access personalized features

## 🔐 Step 1: Firebase Auth Setup

### 1.1 Verify Firebase Configuration

**Check**:
- Firebase project created
- Web app added to Firebase
- `.env.local` file has all Firebase config variables
- All variables prefixed with `NEXT_PUBLIC_`

### 1.2 Enable Authentication Providers

**In Firebase Console**:
1. Go to Authentication → Sign-in method
2. Enable **Email/Password**:
   - Toggle to enabled
   - No additional configuration needed
   - Click "Save"

3. Enable **Google**:
   - Toggle to enabled
   - Project support email: Your email
   - Click "Save"

## 📱 Step 2: Create Firebase Config

### 2.1 Initialize Firebase

**File**: `lib/firebase.ts`

**Responsibilities**:
- Initialize Firebase app
- Export auth, firestore, storage instances
- Handle multiple initialization attempts

### 2.2 Config Structure

**Design decisions**:
- Use environment variables
- Check if Firebase already initialized
- Export ready-to-use instances

**Structure needed**:
- `auth` - Firebase Auth instance
- `db` - Firestore instance
- `storage` - Firebase Storage instance

## 🧠 Step 3: Create Auth Context

### 3.1 Context Responsibilities

**AuthContext should handle**:
- Current user state
- Loading state during auth check
- Sign in method (email/password)
- Sign up method (email/password)
- Sign in with Google method
- Sign out method
- Listen to auth state changes

### 3.2 Context Design Decisions

**Decisions to make**:
1. **State Management**:
   - Store user object or just user ID?
   - Recommendation: Store user object for quick access

2. **Loading State**:
   - Separate loading for initial check vs actions?
   - Recommendation: Single loading state, separate for initial check

3. **Error Handling**:
   - Store errors in context or handle per action?
   - Recommendation: Handle per action (simpler)

4. **Auth State Listener**:
   - Use `onAuthStateChanged` in context?
   - Recommendation: Yes - sets up once, updates context

### 3.3 Context Provider Structure

**Provider should**:
1. Set up auth state listener on mount
2. Update context when auth state changes
3. Provide auth methods
4. Clean up listener on unmount

## 🎨 Step 4: Create Auth Pages

### 4.1 Login Page

**Route**: `/login`

**Components needed**:
- Email input field
- Password input field
- Sign In button
- Sign In with Google button
- "Don't have account?" link to signup
- Error message display
- Loading state

**User Flow**:
1. User enters email and password
2. User taps "Sign In" button
3. Page shows loading state
4. AuthContext calls signIn method
5. On success: Navigate to onboarding/home
6. On error: Display error message

**Design Decisions**:
- Client component or server?
- Recommendation: Client component (`'use client'`) for interactivity
- Form validation: Client-side before submit
- Error display: Inline or toast?
- Recommendation: Inline error messages

### 4.2 Sign Up Page

**Route**: `/signup`

**Components needed**:
- Name input field
- Email input field
- Password input field
- Confirm password field
- Sign Up button
- "Already have account?" link to login
- Error message display
- Loading state

**User Flow**:
1. User enters name, email, password, confirm password
2. Page validates password match
3. User taps "Sign Up" button
4. Page shows loading state
5. AuthContext calls signUp method
6. AuthContext creates user profile in Firestore
7. On success: Navigate to onboarding
8. On error: Display error message

**Design Decisions**:
- Minimum password length? (Recommend: 6 characters)
- Show password strength indicator? (Optional for MVP)
- Require password confirmation? (Yes - prevents typos)

## 🔒 Step 5: Protected Routes

### 5.1 ProtectedRoute Component

**Purpose**: Wrap pages that require authentication

**Responsibilities**:
- Check if user is authenticated
- Show loading while checking
- Redirect to login if not authenticated
- Render children if authenticated

**Design Decisions**:
- Client or server component?
- Recommendation: Client component (uses context)
- Redirect method: `useRouter` from Next.js navigation
- Loading UI: Simple spinner or full page?

### 5.2 Usage Pattern

**How to use**:
```typescript
// In layout or page
<ProtectedRoute>
  <YourPageContent />
</ProtectedRoute>
```

**Where to use**:
- All `/onboarding/*` pages
- `/home` page
- Any page requiring authentication

### 5.3 Onboarding Check

**Additional logic**:
- After authentication check, check onboarding status
- If onboarding incomplete: Redirect to onboarding
- If onboarding complete: Allow access

## 📝 Step 6: User Profile Creation

### 6.1 When to Create Profile

**After successful sign up**:
1. Firebase Auth creates user
2. Immediately create user document in Firestore
3. Include basic info from sign up form (name, email)
4. Set default values:
   - `onboardingCompleted: false`
   - `createdAt: timestamp`
   - Other fields filled during onboarding

### 6.2 Profile Data Structure

**Initial profile**:
- uid (from Firebase Auth)
- email
- name (from sign up form)
- createdAt: timestamp
- updatedAt: timestamp
- onboardingCompleted: false

**Storage location**: `users/{userId}` in Firestore

### 6.3 Implementation Steps

**Create user profile**:
1. After successful signUp in AuthContext
2. Get user ID from Firebase Auth result
3. Create Firestore document
4. Use FirestoreService (create service if not exists)
5. Handle errors appropriately

**Error Handling**:
- If profile creation fails, should account still exist?
- Recommendation: Yes - user can complete profile later
- Log error for investigation
- Show message to user (optional)

## 🔄 Step 7: Session Management

### 7.1 Session Persistence

**Firebase automatically**:
- Persists authentication state in browser
- Restores session on page reload
- Handles token refresh

**What you need to do**:
- Check auth state on app load
- Handle session restoration
- Handle token expiration (Firebase handles automatically)

### 7.2 App Load Flow

**Flow**:
1. App loads (root layout)
2. AuthContext initializes
3. AuthContext sets up `onAuthStateChanged` listener
4. Listener fires with current user (or null)
5. Context updates state
6. Protected routes react to state change

### 7.3 Sign Out Flow

**Flow**:
1. User clicks sign out button
2. AuthContext.signOut() called
3. Firebase Auth.signOut() called
4. Context state updates (user becomes null)
5. Protected routes redirect to login
6. Optional: Clear local storage/cache

## 🎯 Step 8: Google Sign In

### 8.1 Implementation Steps

**Steps**:
1. Install Google Sign In (already in Firebase)
2. Create signInWithGoogle method in AuthContext
3. Use `signInWithPopup` from Firebase Auth
4. Handle success (create profile if new user)
5. Handle errors

### 8.2 User Flow

**Flow**:
1. User clicks "Sign in with Google" button
2. Google popup opens
3. User selects Google account
4. Google authenticates
5. Firebase receives credentials
6. User is signed in
7. If new user: Create profile in Firestore
8. Navigate to onboarding/home

### 8.3 Error Handling

**Errors to handle**:
- User cancels popup
- Network errors
- Firebase errors
- Profile creation errors

## ✅ Step 9: Testing

### 9.1 Manual Testing Checklist

**Test scenarios**:
- [ ] Sign up with valid email/password
- [ ] Sign up with invalid email format
- [ ] Sign up with weak password
- [ ] Sign up with mismatched passwords
- [ ] Sign in with correct credentials
- [ ] Sign in with incorrect credentials
- [ ] Sign in with Google
- [ ] Sign out successfully
- [ ] Session persists after page refresh
- [ ] Protected routes redirect correctly
- [ ] Error messages display correctly
- [ ] Loading states work correctly

### 9.2 Edge Cases to Test

**Edge cases**:
- Network offline during sign up
- Network offline during sign in
- Firebase service unavailable
- Invalid Firebase configuration
- User closes browser during authentication
- Multiple rapid sign in attempts
- Session expiry (Firebase handles, but test)

## 🎯 Step 10: Integration Points

### 10.1 Root Layout Integration

**In `app/layout.tsx`**:
1. Wrap app with AuthProvider
2. AuthProvider sets up once
3. All child components can use auth context

### 10.2 Navigation Integration

**After authentication**:
- Check onboarding status
- Navigate appropriately:
  - Not authenticated → `/login`
  - Authenticated + onboarding incomplete → `/onboarding`
  - Authenticated + onboarding complete → `/home`

## ✅ Step 11: Verification Checklist

Before moving to onboarding, verify:

**Functionality**:
- [ ] Users can sign up with email/password
- [ ] Users can sign in with email/password
- [ ] Users can sign in with Google
- [ ] Users can sign out
- [ ] Session persists correctly
- [ ] Navigation works after authentication
- [ ] User profile created in Firestore
- [ ] Error messages clear and helpful

**Code Quality**:
- [ ] Firebase config properly set up
- [ ] AuthContext properly structured
- [ ] Protected routes work correctly
- [ ] Error handling comprehensive
- [ ] No memory leaks (listeners cleaned up)

**User Experience**:
- [ ] Loading states are clear
- [ ] Error messages are user-friendly
- [ ] Form validation works smoothly
- [ ] Navigation feels natural
- [ ] Responsive design works

## 📚 Next Steps

Once authentication is complete and tested:

**Move to**: `04-ONBOARDING-USER-PROFILE.md`

**Prerequisites**:
- Authentication fully working
- User profiles created in Firestore
- Navigation flow tested
- Ready to collect onboarding data

---

**Remember**: Authentication is the foundation - get it right before moving forward! 🔐

