# Onboarding: User Profile Screen

## 🎯 Purpose

This document guides you through implementing the first onboarding screen where users provide basic profile information (name, gender, date of birth, MBTI).

## ⏱️ Time Estimate

**2-3 days**

## 📋 Overview

**Screen Position**: First step in onboarding flow (after authentication)

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
  - Note: Affects calculation but respects privacy

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

### 1.2 Habi Messages

**Messages to display** (from design docs):

- "You can change these settings later in the settings screen"
- Contextual messages based on user input

## 🎨 Step 2: Design UI Components

### 2.1 Screen Layout

**Components needed**:

- Header with title
- Habi message display area
- Form fields:
  - Name text input
  - Gender picker/segmented control
  - Date picker for date of birth
  - MBTI picker (optional)
- Navigation buttons:
  - "Next" button (disabled until required fields filled)
  - Progress indicator (1 of 9 steps)

### 2.2 UI Design Decisions

**Decisions to make**:

1. **Gender Selection**:

   - Use segmented control or picker?
   - Recommendation: Segmented control (3 options, better UX)

2. **Date of Birth Input**:

   - Use date picker or manual input?
   - Recommendation: Date picker (prevents errors)

3. **MBTI Selection**:

   - Dropdown with all 16 types?
   - Or "I don't know" option prominent?
   - Recommendation: Dropdown with "Skip" option

4. **Validation Feedback**:
   - Real-time or on button tap?
   - Recommendation: Real-time for better UX

## 💾 Step 3: Create Data Model

### 3.1 User Profile Model

**Model structure**:

- name: String (required)
- gender: Gender enum (required)
  - Cases: male, female, preferNotToSay
- dateOfBirth: Date (required)
- mbti: String? (optional)

### 3.2 Model Decisions

**Decisions**:

- Store as struct or class?
- Recommendation: Struct (immutable, value type)
- Conform to Codable for Firestore

## 🧠 Step 4: Create ViewModel

### 4.1 ViewModel Responsibilities

**UserProfileViewModel should**:

- Store form input values (@Published properties)
- Validate form data
- Handle date of birth calculations
- Call FirestoreService to save data
- Manage loading/error states
- Calculate age from date of birth
- Determine if form is valid

### 4.2 Validation Logic

**Validation rules**:

1. **Name**:

   - Not empty
   - Max 50 characters
   - Trim whitespace

2. **Gender**:

   - Must be selected (not optional in UI)

3. **Date of Birth**:

   - Not nil
   - Age must be 13+ (minimum requirement)
   - Age must be reasonable (< 120 years)

4. **MBTI**:
   - Optional (can be empty)
   - If provided, must be valid MBTI type

### 4.3 ViewModel Design Decisions

**Decisions to make**:

1. **Age Calculation**:

   - Calculate once or store?
   - Recommendation: Calculate when needed, don't store age separately

2. **Validation Timing**:

   - Validate on change or on submit?
   - Recommendation: Validate on change, show errors in real-time

3. **Data Saving**:
   - Save immediately or when moving to next step?
   - Recommendation: Save when moving to next step (allows editing previous steps)

## 🎨 Step 5: Create View

### 5.1 View Structure

**SwiftUI View components**:

1. **Header Section**:

   - Title text
   - Subtitle text (optional)

2. **Habi Message Section**:

   - Message display
   - Icon/avatar (if using Habi visual)

3. **Form Section**:

   - Name field
   - Gender selector
   - Date picker
   - MBTI selector (optional)

4. **Navigation Section**:
   - Progress indicator
   - Next button
   - Back button (if needed)

### 5.2 View Design Decisions

**Decisions**:

1. **Form Layout**:

   - Scrollable form or single screen?
   - Recommendation: Scrollable (accommodates keyboard)

2. **Button State**:

   - Disable "Next" until valid?
   - Recommendation: Yes - prevents errors

3. **Error Display**:
   - Inline errors or toast?
   - Recommendation: Inline errors (clearer)

## 🔄 Step 6: Integrate with Coordinator

### 6.1 Navigation Flow

**Flow**:

1. User completes form
2. User taps "Next"
3. ViewModel validates
4. If valid: Save to Firestore
5. If save successful: Coordinator moves to next step
6. If save fails: Show error, stay on screen

### 6.2 Coordinator Integration

**OnboardingCoordinator should**:

- Manage current step
- Handle "Next" action
- Navigate to PhysicalInfoView
- Handle back navigation
- Track progress

## 💾 Step 7: Firestore Integration

### 7.1 Data Saving

**Save process**:

1. Validate data in ViewModel
2. Create/update user document in Firestore
3. Path: `users/{userId}`
4. Update fields:
   - name
   - gender
   - dateOfBirth
   - mbti (if provided)
   - updatedAt timestamp

### 7.2 Data Loading

**If user returns to this step**:

1. Load existing data from Firestore
2. Populate form fields
3. Allow editing

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
- Invalid date (future)
- Very old date (> 120 years)
- Network offline during save
- Firestore unavailable
- User closes app mid-form
- Invalid MBTI value (if manual entry)

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
- [ ] Keyboard handling works smoothly

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
