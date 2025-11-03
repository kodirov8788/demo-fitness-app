# Onboarding: Goals Screen

## 🎯 Purpose

This document guides you through implementing the third onboarding screen where users set their health goals, target weight, timeline, and upload ideal body image. This is the most complex onboarding screen due to safety validations.

## ⏱️ Time Estimate

**3-5 days** (includes safety validation implementation)

## 📋 Overview

**Screen Position**: Third step in onboarding flow

**Purpose**: Collect goal information for:
- Plan generation (calorie targets, macro ratios)
- Timeline planning
- Safety validation
- Progress tracking setup

## 📝 Step 1: Understand Requirements

### 1.1 Data to Collect

**Required fields**:
- **Target Weight**
  - Purpose: Calculate weight change needed
  - Units: kg (same as current weight unit)
  - Storage: `goal.targetWeight`
  - Validation: Must be realistic and safe

- **Purpose** (Goal Type)
  - Options: Diet/Weight Loss, Muscle Gain, Health Maintenance
  - Purpose: Determines plan type (PFC ratios, calorie targets)
  - Storage: `goal.purpose`

- **Target Timeline**
  - Purpose: Calculate monthly change rate
  - Range: 1-12 months
  - Storage: `goal.targetTimeline`
  - Validation: Must match healthy change rate

**Optional fields**:
- **Ideal Body Image**
  - Purpose: Visual reference for plan customization
  - Type: Image upload
  - Storage: Firebase Storage, URL in `goal.idealImageUrl`
  - Note: Used for plan refinement

- **Desired Impressions**
  - Options: Toned, Muscular, Healthy, Flexible, etc.
  - Selection: Multiple (up to 3) with priority order
  - Purpose: Fine-tune plan recommendations
  - Storage: `goal.desiredImpressions[]` and `goal.priorityOrder[]`

### 1.2 Critical Safety Validations

**Must implement**:
1. **Weight Change Rate**:
   - Maximum: 5% of current weight per month
   - Calculate: (targetWeight - currentWeight) / months
   - Validate against safe range

2. **Final BMI Check**:
   - Calculate BMI at target weight
   - Flag if BMI < 18.5 (underweight risk)
   - Flag if BMI > 30 (extreme, may need medical supervision)

3. **Timeline Validation**:
   - For weight loss: Minimum time based on safe rate
   - For muscle gain: Realistic expectations (0.5-1kg/month)

4. **Risk Level Assessment**:
   - 🟢 Safe: Within healthy ranges
   - 🟡 Caution: At limits but acceptable
   - 🔴 Danger: Unsafe, requires intervention

## 📝 Step 2: Design UI Components

### 2.1 Screen Layout

**Components needed**:
- Header with title
- Habi message display
- Target weight input
- Purpose selector (segmented control or picker)
- Timeline slider (1-12 months)
- Image upload section (optional):
  - Image picker button
  - Image preview
  - Remove image option
- Desired impressions selector (optional):
  - Multi-select with drag-to-reorder
  - Visual selection interface
- Safety validation display:
  - Risk level indicator (🟢🟡🔴)
  - Monthly change rate display
  - Final BMI display
  - Warning messages if needed
- Consent flow (if risky):
  - Warning message
  - Consent checkbox
  - Acknowledge risks button
- Navigation buttons
- Progress indicator (3 of 9)

### 2.2 UI Design Decisions

**Decisions to make**:
1. **Timeline Input**:
   - Slider or picker?
   - Recommendation: Slider (visual, easy to adjust)

2. **Image Upload**:
   - Camera or photo library?
   - Recommendation: Both options (camera for new photo, library for existing)

3. **Safety Warnings**:
   - When to show? (real-time or on submit)
   - Recommendation: Real-time as user adjusts values

4. **Consent Flow**:
   - Modal or inline?
   - Recommendation: Modal for serious warnings, inline for minor

5. **Validation Display**:
   - Always visible or only when issues?
   - Recommendation: Always visible (transparency)

## 🧠 Step 3: Create ViewModel

### 3.1 ViewModel Responsibilities

**GoalsViewModel should**:
- Store form inputs (@Published)
- Calculate monthly change rate in real-time
- Calculate final BMI in real-time
- Assess risk level in real-time
- Validate all inputs
- Handle image upload
- Handle image analysis (if implementing)
- Save to Firestore
- Handle consent flow (if risky goal)
- Manage warning states

### 3.2 Validation Logic

**Real-time validations**:
1. **Target Weight**:
   - Must be different from current weight
   - Calculate change amount
   - Check against monthly rate limits

2. **Purpose + Timeline**:
   - Weight loss: Max 5% per month
   - Muscle gain: Max 1.5kg per month
   - Maintenance: Weight change should be minimal

3. **BMI at Target**:
   - Calculate: targetWeight / (height/100)²
   - Flag if < 18.5 (underweight)
   - Flag if > 35 (extreme)

4. **Timeline Adequacy**:
   - Calculate minimum months needed
   - Warn if timeline too short
   - Suggest longer timeline if needed

### 3.3 Risk Assessment Logic

