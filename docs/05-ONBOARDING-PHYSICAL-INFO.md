# Onboarding: Physical Information Screen

## 🎯 Purpose

This document guides you through implementing the second onboarding screen where users provide physical measurements for BMR, BMI, and plan calculations.

## ⏱️ Time Estimate

**2-3 days**

## 📋 Overview

**Screen Position**: Second step in onboarding flow

**Route**: `/onboarding/physical-info`

**Purpose**: Collect physical measurements for:
- BMR calculation (using height, weight, age from previous step)
- BMI calculation
- Lean Body Mass (LBM) calculation
- Target weight safety validation
- Baseline for progress tracking

## 📝 Step 1: Understand Requirements

### 1.1 Data to Collect

**Required fields**:
- **Height**
  - Purpose: BMR calculation, BMI calculation
  - Units: cm (store in cm, allow user input in preferred unit)
  - Range: 100-250 cm
  - Storage: `physicalInfo.height`

- **Weight**
  - Purpose: BMR calculation, BMI calculation, progress tracking
  - Units: kg (store in kg, allow user input in preferred unit)
  - Range: 30-300 kg
  - Storage: `physicalInfo.weight`

**Optional fields**:
- **Body Fat Percentage**
  - Purpose: More accurate LBM calculation, protein calculation
  - Range: 5-50%
  - Storage: `physicalInfo.bodyFatPercentage`
  - Note: If not provided, estimate based on gender

- **Muscle Mass**
  - Purpose: Validate LBM calculation
  - Units: kg
  - Storage: `physicalInfo.muscleMass`

- **Waist Circumference**
  - Purpose: Health risk assessment
  - Units: cm
  - Storage: `physicalInfo.waistCircumference`

### 1.2 Calculations Needed

**During input**:
- BMI calculation (height, weight)
- Standard weight range
- LBM estimate (if body fat % provided)
- Health risk indicators (if waist circumference provided)

## 📝 Step 2: Design UI Components

### 2.1 Page Structure

**Route**: `app/onboarding/physical-info/page.tsx`

**Components needed**:
- Header with title and Habi message
- Unit selector (metric/imperial toggle)
- Height input field with unit
- Weight input field with unit
- Optional fields section (collapsible):
  - Body fat percentage input
  - Muscle mass input
  - Waist circumference input
- Real-time calculations display:
  - BMI
  - BMI category
  - Standard weight range
- Navigation buttons
- Progress indicator (2 of 9)

### 2.2 UI Design Decisions

**Decisions to make**:
1. **Unit System**:
   - Allow switching between metric/imperial?
   - Store in metric, convert for display?
   - Recommendation: Allow user preference, store in metric

2. **Input Method**:
   - Text input or slider?
   - Recommendation: Text input with number type (more precise)

3. **Real-time Feedback**:
   - Show BMI as user types?
   - Recommendation: Yes - helpful feedback, debounce updates

4. **Optional Fields**:
   - Show all at once or collapsible section?
   - Recommendation: Collapsible "Advanced" section

5. **BMI Display**:
   - Simple text or visual indicator?
   - Recommendation: Both - number + color-coded category

## 💾 Step 3: Create Data Model

### 3.1 TypeScript Types

**File**: `types/physicalInfo.ts`

**Type structure**:
- PhysicalInfo interface
- All fields optional except height/weight
- Include validation types

## 🧠 Step 4: Create ViewModel/Hook

### 4.1 Custom Hook Approach

**For web, use custom hook instead of ViewModel**:

**File**: `hooks/usePhysicalInfo.ts`

**Hook responsibilities**:
- Manage form state
- Handle unit conversion
- Calculate BMI in real-time
- Calculate standard weight range
- Validate inputs
- Handle optional fields
- Save to Firestore
- Load existing data

### 4.2 Validation Logic

**Validation rules**:
1. **Height**:
   - Required
   - Range: 100-250 cm
   - Convert from user's preferred unit
   - Show warning if outside normal range

2. **Weight**:
   - Required
   - Range: 30-300 kg
   - Convert from user's preferred unit
   - Show warning if outside normal range

