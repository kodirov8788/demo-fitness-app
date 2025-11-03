# Onboarding: Physical Information Screen

## 🎯 Purpose

This document guides you through implementing the second onboarding screen where users provide physical measurements (height, weight, body fat, etc.) for BMR, BMI, and plan calculations.

## ⏱️ Time Estimate

**2-3 days**

## 📋 Overview

**Screen Position**: Second step in onboarding flow

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
  - Range: 30-300 kg (reasonable range)
  - Storage: `physicalInfo.weight`

**Optional fields**:
- **Body Fat Percentage**
  - Purpose: More accurate LBM calculation, protein calculation
  - Range: 5-50% (reasonable range)
  - Storage: `physicalInfo.bodyFatPercentage`
  - Note: If not provided, estimate based on gender

- **Muscle Mass**
  - Purpose: Validate LBM calculation
  - Units: kg
  - Storage: `physicalInfo.muscleMass`
  - Note: Optional validation field

- **Waist Circumference**
  - Purpose: Health risk assessment
  - Units: cm
  - Storage: `physicalInfo.waistCircumference`
  - Note: Optional health indicator

### 1.2 Calculations Needed

**During input**:
- BMI calculation (height, weight)
- Standard weight range
- LBM estimate (if body fat % provided)
- Health risk indicators (if waist circumference provided)

**After submission**:
- Save to Firestore
- Used in plan generation

## 📝 Step 2: Design UI Components

### 2.1 Screen Layout

**Components needed**:
- Header with title
- Habi message display
- Unit selector (metric/imperial)
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
   - Text field or slider/picker?
   - Recommendation: Text field with number pad (more precise)

3. **Real-time Feedback**:
   - Show BMI as user types?
   - Recommendation: Yes - helpful feedback

4. **Optional Fields**:
   - Show all at once or collapsible section?
   - Recommendation: Collapsible "Advanced" section

## 💾 Step 3: Create Data Model

### 3.1 PhysicalInfo Model

**Model structure**:
- height: Double (cm, required)
- weight: Double (kg, required)
- bodyFatPercentage: Double? (optional)
- muscleMass: Double? (optional)
- waistCircumference: Double? (optional)
- recordedAt: Date (timestamp)
- createdAt: Date

### 3.2 Model Decisions

**Decisions**:
- Separate model or part of User model?
- Recommendation: Separate model (can track history)
- Store as subcollection: `users/{userId}/physicalInfo/{docId}`
- Or latest in user document?
- Recommendation: Latest in user document for MVP, history in subcollection later

## 🧠 Step 4: Create ViewModel

### 4.1 ViewModel Responsibilities

**PhysicalInfoViewModel should**:
- Store form inputs (@Published)
- Handle unit conversion
- Calculate BMI in real-time
- Calculate standard weight range
- Validate inputs
- Handle optional fields
- Save to Firestore
- Load existing data (if returning to step)

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

4. **Muscle Mass** (if provided):
   - Should be less than weight
   - Validate against body fat % if both provided

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

## 🎨 Step 5: Create View

### 5.1 View Structure

**SwiftUI View components**:
1. **Header Section**
2. **Unit Selector** (metric/imperial toggle)
3. **Required Fields**:
   - Height input
   - Weight input
4. **Calculations Display** (read-only):
   - BMI value
   - BMI category
   - Standard weight range
5. **Optional Fields Section** (collapsible):
   - Body fat percentage
   - Muscle mass
   - Waist circumference
6. **Navigation Section**

### 5.2 View Design Decisions

**Decisions**:
1. **Input Formatting**:
   - Show decimals or whole numbers?
   - Recommendation: Allow decimals (more precise)

2. **Real-time Updates**:
   - Update calculations on every keystroke?
   - Recommendation: Debounce or update on field blur

3. **Visual Feedback**:
   - Show BMI category with color?
   - Recommendation: Yes - green/yellow/red for visual clarity

## 🔄 Step 6: Integrate Calculation Service

### 6.1 Use Calculation Service

**Integrate with CalculationService**:
- Use for BMI calculation
- Use for standard weight range
- Use for LBM estimation

**Note**: Don't duplicate calculation logic - use shared service

### 6.2 Data Flow

**Flow**:
1. User enters height/weight
2. ViewModel updates @Published properties
3. ViewModel calls CalculationService for BMI
4. ViewModel updates BMI display property
5. View updates automatically (SwiftUI reactivity)

## 💾 Step 7: Firestore Integration

### 7.1 Data Saving

**Save process**:
1. Validate all inputs
2. Convert to metric units (if needed)
3. Create/update physicalInfo in Firestore
4. Path: `users/{userId}/physicalInfo/latest` OR in user document
5. Include timestamp

### 7.2 Data Loading

**If user returns**:
1. Load latest physicalInfo from Firestore
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

## 📚 Next Steps

Once Physical Information screen is complete:

**Move to**: `06-ONBOARDING-GOALS.md`

**Prerequisites**:
- Physical measurements saved
- BMI calculated and displayed
- Ready to collect goal information

---

**Remember**: Accurate measurements = accurate plans! 📏

