# Plan Proposal Screen

## 🎯 Purpose

This document guides you through implementing the plan proposal screen where users review their generated plan, see summaries, and can adjust via conversation with Habi AI.

## ⏱️ Time Estimate

**2-3 weeks** (includes conversation/adjustment flow)

## 📋 Overview

**Screen Position**: After plan generation completes

**Route**: `/onboarding/plan-proposal` or `/plan-proposal`

**Purpose**: 
- Display generated plan (4 dimensions)
- Allow user to review summaries
- Enable conversation-based adjustments
- Final approval before proceeding to home screen

## 🎨 Step 1: Understand UI Design

### 1.1 Screen Layout (from design docs)

**Components**:
1. **Header**
   - Title: "Your Personalized Plan is Ready"
   - Subtitle or Habi message

2. **Loading State** (initial)
   - Show while generating plan
   - Habi "thinking" animation

3. **Plan Cards Display**
   - Four cards: Nutrition, Exercise, Sleep, Mental Health
   - Each card shows summary
   - Click to expand/see details

4. **Action Buttons**
   - "Start with This Plan" (primary)
   - "Adjust with Habi" (secondary)

5. **Conversation View** (if adjusting)
   - Chat interface
   - Habi avatar/messages
   - User input field

### 1.2 Design Philosophy

**Key concept**: "AI with you, not for you"
- Don't force plan on user
- Make adjustment easy
- Encourage conversation
- Make it collaborative

## 📱 Step 2: Create Plan Display Components

### 2.1 Plan Card Component

**File**: `components/home/PlanCard.tsx`

**Each card should display**:
- **Title**: Dimension name (Nutrition, Exercise, etc.)
- **Summary**: Key information
  - Nutrition: Calories, macro split
  - Exercise: Frequency, duration, type
  - Sleep: Hours, schedule
  - Mental Health: Check-in frequency, support type
- **Icon/Visual**: Representing dimension
- **Expand Button**: Click to see full details

### 2.2 Card Design Decisions

**Decisions**:
1. **Card Style**:
   - Flat cards or elevated/shadowed?
   - Recommendation: Elevated for depth (use Tailwind shadow)

2. **Information Density**:
   - Summary only or show more?
   - Recommendation: Summary with expand option

3. **Visual Hierarchy**:
   - Most important info first
   - Clear typography
   - Color coding by dimension (optional)

### 2.3 Detail View

**When card expanded, show**:
- Full recommendations list
- Rationale (why these suggestions)
- Timeline/pace information
- Related tips

## 💬 Step 3: Conversation Interface

### 3.1 Conversation Components

**If user clicks "Adjust with Habi"**:
1. **Conversation View** appears (modal or separate page)
2. **Habi Avatar** visible (animated)
3. **Message History**:
   - Habi greeting
   - Plan summary
   - Invitation to adjust
4. **Input Field**:
   - Text input
   - Send button
   - Voice input option (optional for MVP)

### 3.2 Conversation Flow

**Typical flow**:
1. Habi: "Here's your plan! Want to adjust anything?"
2. User: "Can I eat more carbs?"
3. Habi: "Sure! Let's adjust. How many more grams?"
4. User: "50g more"
5. Habi: "Done! Here's your updated plan."
6. User: "Perfect!"
7. Habi: "Great! Ready to start?"

### 3.3 Adjustment Processing

**When user requests adjustment**:
1. Parse user intent (natural language)
2. Identify what to adjust (which dimension, what aspect)
3. Validate adjustment (safety checks)
4. Recalculate if needed
5. Update plan
6. Show updated summary
7. Ask for confirmation

### 3.4 Adjustment Limitations

**Safety constraints**:
- Can't adjust below minimum calories
- Can't adjust exercise if PAR-Q restricts
- Can't adjust sleep to unhealthy hours
- Must maintain safety validations

## 🤖 Step 4: Habi AI Integration

### 4.1 AI Personality

**Customize based on**:
- MBTI (from user profile)
- Lifestyle values
- Communication preferences

**Examples**:
- INFP user → More empathetic, encouraging tone
- ESTJ user → Direct, numbers-focused tone

### 4.2 Message Generation

**Message types**:
- Greetings
- Plan summaries
- Adjustment confirmations
- Encouragement
- Clarifications

**Considerations**:
- Use user's name
- Match personality
- Be supportive
- Be clear and concise

### 4.3 Habi Avatar

**Visual Design**:
- Friendly, approachable character
- Simple animations (CSS or React animation library)
- Reflects mood/personality

**Animations**:
- Idle animation
- Speaking animation
- Celebrating (on progress)
- Thinking (processing)

## 🔄 Step 5: Plan Update Flow

### 5.1 Update Process

**When adjustment approved**:
1. Validate adjustment
2. Update plan document in Firestore
3. Recalculate if necessary
4. Update UI immediately (optimistic update)
5. Save to Firestore
6. Show confirmation

### 5.2 Update History

**Track changes** (for MVP, optional):
- Log major adjustments
- Store in `users/{userId}/planAdjustments/`
- Include timestamp, change type, before/after values

## ✅ Step 6: Approval Flow

### 6.1 Final Approval

**When user clicks "Start with This Plan"**:
1. Verify plan is valid
2. Mark plan as active in Firestore
3. Update user onboarding status
4. Navigate to Home Screen
5. Set up daily plan tracking

### 6.2 Pre-approval Validation

**Before allowing approval**:
- [ ] Plan is complete (all 4 dimensions)
- [ ] Plan is safe (all validations pass)
- [ ] User has reviewed plan (optional: track view time)

## 🎨 Step 7: UI/UX Implementation

### 7.1 Animations

**Loading state**:
- Habi "thinking" animation
- Smooth transitions (use CSS transitions or Framer Motion)

**Card interactions**:
- Click to expand (smooth animation)
- Visual feedback on interactions

### 7.2 Responsive Design

**Considerations**:
- Different screen sizes (mobile, tablet, desktop)
- Cards stack on mobile
- Conversation view full-screen on mobile, modal on desktop
- Touch-friendly interactions

### 7.3 Error States

**Handle errors**:
- Network errors during adjustment
- Invalid adjustment requests
- Plan generation errors

## ✅ Step 8: Testing

### 8.1 Test Scenarios

**Functional tests**:
- [ ] Plan displays correctly
- [ ] All cards show correct data
- [ ] Cards expand/collapse
- [ ] Conversation interface works
- [ ] Adjustments process correctly
- [ ] Plan updates save
- [ ] Approval navigates correctly
- [ ] Error handling works

### 8.2 User Experience Tests

**Test**:
- [ ] Flow feels natural
- [ ] Adjustments intuitive
- [ ] Habi messages helpful
- [ ] Loading states clear
- [ ] Error messages clear
- [ ] Responsive design works

## ✅ Step 9: Verification Checklist

Before moving to Home Screen:

**Functionality**:
- [ ] Plan displays correctly
- [ ] Conversation works
- [ ] Adjustments save
- [ ] Approval flow works
- [ ] Navigation works
- [ ] Error handling comprehensive

**User Experience**:
- [ ] Flow is intuitive
- [ ] Habi personality matches user
- [ ] Adjustments feel collaborative
- [ ] Plan feels personalized

## 📚 Next Steps

Once Plan Proposal is complete:

**Move to**: `15-HOME-SCREEN-IMPLEMENTATION.md`

**Prerequisites**:
- Plan approved by user
- Plan active in Firestore
- User onboarding complete
- Ready to show daily plan

---

**Remember**: This is where the plan comes to life - make it exciting and collaborative! 🎯

