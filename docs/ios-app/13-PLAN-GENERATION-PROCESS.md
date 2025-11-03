# Plan Generation Process

## 🎯 Purpose

This document guides you through implementing the plan generation system that creates personalized health plans based on all collected onboarding data.

## ⏱️ Time Estimate

**1-2 weeks**

## 📋 Overview

**Trigger**: After user completes all 9 onboarding steps

**Purpose**: Generate comprehensive plan with:
- Nutrition plan (calories, macros)
- Exercise plan (frequency, type, duration)
- Sleep plan (schedule, recommendations)
- Mental health plan (check-ins, support)

## 🔄 Step 1: Data Collection Validation

### 1.1 Verify All Data Collected

**Before generating plan, check**:
- [ ] User profile complete (name, gender, DOB, MBTI)
- [ ] Physical info complete (height, weight, optional fields)
- [ ] Goals set (target weight, purpose, timeline)
- [ ] Lifestyle values collected
- [ ] Motivation assessment complete
- [ ] Exercise assessment complete (including PAR-Q)
- [ ] Dietary assessment complete
- [ ] Mental health assessment complete
- [ ] Sleep assessment complete

### 1.2 Handle Missing Data

**If data missing**:
- Navigate user back to incomplete step
- Show message: "Please complete all steps to generate your plan"
- Don't allow plan generation with incomplete data

## 🧮 Step 2: Calculation Integration

### 2.1 Gather Calculation Inputs

**Collect from onboarding data**:
- Weight, height, age, gender → BMR calculation
- Activity level from exercise assessment → Activity Factor
- Body fat % (if provided) → LBM calculation
- Goal purpose → Target calorie calculation
- Goal timeline → Rate validation

### 2.2 Execute Calculations

**Call CalculationService with**:
1. Physical data (weight, height, age, gender)
2. Activity factor
3. Body fat percentage (if available)
4. Goal type (diet/muscle gain/maintenance)

**Get results**:
- BMR value
- TDEE value
- Target calories
- Lean body mass
- Protein, fats, carbs (macros)

## 🎯 Step 3: Plan Component Generation

### 3.1 Nutrition Plan Generation

**Steps**:
1. Use calculated macros
2. Determine meal structure based on:
   - Dietary assessment (meals per day preference)
   - Cooking skills
   - Equipment available
3. Generate recommendations:
   - Meal timing suggestions
   - Portion guidance
   - Food suggestions
   - Recipe complexity level

**Output structure**:
```
nutrition: {
  targetCalories: number,
  protein: number, // grams
  carbs: number, // grams
  fats: number, // grams
  mealsPerDay: number,
  mealTimings: string[],
  recommendations: string[]
}
```

### 3.2 Exercise Plan Generation

**Steps**:
1. Determine frequency based on:
   - Current exercise frequency
   - Available time
   - PAR-Q responses (safety restrictions)
2. Determine type based on:
   - User preferences (bodyweight/bands/dumbbells)
   - Available equipment
   - Exercise experience
3. Determine intensity based on:
   - Current activity level
   - Exercise history
   - Goal type (diet vs muscle gain)

**Output structure**:
```
exercise: {
  frequency: number, // days per week
  duration: number, // minutes per session
  type: string[], // ["bodyweight", "bands"]
  intensity: "beginner" | "intermediate" | "advanced",
  restrictions: string[], // from PAR-Q
  recommendations: string[]
}
```

### 3.3 Sleep Plan Generation

**Steps**:
1. Calculate ideal sleep duration:
   - Based on age (from user profile)
   - Based on assessment responses
2. Determine sleep window:
   - From bedtime/wake time preferences
   - Suggest optimal timing
3. Generate recommendations:
   - Based on sleep quality issues identified
   - Based on sleep hygiene responses

**Output structure**:
```
sleep: {
  targetHours: number,
  bedTime: string, // "22:00"
  wakeTime: string, // "07:00"
  sleepWindow: number, // hours
  recommendations: string[]
}
```

### 3.4 Mental Health Plan Generation

**Steps**:
1. Determine check-in frequency:
   - Based on motivation level
   - Based on mental health assessment
2. Determine support type:
   - Based on desired support from assessment
   - Based on MBTI (if provided)
   - Based on stress sources
3. Generate recommendations:
   - Based on relaxation methods identified
   - Based on current state

**Output structure**:
```
mentalHealth: {
  checkInFrequency: "daily" | "weekly" | "as_needed",
  supportType: string[],
  recommendations: string[]
}
```

## 🤖 Step 4: AI Integration (If Using AI)

### 4.1 AI Plan Refinement

**If using AI for plan refinement**:
1. Send all collected data to AI service
2. Include:
   - User preferences
   - Lifestyle values
   - Motivation level
   - All assessment responses
3. Get AI-suggested refinements:
   - Personalized recommendations
   - Tone adjustments
   - Additional suggestions

### 4.2 AI Personality Matching

**Customize Habi AI based on**:
- MBTI type
- Lifestyle values
- Communication preferences
- Support type requested

## 💾 Step 5: Plan Storage

### 5.1 Create Plan Document

**Store in Firestore**:
- Path: `users/{userId}/plans/{planId}`
- Set `isActive: true`
- Include all four plan components
- Include metadata:
  - Created timestamp
  - BMR, TDEE values
  - Activity factor used
  - Goal reference

### 5.2 Update User Document

**Update user**:
- Set `onboardingCompleted: true`
- Set `currentPlanId: {planId}`
- Update `lastPlanGenerated: timestamp`

## ✅ Step 6: Plan Validation

### 6.1 Validate Plan Safety

**Check**:
- [ ] Calories not too low (< 1200 for women, < 1500 for men)
- [ ] Exercise plan safe based on PAR-Q
- [ ] Sleep hours reasonable (7-9 hours)
- [ ] All recommendations appropriate

### 6.2 Validate Plan Completeness

**Check**:
- [ ] All four components present
- [ ] All required fields populated
- [ ] Recommendations not empty
- [ ] Calculations match stored values

## 🎯 Step 7: Transition to Plan Display

### 7.1 Navigate to Plan Proposal

**After plan generation**:
1. Show loading state during generation
2. Once complete, navigate to Plan Proposal screen
3. Pass plan data to next screen

### 7.2 Handle Errors

**If generation fails**:
- Show error message
- Allow retry
- Log error for debugging
- Don't navigate away from onboarding

## ✅ Step 8: Testing

### 8.1 Test Scenarios

**Functional tests**:
- [ ] Plan generates with all data
- [ ] Calculations correct
- [ ] All components generated
- [ ] Plan saves to Firestore
- [ ] User document updated
- [ ] Navigation works
- [ ] Error handling works

### 8.2 Edge Cases

**Test**:
- Missing optional data (should still work)
- Extreme values (should validate)
- Network offline (should handle gracefully)
- Generation timeout (should retry or show error)

## ✅ Step 9: Verification Checklist

Before moving to Plan Proposal screen:

**Functionality**:
- [ ] All data validated
- [ ] Calculations accurate
- [ ] All plan components generated
- [ ] Plan saved correctly
- [ ] User state updated
- [ ] Error handling comprehensive

**Safety**:
- [ ] Plan validations pass
- [ ] Safety checks in place
- [ ] No unsafe recommendations

## 📚 Next Steps

Once plan generation is complete:

**Move to**: `14-PLAN-PROPOSAL-SCREEN.md`

**Prerequisites**:
- Plan generated and saved
- All data validated
- Ready to display plan to user

---

**Remember**: Accurate plans require accurate data - validate everything! 📊

