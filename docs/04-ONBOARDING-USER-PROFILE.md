# Onboarding: User Profile Screen

## 🎯 Purpose

This document guides you through implementing the first onboarding screen where users provide basic profile information using Next.js App Router.

## ⏱️ Time Estimate

**2-3 days**

## 📋 Overview

**Screen Position**: First step in onboarding flow (after authentication)

**Route**: `/onboarding/profile`

**Purpose**: Collect basic user information for:
- Personalization of Habi AI personality
- BMR calculation setup
- Communication style customization
- User identification

## 📝 Step 1: Understand Requirements

### 1.1 Data to Collect

**Required fields**:
- **Name** (or nickname)
  - Purpose: Personalize all interactions
  - Use: Notifications, messages, conversations
  - Storage: `user.name`

- **Gender** (Male/Female/Prefer not to say)
  - Purpose: BMR calculation coefficients
  - Use: BMR formula selection
  - Storage: `user.gender`

- **Date of Birth**
  - Purpose: Age calculation for BMR
  - Use: BMR formula, recommended sleep hours
  - Storage: `user.dateOfBirth` (timestamp)

**Optional fields**:
- **MBTI Type**
  - Purpose: Customize Habi AI personality
  - Use: Adjust communication style, advice tone
  - Storage: `user.mbti`
  - Note: Users can skip if they don't know

## 🎨 Step 2: Design UI Components

### 2.1 Page Structure

**Route**: Create `app/onboarding/profile/page.tsx`

**Components needed**:
- Header with title and Habi message
- Form fields:
  - Name text input
  - Gender selector (radio buttons or select)
  - Date picker for date of birth
  - MBTI selector (dropdown with "Skip" option)
- Navigation buttons:
  - "Next" button (disabled until required fields filled)
  - Progress indicator (1 of 9 steps)

### 2.2 UI Design Decisions

**Decisions to make**:
1. **Gender Selection**:
   - Radio buttons or select dropdown?
   - Recommendation: Radio buttons (3 options, clearer UX)

2. **Date of Birth Input**:
   - HTML5 date picker or custom component?
   - Recommendation: HTML5 date input (simple, accessible)

3. **MBTI Selection**:
   - Dropdown with all 16 types?
   - Or "I don't know" option prominent?
   - Recommendation: Dropdown with "Skip" option at top

4. **Form Layout**:
   - Single column or multi-column?
   - Recommendation: Single column (better mobile)

5. **Validation Feedback**:
   - Real-time or on submit?
   - Recommendation: Real-time (better UX)

## 💾 Step 3: Create Data Model

### 3.1 TypeScript Types

**File**: `types/user.ts`

**Type structure**:
- Define User interface
- Define Gender enum/type
- Define form data type

**Decisions**:
- Use enum or union type for Gender?
- Recommendation: Union type (`"male" | "female" | "prefer_not_to_say"`)

## 🧠 Step 4: Create Onboarding Context

### 4.1 Context Responsibilities

**OnboardingContext should**:
- Store collected data across all steps
- Track current step
- Provide navigation methods
- Handle data updates
- Persist data to Firestore (on step completion)

### 4.2 Context Design Decisions

**Decisions**:
1. **Data Structure**:
   - Flat object or nested by step?
   - Recommendation: Nested by step (clearer organization)

2. **Data Persistence**:
   - Save after each step or at end?
   - Recommendation: Save after each step (allow resume)

3. **Step Navigation**:
   - Allow skipping back?
   - Recommendation: Yes - allow editing previous steps

### 4.3 Implementation Steps

**Create OnboardingContext**:
1. Create `contexts/OnboardingContext.tsx`
2. Define context type
3. Create provider component
4. Add state for all onboarding data
5. Add methods: updateData, nextStep, previousStep
6. Add Firestore save logic

## 🎨 Step 5: Create Page Component

### 5.1 Page Implementation

**File**: `app/onboarding/profile/page.tsx`

**Mark as client component**: `'use client'` (for interactivity)

**Structure**:
1. Use OnboardingContext to get/update data
2. Local state for form inputs (sync with context)
3. Form validation logic
4. Submit handler (save and navigate)

