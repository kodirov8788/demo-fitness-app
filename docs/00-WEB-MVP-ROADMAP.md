# Web App MVP Development Roadmap

## 🎯 Purpose

This folder contains detailed, step-by-step process guides for building the Habi Mate web app from scratch to MVP (Minimum Viable Product). These documents focus on **process, planning, and implementation steps** - not code examples.

## 📋 MVP Scope

The MVP includes:

- ✅ User authentication (Email/Password + Google Sign In)
- ✅ Complete onboarding flow (9 steps)
- ✅ Plan generation and display
- ✅ Home screen with 4-dimensional plan view
- ✅ Basic Habi AI avatar integration
- ✅ Data persistence with Firebase
- ✅ Responsive design (mobile and desktop)

## 📚 Document Structure

Follow these documents **in order**:

### Phase 1: Foundation

1. **01-SETUP-AND-PREPARATION.md**

   - Development environment setup
   - Tools and dependencies
   - Firebase configuration
   - Next.js project initialization

### Phase 2: Architecture

2. **02-ARCHITECTURE-SETUP.md**

   - Next.js App Router structure
   - Component organization
   - Context and state management
   - Service layer organization

### Phase 3: Authentication

3. **03-AUTHENTICATION-PROCESS.md**

   - Firebase Auth integration planning
   - Login/Sign up flow design
   - Session management strategy
   - User profile creation workflow

### Phase 4: Onboarding Screens

4. **04-ONBOARDING-USER-PROFILE.md**
5. **05-ONBOARDING-PHYSICAL-INFO.md**
6. **06-ONBOARDING-GOALS.md**
7. **07-ONBOARDING-LIFESTYLE-VALUES.md**
8. **08-ONBOARDING-MOTIVATION.md**
9. **09-ONBOARDING-EXERCISE.md**
10. **10-ONBOARDING-DIETARY.md**
11. **11-ONBOARDING-MENTAL-HEALTH.md**
12. **12-ONBOARDING-SLEEP.md**

### Phase 5: Plan Generation

13. **13-PLAN-GENERATION-PROCESS.md**

- Data collection validation
- Calculation integration
- Plan creation workflow
- Safety validations

### Phase 6: Core Features

14. **14-PLAN-PROPOSAL-SCREEN.md**

- Plan display design
- Adjustment conversation flow
- Approval process

15. **15-HOME-SCREEN-IMPLEMENTATION.md**

- Dashboard layout
- Plan display (4 dimensions)
- Progress tracking
- Habi AI integration

### Phase 7: Polish & Launch

16. **16-TESTING-STRATEGY.md**

- Unit testing approach
- Integration testing
- E2E testing
- User acceptance testing

17. **17-DEPLOYMENT-PROCESS.md**

- Vercel/Netlify preparation
- Build configuration
- Environment setup
- Release strategy

## ⏱️ Estimated Timeline

- **Phase 1-2** (Foundation): 1-2 weeks
- **Phase 3** (Authentication): 1 week
- **Phase 4** (Onboarding): 4-5 weeks (9 screens)
- **Phase 5** (Plan Generation): 1-2 weeks
- **Phase 6** (Core Features): 2-3 weeks
- **Phase 7** (Polish & Launch): 2-3 weeks

**Total MVP Timeline**: 11-16 weeks (3-4 months)

_Note: Timeline assumes 1-2 web developers working full-time_

## 🎯 Success Criteria

MVP is complete when:

- ✅ Users can sign up and log in
- ✅ Complete onboarding flow works end-to-end
- ✅ Personalized plans are generated accurately
- ✅ Users can view their plan on home screen
- ✅ All data persists correctly
- ✅ App is responsive (mobile and desktop)
- ✅ App is tested and ready for production deployment

## 📖 How to Use These Documents

1. **Read sequentially**: Each document builds on the previous one
2. **Complete each phase**: Don't move forward until phase is complete
3. **Document decisions**: Keep notes of architectural decisions
4. **Test frequently**: Test after each major component
5. **Reference design docs**: Always refer back to `docs2/design/` for UI/UX details

## 🔗 Related Documentation

- **Design Documents**: `../docs2/design/` - UI/UX specifications
- **Requirements**: `../docs2/requirements/` - Business logic and calculations
- **Shared Concepts**: `../` - Database, calculations, etc.

## ✅ Prerequisites

Before starting:

- ✅ Read `../00-IMPLEMENTATION-OVERVIEW.md`
- ✅ Read `../01-PHASE-1-FOUNDATION.md`
- ✅ Read `../02-PHASE-2-DATABASE.md`
- ✅ Read `../04-PHASE-4-CALCULATIONS.md`
- ✅ Have design documents (`../docs2/design/`) available
- ✅ Understand Next.js App Router concept
- ✅ Familiar with React and TypeScript basics

---

**Start with**: `01-SETUP-AND-PREPARATION.md`

