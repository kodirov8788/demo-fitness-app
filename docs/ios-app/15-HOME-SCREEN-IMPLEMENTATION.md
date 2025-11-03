# Home Screen Implementation

## 🎯 Purpose

This document guides you through implementing the main home screen where users see their daily plan, track progress, and interact with Habi AI.

## ⏱️ Time Estimate

**2-3 weeks**

## 📋 Overview

**Screen Position**: Main screen after onboarding and plan approval

**Purpose**: 
- Display daily plan (all 4 dimensions)
- Show progress tracking
- Provide Habi AI interaction
- Central hub for daily use

## 🎨 Step 1: Understand UI Design

### 1.1 Screen Layout (from design docs)

**Components**:
1. **Header**
   - User greeting (with name)
   - Date display
   - Habi avatar (always visible)

2. **Progress Summary**
   - Overall progress indicator
   - Weekly/monthly stats (optional for MVP)

3. **Today's Plan Section**
   - Nutrition card (daily calories, macro split)
   - Exercise card (today's workout)
   - Sleep card (target hours, bedtime reminder)
   - Mental Health card (check-in prompt)

4. **Quick Actions**
   - "Check In" button
   - "View Full Plan" button
   - "Chat with Habi" button

5. **Habi Message Area**
   - Daily message/motivation
   - Contextual tips
   - Encouragement

### 1.2 Design Philosophy

**Key principles**:
- Daily focus (not overwhelming)
- Clear priorities
- Easy navigation
- Habi always available
- Progress visible but not intrusive

## 📊 Step 2: Daily Plan Display

### 2.1 Nutrition Card

**Display**:
- Today's calorie target
- Macro breakdown (visual - pie chart or bars)
- Meals for today
- Progress: Calories consumed / target
- Remaining calories

**Data Source**:
- From active plan
- Real-time: User's logged meals (if logging feature exists in MVP)

**Interaction**:
- Tap to see meal suggestions
- Tap to log meals (if feature included)

### 2.2 Exercise Card

**Display**:
- Today's workout (if workout day)
- Workout type and duration
- Rest day indicator (if rest day)
- Progress: Workouts completed this week

**Data Source**:
- From active plan (weekly schedule)
- Current day determines if workout day

**Interaction**:
- Tap to see workout details
- Tap to mark workout complete (if tracking)

### 2.3 Sleep Card

**Display**:
- Target sleep hours
- Bedtime reminder
- Wake time
- Last night's sleep (if tracking)

**Data Source**:
- From active plan
- Integration with HealthKit (optional for MVP)

**Interaction**:
- Tap to set sleep reminder
- Tap to log sleep (if tracking)

### 2.4 Mental Health Card

**Display**:
- Check-in reminder
- Last check-in date
- Encouragement message

**Data Source**:
- From active plan (check-in frequency)
- Last check-in timestamp

**Interaction**:
- Tap to start check-in
- Tap to chat with Habi

## 📈 Step 3: Progress Tracking

### 3.1 What to Track (MVP)

**Minimum tracking**:
- Plan adherence (days following plan)
- Weight changes (if user logs)
- Overall completion rate

**Future (not MVP)**:
- Detailed metrics per dimension
- Charts and graphs
- Historical trends

### 3.2 Progress Display

**Visualization**:
- Progress bar or percentage
- Simple indicator (no complex charts for MVP)
- Week/month summary (optional)

**Update Frequency**:
- Real-time as user completes tasks
- Or daily update

## 🤖 Step 4: Habi AI Integration

### 4.1 Daily Messages

**Message types**:
- Morning greeting
- Daily motivation
- Tips based on plan
- Encouragement
- Reminders

**Personalization**:
- Use user's name
- Reference their goals
- Match their personality
- Respond to progress

### 4.2 Chat Interface

**Quick chat**:
- Floating button or dedicated area
- Opens conversation view
- Habi responds to questions
- Provides support

**Chat Topics** (MVP):
- Plan questions
- Encouragement
- Tips
- Progress check-ins

### 4.3 Habi Avatar

**Visual Design**:
- Friendly, approachable character
- Simple animations
- Reflects mood/personality

**Animations**:
- Idle animation
- Speaking animation
- Celebrating (on progress)
- Thinking (processing)

## 📱 Step 5: Navigation Integration

### 5.1 Navigation Structure

**From Home Screen, users can navigate to**:
- Full Plan View (all details)
- Settings (user profile, preferences)
- Progress History (if tracking)
- Habi Chat (dedicated conversation)

**Navigation Pattern**:
- Use TabBar (if multiple main screens) or
- Use NavigationStack with navigation links

### 5.2 Deep Linking

**Consider** (not required for MVP):
- Notification taps → specific screen
- Widget taps → specific section
- External links → specific feature

## 💾 Step 6: Data Loading

### 6.1 On Screen Load

**Load**:
1. User's active plan from Firestore
2. Today's plan details
3. Progress data
4. Habi's daily message
5. Last check-in data

**Optimization**:
- Cache plan data (don't reload every time)
- Load progress data in background
- Show cached data immediately, update when fresh data loads

### 6.2 Real-time Updates

**Update triggers**:
- User completes task → Update progress
- User logs meal → Update nutrition
- User completes workout → Update exercise
- Time-based reminders → Update display

## 🔔 Step 7: Notifications (Optional for MVP)

### 7.1 Notification Types

**If implementing**:
- Meal reminders
- Workout reminders
- Sleep reminders
- Check-in prompts

**MVP Decision**:
- Basic notifications or full-featured?
- Recommendation: Basic notifications for MVP

### 7.2 Notification Setup

**Steps**:
1. Request notification permissions
2. Schedule recurring notifications
3. Allow user to customize
4. Handle notification taps

## ✅ Step 8: Testing

### 8.1 Test Scenarios

**Functional tests**:
- [ ] Home screen loads correctly
- [ ] All cards display correct data
- [ ] Progress updates correctly
- [ ] Habi messages display
- [ ] Navigation works
- [ ] Data loads from Firestore
- [ ] Real-time updates work
- [ ] Error handling works

### 8.2 User Experience Tests

**Test**:
- [ ] Screen is not overwhelming
- [ ] Information is clear
- [ ] Navigation is intuitive
- [ ] Habi interaction feels natural
- [ ] Progress is motivating

## ✅ Step 9: Verification Checklist

Before considering MVP complete:

**Functionality**:
- [ ] Home screen displays correctly
- [ ] All plan dimensions visible
- [ ] Progress tracking works
- [ ] Habi integration works
- [ ] Navigation works
- [ ] Data persistence works
- [ ] Error handling comprehensive

**User Experience**:
- [ ] Screen is welcoming
- [ ] Information hierarchy clear
- [ ] Actions are obvious
- [ ] Habi feels helpful

## 📚 Next Steps

Once Home Screen is complete:

**Move to**: `16-TESTING-STRATEGY.md`

**Prerequisites**:
- All core features working
- Ready for comprehensive testing
- Preparing for App Store submission

---

**Remember**: This is where users spend most of their time - make it delightful! 🏠