### 5.2 Form Handling

**Options**:
- Uncontrolled inputs (refs)
- Controlled inputs (state)
- Form library (react-hook-form)

**Recommendation**: Controlled inputs with react-hook-form (better validation)

### 5.3 Validation

**Validation rules**:
1. **Name**:
   - Not empty
   - Max 50 characters
   - Trim whitespace

2. **Gender**:
   - Must be selected

3. **Date of Birth**:
   - Not empty
   - Must be in the past
   - Age must be 13+ (minimum requirement)
   - Age must be reasonable (< 120 years)

4. **MBTI**:
   - Optional
   - If provided, must be valid MBTI type

## 🔄 Step 6: Integrate with Routing

### 6.1 Navigation Flow

**Flow**:
1. User completes form
2. User clicks "Next"
3. Validate form
4. If valid: Update context, save to Firestore
5. If save successful: Navigate to next step
6. If save fails: Show error, stay on page

### 6.2 Navigation Implementation

**Using Next.js navigation**:
- Import `useRouter` from `next/navigation`
- Use `router.push('/onboarding/physical-info')`

### 6.3 Progress Indicator

**Component**: `components/onboarding/ProgressBar.tsx`

**Display**:
- Current step (1)
- Total steps (9)
- Visual progress bar
- Percentage complete

## 💾 Step 7: Firestore Integration

### 7.1 Data Saving

**Save process**:
1. Validate data in component
2. Update OnboardingContext
3. Context triggers Firestore save
4. Path: `users/{userId}`
5. Update fields:
   - name
   - gender
   - dateOfBirth
   - mbti (if provided)
   - updatedAt timestamp

### 7.2 Data Loading

**If user returns to this step**:
1. Load existing data from OnboardingContext
2. Context loads from Firestore on mount
3. Populate form fields
4. Allow editing

### 7.3 Error Handling

**Error scenarios**:
- Network unavailable: Show error, allow retry
- Firestore write fails: Show error message
- Validation fails: Show inline errors
- Invalid data: Prevent submission

## ✅ Step 8: Testing

### 8.1 Test Scenarios

**Functional tests**:
- [ ] Can enter name
- [ ] Can select gender
- [ ] Can select date of birth
- [ ] Can select MBTI (optional)
- [ ] Form validates correctly
- [ ] "Next" disabled when invalid
- [ ] "Next" enabled when valid
- [ ] Data saves to Firestore
- [ ] Can navigate to next step
- [ ] Can go back and edit
- [ ] Data persists when returning

### 8.2 Edge Cases

**Test edge cases**:
- Empty name
- Very long name (> 50 chars)
- Future date of birth
- Very old date (> 120 years)
- Network offline during save
- Firestore unavailable
- User closes browser mid-form

## 🎯 Step 9: Integration Points

### 9.1 Connect to Calculation Service

**Integration**:
- Gender selection affects BMR calculation
- Date of birth affects BMR calculation
- This data used in later steps (Physical Info)

### 9.2 Connect to Habi AI

**Integration**:
- Name used in all Habi messages
- MBTI affects Habi personality
- Gender affects communication style (pronouns)

## ✅ Step 10: Verification Checklist

Before moving to next step:

**Functionality**:
- [ ] All form fields work correctly
- [ ] Validation works as expected
- [ ] Data saves to Firestore
- [ ] Navigation works correctly
- [ ] Error handling works
- [ ] Loading states work

**User Experience**:
- [ ] Form is intuitive
- [ ] Error messages are clear
- [ ] Habi messages display correctly
- [ ] Progress indicator shows correctly
- [ ] Responsive design works
- [ ] Form works on mobile

**Data Integrity**:
- [ ] Data structure matches Firestore schema
- [ ] All required fields are captured
- [ ] Optional fields work correctly
- [ ] Data persists correctly

## 📚 Next Steps

Once User Profile screen is complete:

**Move to**: `05-ONBOARDING-PHYSICAL-INFO.md`

**Prerequisites**:
- User profile data saved
- Navigation to next step works
- Ready to collect physical measurements

---

**Remember**: This is the first impression of onboarding - make it smooth and welcoming! 👤