**Risk levels**:
- **🟢 Safe (Green)**:
  - Monthly change ≤ 3% of current weight
  - Final BMI between 18.5-25
  - Timeline adequate

- **🟡 Caution (Yellow)**:
  - Monthly change 3-5% of current weight
  - Final BMI 17-18.5 or 25-30
  - Timeline tight but achievable
  - Show warning, proceed with caution

- **🔴 Danger (Red)**:
  - Monthly change > 5% of current weight
  - Final BMI < 17 or > 30
  - Timeline impossible
  - Require consent, suggest adjustments

### 3.4 Consent Flow Logic

**If risk level is 🔴**:
1. Show detailed warning modal
2. Explain risks clearly
3. Require user to acknowledge risks
4. Provide "Adjust Goals" option (recommended)
5. Allow "Proceed Anyway" with consent
6. Log consent in Firestore for audit trail

## 🎨 Step 4: Create View

### 4.1 View Structure

**SwiftUI View components**:
1. **Header Section**
2. **Form Section**:
   - Target weight input
   - Purpose selector
   - Timeline slider with display
3. **Calculations Display** (real-time):
   - Monthly change rate
   - Final BMI
   - Risk level indicator
4. **Image Upload Section** (optional, collapsible)
5. **Impressions Selector** (optional)
6. **Warning/Consent Section** (if needed)
7. **Navigation Section**

### 4.2 Image Upload Implementation

**Steps**:
1. Add ImagePicker using PHPickerViewController or UIImagePickerController
2. Handle permissions (camera, photo library)
3. Compress image before upload
4. Upload to Firebase Storage
5. Get download URL
6. Store URL in Firestore
7. Display preview

**Considerations**:
- Image size limits (recommend: max 5MB)
- Image format (JPEG for compression)
- Privacy: Only upload when user explicitly chooses

## 💾 Step 5: Firestore Integration

### 5.1 Data Structure

**Goal document structure**:
```
goal: {
  targetWeight: number,
  purpose: "diet" | "muscle_gain" | "maintenance",
  targetTimeline: number, // months
  idealImageUrl: string?, // Firebase Storage URL
  desiredImpressions: string[],
  priorityOrder: number[],
  riskLevel: "safe" | "caution" | "danger",
  consentGiven: boolean, // if risky goal
  consentTimestamp: Date?,
  createdAt: Date,
  isActive: boolean
}
```

**Storage location**: `users/{userId}/goals/{goalId}`

### 5.2 Image Storage

**Firebase Storage path**: `users/{userId}/images/ideal-body-{timestamp}.jpg`

**Steps**:
1. Compress image
2. Upload to Storage
3. Get download URL
4. Save URL to Firestore goal document

## ✅ Step 6: Safety Validation Implementation

### 6.1 Validation Flow

**Flow**:
```
User enters target weight
    ↓
ViewModel calculates change
    ↓
Check monthly rate
    ↓
Calculate final BMI
    ↓
Assess risk level
    ↓
Display indicator
    ↓
If risky: Show warning
    ↓
User acknowledges or adjusts
```

### 6.2 Warning Messages

**Messages to prepare** (from design docs):
- "This goal is ambitious! We recommend a slower pace for better health."
- "This target weight may be below a healthy BMI. Consider consulting a healthcare provider."
- "This pace might be too fast. Sustainable change happens gradually."

### 6.3 Consent Tracking

**If user proceeds with risky goal**:
- Log consent in Firestore
- Include timestamp
- Include risk level
- Include adjusted plan (AI will modify recommendations)

## ✅ Step 7: Testing

### 7.1 Test Scenarios

**Functional tests**:
- [ ] Can set target weight
- [ ] Can select purpose
- [ ] Can adjust timeline
- [ ] Real-time calculations work
- [ ] Risk level updates correctly
- [ ] Image upload works
- [ ] Impressions selection works
- [ ] Validation prevents unsafe goals
- [ ] Consent flow works
- [ ] Data saves correctly

### 7.2 Safety Test Cases

**Critical tests**:
- [ ] Extreme weight loss goal blocked/warned
- [ ] Underweight target weight warned
- [ ] Too-fast timeline adjusted
- [ ] Safe goals pass without warnings
- [ ] Consent properly logged

## ✅ Step 8: Verification Checklist

Before moving to next step:

**Functionality**:
- [ ] All inputs work correctly
- [ ] Calculations accurate
- [ ] Safety validations work
- [ ] Risk assessment correct
- [ ] Consent flow works
- [ ] Image upload works
- [ ] Data saves correctly

**Safety**:
- [ ] All risky scenarios caught
- [ ] Warnings clear and helpful
- [ ] Consent properly tracked
- [ ] User cannot bypass critical validations

## 📚 Next Steps

Once Goals screen is complete:

**Move to**: `07-ONBOARDING-LIFESTYLE-VALUES.md`

**Prerequisites**:
- Goals saved
- Safety validations working
- Ready to collect lifestyle information

---

**Remember**: Safety first! Always validate goals before allowing users to proceed. ⚠️

