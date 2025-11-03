# iOS Authentication Process

## 🎯 Purpose

This document guides you through implementing the authentication system for Habi Mate iOS app. It covers the complete process from Firebase setup to user session management.

## ⏱️ Time Estimate

**1 week**

## 📋 Overview

Authentication allows users to:

- Create accounts (Email/Password + Apple Sign In)
- Sign in securely
- Maintain session across app launches
- Access personalized features

## 🔐 Step 1: Firebase Auth Setup

### 1.1 Verify Firebase Configuration

**Check**:

- GoogleService-Info.plist is in project
- Firebase pods installed
- Bundle ID matches Firebase project

### 1.2 Enable Authentication Providers

**In Firebase Console**:

1. Go to Authentication → Sign-in method
2. Enable **Email/Password**:

   - Toggle to enabled
   - No additional configuration needed
   - Click "Save"

3. Enable **Apple**:
   - Toggle to enabled
   - App ID: Your bundle identifier
   - OAuth redirect URL: (auto-filled)
   - Click "Save"

## 📱 Step 2: Create Auth Service

### 2.1 Service Responsibilities

**AuthService should handle**:

- User sign up with email/password
- User sign in with email/password
- User sign in with Apple
- User sign out
- Current user state
- Session persistence
- User account deletion (optional for MVP)

### 2.2 Service Design Decisions

**Decisions to make**:

1. **Singleton vs Dependency Injection**:

   - Recommendation: Singleton for AuthService (only one auth state)
   - Easier to access from anywhere

2. **Error Handling**:

   - How to structure error types?
   - Should errors be thrown or returned in completion handler?
   - Recommendation: Use Swift's Result type or throwing functions

3. **User State Observation**:
   - How to notify when auth state changes?
   - Use Combine publishers or @Published properties
   - Recommendation: Combine publisher for reactive updates

### 2.3 Implementation Steps

**Create AuthService**:

1. Create `Services/AuthService.swift`
2. Define service protocol (AuthServiceProtocol)
3. Implement service class conforming to protocol
4. Add Firebase Auth import
5. Implement each authentication method
6. Add error handling for each method
7. Add current user property
8. Add auth state publisher (if using Combine)

## 🧠 Step 3: Create Auth ViewModel

### 3.1 ViewModel Responsibilities

**AuthViewModel should handle**:

- Form validation (email format, password strength)
- Calling AuthService methods
- Managing loading states
- Managing error messages
- Navigation decisions (when to move to next screen)

### 3.2 ViewModel Design Decisions

**Decisions to make**:

1. **Form State Management**:

   - How to track email/password input?
   - Use @Published properties for reactive binding

2. **Validation Timing**:

   - Real-time validation or on submit?
   - Recommendation: Real-time for better UX

3. **Error Display**:

   - How to show errors to user?
   - Localized error messages?
   - Recommendation: User-friendly error messages, localized

4. **Loading States**:
   - Separate loading state for each action?
   - Or single isLoading property?
   - Recommendation: Single isLoading is simpler for MVP

### 3.3 Implementation Steps

**Create AuthViewModel**:

1. Create `ViewModels/AuthViewModel.swift`
2. Make it conform to BaseViewModel protocol
3. Add @Published properties for:
   - Email, password, name (for sign up)
   - isLoading
   - errorMessage
   - isAuthenticated
4. Add methods:
   - signIn()
   - signUp()
   - signOut()
   - validateForm()
5. Connect to AuthService
6. Add error handling
7. Update state based on service responses

## 🎨 Step 4: Create Auth Views

### 4.1 Login View

**Components needed**:

- Email input field
- Password input field
- Sign In button
- Sign In with Apple button
- "Don't have account?" link to sign up
- Error message display
- Loading indicator

**User Flow**:

1. User enters email and password
2. User taps "Sign In" button
3. View shows loading state
4. ViewModel calls AuthService
5. On success: Navigate to onboarding/home
6. On error: Display error message

**Design Decisions**:

- Should password field have show/hide toggle? (Yes - better UX)
- Should form validate before submit? (Yes - show errors early)
- Auto-focus first field? (Yes - better UX)

### 4.2 Sign Up View

**Components needed**:

- Name input field
- Email input field
- Password input field
- Confirm password field
- Sign Up button
- "Already have account?" link to login
- Password strength indicator (optional for MVP)
- Error message display
- Loading indicator

**User Flow**:

1. User enters name, email, password, confirm password
2. View validates password match
3. User taps "Sign Up" button
4. View shows loading state
5. ViewModel calls AuthService
6. AuthService creates account
7. Create user profile in Firestore
8. On success: Navigate to onboarding
9. On error: Display error message

**Design Decisions**:

- Minimum password length? (Recommend: 6 characters)
- Require password confirmation? (Yes - prevents typos)
- Show password requirements? (Optional for MVP)

### 4.3 Sign In with Apple

**Components needed**:

- Sign In with Apple button (system component)
- Handle authorization flow
- Error handling

**User Flow**:

1. User taps Sign In with Apple button
2. System shows Apple authentication sheet
3. User authenticates with Face ID/Touch ID
4. System returns credentials
5. ViewModel processes credentials
6. AuthService signs in with Firebase
7. On success: Navigate to onboarding/home

**Implementation Considerations**:

- Use ASAuthorizationController (system API)
- Handle different response scenarios
- Handle credential state changes
- Handle errors appropriately

## 🔄 Step 5: Create Auth Coordinator

### 5.1 Coordinator Responsibilities

