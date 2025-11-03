# Onboarding: Remaining Steps (7-12)

## 🎯 Purpose

This document provides a summary and process guide for onboarding steps 7-12. Each follows a similar pattern to the previous steps but with different data collection focuses.

## 📋 Steps Overview

### Step 7: Lifestyle & Values

**Purpose**: Understand user's values and life themes to personalize Habi AI personality

**Key Data**:
- Life themes (multiple selection with priorities)
- Ideal self description (3 words)
- Core values (multiple selection)
- Current state
- Needed support types

**Implementation Pattern**:
- Follow same page/hook structure
- Multi-select components with priority ordering
- Save to `users/{userId}/lifestyleValues/{docId}`
- Used to customize Habi AI communication style

**Route**: `/onboarding/lifestyle-values`

**Time Estimate**: 2-3 days

---

### Step 8: Motivation Assessment

**Purpose**: Assess psychological readiness for behavior change

**Key Data**:
- Desire to change (5-point scale slider)
- Past failure experiences (Yes/No + text area)
- Success reasons (free text)
- Anxieties (free text)

**Implementation Pattern**:
- Slider for motivation level
- Toggle + textarea for past failures
- Free text inputs for open-ended questions
- Save to `users/{userId}/assessments/motivation`
- Used to determine intervention intensity

**Route**: `/onboarding/motivation`

**Time Estimate**: 2 days

---

### Step 9: Exercise Assessment

**Purpose**: Understand exercise preferences, history, and safety

**Key Data**:
- Daily activity level (1-5 scale)
- Exercise frequency
- Exercise types (multiple selection)
- Preferences (bodyweight/bands/dumbbells)
- Available time
- Location preference
- **PAR-Q Safety Questionnaire** (7-13 questions - critical!)

**Implementation Pattern**:
- Multiple input types (scales, selects, text)
- Important: PAR-Q questions must be answered
- Save to `users/{userId}/assessments/exercise`
- Used to:
  - Calculate Activity Factor for TDEE
  - Generate exercise plan
  - Set safety restrictions

**Route**: `/onboarding/exercise`

**Time Estimate**: 3-4 days (includes PAR-Q validation)

**Special Notes**:
- PAR-Q responses may restrict exercise recommendations
- If user answers "Yes" to certain questions, show medical disclaimer
- Store activity level for TDEE calculation

---

### Step 10: Dietary Assessment

**Purpose**: Understand current eating habits for personalized nutrition plan

**Key Data**:
- Current eating habits (meals, timing, snacking)
- Nutrition balance estimation (PFC ratios)
- Cooking skills and frequency
- Equipment available
- Allergies/dislikes
- Preferred cuisines

**Implementation Pattern**:
- Multiple sections (current habits, nutrition, cooking)
- Free text for allergies/dislikes
- Multi-select for preferences
- Save to `users/{userId}/assessments/dietary`
- Used to determine:
  - PFC mode (Diet/Muscle Gain/Maintenance)
  - Recipe complexity level
  - Meal plan preferences

**Route**: `/onboarding/dietary`

**Time Estimate**: 3-4 days

**Special Notes**:
- Allergies are critical - must be prominently displayed in plan
- Cooking skill level affects recipe recommendations

---

### Step 11: Mental Health Assessment

**Purpose**: Assess mental wellbeing and support needs

**Key Data**:
- Recent mood
- Stress sources (multiple selection)
- Relaxation methods
- Sleep/appetite changes (Yes/No + details)
- Social support availability
- Self-encouragement methods
- Desired AI support type

**Implementation Pattern**:
- Mix of selects and free text
- Sensitive topics - use empathetic language
- Save to `users/{userId}/assessments/mentalHealth`
- Used to:
  - Customize Habi AI support style
  - Determine check-in frequency
  - Identify intervention urgency

**Route**: `/onboarding/mental-health`

**Time Estimate**: 2-3 days

**Special Notes**:
- Handle responses with care and empathy
- Some responses may require flagging for follow-up
- Privacy is critical for this section

---

### Step 12: Sleep Assessment

**Purpose**: Analyze sleep quality and habits

**Key Data**:
- Average sleep duration
- Bedtime and wake time
- Sleep quality indicators
- Nighttime awakenings
- Environment factors
- Sleep hygiene habits
- Morning feelings

**Implementation Pattern**:
- Time pickers for sleep schedule
- Slider for sleep duration
- Toggles for habits
- Save to `users/{userId}/assessments/sleep`
- Used to:
  - Calculate sleep window
  - Generate sleep recommendations
  - Set sleep goals

**Route**: `/onboarding/sleep`

**Time Estimate**: 2-3 days

**Final Step**: After sleep assessment, onboarding is complete and plan generation begins.

---

## 🔄 Common Implementation Pattern

### For Each Step:

1. **Read Design Document**
   - Refer to `../docs2/design/XX-screen-name.md`
   - Understand data requirements
   - Note Habi messages

2. **Create TypeScript Types**
   - Define types in `types/` folder
   - Make interfaces for data structures
   - Include validation types

3. **Create Custom Hook**
   - Follow pattern from previous steps
   - Add @Published properties (or useState)
   - Implement validation
   - Handle Firestore save/load

4. **Create Page Component**
   - Follow Next.js App Router patterns
   - Mark as `'use client'` for interactivity
   - Include Habi messages
   - Add progress indicator
   - Handle navigation

5. **Integrate with OnboardingContext**
   - Update context on step completion
   - Load data from context if returning
   - Save to Firestore via context

6. **Test Thoroughly**
   - Test all inputs
   - Test validation
   - Test Firestore save/load
   - Test navigation
   - Test responsive design

## 📝 Quick Reference

**Onboarding Steps Order**:
1. User Profile (04)
2. Physical Info (05)
3. Goals (06)
4. Lifestyle Values (07)
5. Motivation (08)
6. Exercise (09)
7. Dietary (10)
8. Mental Health (11)
9. Sleep (12)
10. Plan Proposal (14)

**Total Onboarding Time**: ~20-30 days for all 9 steps

---

**Next**: Once all onboarding steps complete, move to Plan Generation.