3. **Body Fat Percentage** (if provided):
   - Range: 5-50%
   - Validate against gender norms
   - Show warning if extreme

### 4.3 Calculations to Implement

**BMI Calculation**:
- Formula: weight (kg) / (height (m))²
- Convert height from cm to meters
- Display BMI and category

**Standard Weight Range**:
- Based on height and BMI healthy range (18.5-24.9)
- Calculate min and max healthy weight

**LBM Estimation**:
- If body fat % provided: LBM = weight × (1 - bodyFatPercentage/100)
- If not: Estimate based on gender and weight

## 🎨 Step 5: Create Page Component

### 5.1 Page Implementation

**File**: `app/onboarding/physical-info/page.tsx`

**Mark as client component**: `'use client'`

**Structure**:
1. Use OnboardingContext
2. Use custom hook (usePhysicalInfo)
3. Form with controlled inputs
4. Real-time calculation display
5. Submit handler

### 5.2 Form Handling

**Input types**:
- Height: `type="number"` input
- Weight: `type="number"` input
- Optional fields: `type="number"` inputs

**Unit conversion**:
- Store conversion state
- Convert on input change
- Display in user's preferred unit
- Save in metric

### 5.3 Real-time Calculations

**Implementation**:
- Use `useMemo` for calculations (performance)
- Debounce updates (avoid too many recalculations)
- Update when height or weight changes

**Display**:
- BMI value (1 decimal place)
- BMI category (text + color)
- Standard weight range (display in user's unit)

## 🔄 Step 6: Integrate Calculation Service

### 6.1 Use Calculation Service

**Integrate with CalculationService**:
- Import from shared calculations
- Use for BMI calculation
- Use for standard weight range
- Use for LBM estimation

**Note**: Don't duplicate calculation logic - use shared service

### 6.2 Data Flow

**Flow**:
1. User enters height/weight
2. Hook updates state
3. Hook calls CalculationService for BMI
4. Hook updates BMI display state
5. Component re-renders automatically (React reactivity)

## 💾 Step 7: Firestore Integration

### 7.1 Data Saving

**Save process**:
1. Validate all inputs
2. Convert to metric units (if needed)
3. Update OnboardingContext
4. Context saves to Firestore
5. Path: `users/{userId}/physicalInfo/latest` OR in user document
6. Include timestamp

### 7.2 Data Loading

**If user returns**:
1. OnboardingContext loads data on mount
2. Convert from metric to user's preferred unit
3. Populate form fields
4. Recalculate and display BMI

## ✅ Step 8: Testing

### 8.1 Test Scenarios

**Functional tests**:
- [ ] Can enter height in preferred unit
- [ ] Can enter weight in preferred unit
- [ ] Unit conversion works correctly
- [ ] BMI calculates correctly
- [ ] BMI category displays correctly
- [ ] Standard weight range calculates correctly
- [ ] Optional fields work correctly
- [ ] Data saves to Firestore
- [ ] Data loads correctly when returning
- [ ] Validation works correctly
- [ ] Navigation works

### 8.2 Edge Cases

**Test edge cases**:
- Extreme values (very tall/short, very heavy/light)
- Invalid unit conversions
- Body fat % inconsistent with weight
- Network offline during save
- Invalid number formats
- Negative values (should be prevented)

## ✅ Step 9: Verification Checklist

Before moving to next step:

**Functionality**:
- [ ] All inputs work correctly
- [ ] Unit conversion accurate
- [ ] Calculations correct
- [ ] Validation works
- [ ] Data saves correctly
- [ ] Data loads correctly

**User Experience**:
- [ ] Real-time feedback helpful
- [ ] Calculations clear and understandable
- [ ] Optional fields don't overwhelm
- [ ] Error messages clear
- [ ] Responsive design works
- [ ] Mobile-friendly

## 📚 Next Steps

Once Physical Information screen is complete:

**Move to**: `06-ONBOARDING-GOALS.md`

**Prerequisites**:
- Physical measurements saved
- BMI calculated and displayed
- Ready to collect goal information

---

**Remember**: Accurate measurements = accurate plans! 📏