**AuthCoordinator should**:

- Show login screen
- Show sign up screen
- Handle navigation between auth screens
- Notify AppCoordinator when authentication complete
- Handle "skip" or "cancel" actions

### 5.2 Coordinator Design Decisions

**Decisions to make**:

1. **Navigation Method**:

   - Push navigation or modal presentation?
   - Recommendation: Modal for auth flow (feels separate from app)

2. **After Authentication**:

   - Where to navigate?
   - Check if onboarding complete first
   - Recommendation: Check onboarding status, then navigate appropriately

3. **Lifecycle Management**:
   - When to create/destroy coordinator?
   - Recommendation: Create on app launch if not authenticated, destroy after successful auth

### 5.3 Implementation Steps

**Create AuthCoordinator**:

1. Create `Coordinators/AuthCoordinator.swift`
2. Define navigation methods:
   - showLogin()
   - showSignUp()
   - didAuthenticate()
3. Connect to AppCoordinator
4. Handle child view model callbacks
5. Manage view presentation

## 🔒 Step 6: Session Management

### 6.1 Session Persistence

**Firebase automatically**:

- Persists authentication state
- Restores session on app launch
- Handles token refresh

**What you need to do**:

- Check auth state on app launch
- Handle session restoration
- Handle token expiration (Firebase does this automatically)

### 6.2 App Launch Flow

**Flow**:

1. App launches
2. AppCoordinator checks AuthService.currentUser
3. If user exists:
   - Check if onboarding complete
   - Navigate to appropriate screen
4. If no user:
   - Show authentication screen

**Implementation Considerations**:

- How to check onboarding status?
- Store flag in UserDefaults or Firestore?
- Recommendation: Check Firestore for onboarding completion

### 6.3 Sign Out Flow

**Flow**:

1. User taps sign out button
2. AuthService.signOut() called
3. Clear local user data (optional)
4. Navigate to login screen
5. AuthCoordinator handles navigation

## 📝 Step 7: User Profile Creation

### 7.1 When to Create Profile

**After successful sign up**:

1. Firebase Auth creates user
2. Immediately create user document in Firestore
3. Include basic info from sign up form
4. Set default values for missing fields

### 7.2 Profile Data Structure

**Initial profile should include**:

- uid (from Firebase Auth)
- email
- name (from sign up form)
- createdAt timestamp
- onboardingCompleted: false
- Other fields will be filled during onboarding

### 7.3 Implementation Steps

**Create user profile**:

1. After successful sign up
2. Get user ID from Firebase Auth
3. Create Firestore document in "users" collection
4. Use user ID as document ID
5. Set initial data
6. Handle errors (what if Firestore write fails?)

**Error Handling**:

- If profile creation fails, should account still exist?
- Recommendation: Yes - user can complete profile later
- Log error for investigation

## ✅ Step 8: Testing Authentication

### 8.1 Manual Testing Checklist

**Test scenarios**:

- [ ] Sign up with valid email/password
- [ ] Sign up with invalid email format
- [ ] Sign up with weak password
- [ ] Sign up with mismatched passwords
- [ ] Sign in with correct credentials
- [ ] Sign in with incorrect credentials
- [ ] Sign in with Apple (on real device)
- [ ] Sign out successfully
- [ ] Session persists after app close/reopen
- [ ] Navigation works correctly after auth
- [ ] Error messages display correctly
- [ ] Loading states work correctly

### 8.2 Edge Cases to Test

**Edge cases**:

- Network offline during sign up
- Network offline during sign in
- Firebase service unavailable
- Invalid Firebase configuration
- User closes app during authentication
- Multiple rapid sign in attempts

## 🎯 Step 9: Integration with App Coordinator

### 9.1 App Launch Decision Tree

**Flow**:

```
App Launches
    ↓
Check AuthService.currentUser
    ↓
┌─────────────────────────┬─────────────────────────┐
│ User exists?            │ No user?                │
│                         │                         │
│ Check onboarding status │ Show AuthCoordinator    │
│                         │ (Login/Sign Up)         │
│                         │                         │
│ ┌───────────┬─────────┐│                         │
│ │ Complete?  │ Incomplete?│                         │
│ │           │             │                         │
│ │ Show Home │ Show Onboarding│                     │
│ └───────────┴─────────┘│                         │
└─────────────────────────┴─────────────────────────┘
```

### 9.2 Coordinator Communication

**How coordinators communicate**:

- AuthCoordinator notifies AppCoordinator on authentication
- AppCoordinator decides next flow
- AppCoordinator creates appropriate coordinator

**Design Decision**:

- Use delegate pattern or closures?
- Recommendation: Delegate pattern for clarity

## ✅ Step 10: Verification Checklist

Before moving to onboarding, verify:

**Functionality**:

- [ ] Users can sign up with email/password
- [ ] Users can sign in with email/password
- [ ] Users can sign in with Apple
- [ ] Users can sign out
- [ ] Session persists correctly
- [ ] Navigation works after authentication
- [ ] User profile created in Firestore
- [ ] Error messages clear and helpful

**Code Quality**:

- [ ] AuthService follows protocol-oriented design
- [ ] AuthViewModel properly manages state
- [ ] Views are properly structured
- [ ] Coordinator handles navigation correctly
- [ ] Error handling is comprehensive
- [ ] No memory leaks

**User Experience**:

- [ ] Loading states are clear
- [ ] Error messages are user-friendly
- [ ] Form validation works smoothly
- [ ] Navigation feels natural

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
