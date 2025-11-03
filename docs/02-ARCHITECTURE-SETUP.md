# Web App Architecture Setup Process

## 🎯 Purpose

This document guides you through setting up the Next.js App Router architecture structure for the Habi Mate web app. You'll create the folder structure, establish patterns, and plan component organization.

## ⏱️ Time Estimate

**2-3 days**

## 🏗️ Understanding Next.js App Router

### What is App Router?

**Next.js 13+ App Router**:
- File-based routing system
- `app/` folder contains pages and routes
- Each folder = a route segment
- `page.tsx` = the page component
- `layout.tsx` = shared layout wrapper

### Key Concepts

**Route Structure**:
- `app/page.tsx` → `/` (home page)
- `app/login/page.tsx` → `/login`
- `app/onboarding/profile/page.tsx` → `/onboarding/profile`

**Layouts**:
- `app/layout.tsx` → Root layout (wraps all pages)
- `app/onboarding/layout.tsx` → Layout only for onboarding pages

**Server vs Client Components**:
- Default: Server Components (faster, SEO-friendly)
- Add `'use client'` for interactive components

## 📁 Step 1: Plan Folder Structure

### 1.1 Main Structure Design

**Plan your folder hierarchy**:

```
web-app/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Landing/home page
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── onboarding/
│   │   ├── layout.tsx                # Shared onboarding layout
│   │   ├── page.tsx                  # First step (redirects)
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── physical-info/
│   │   │   └── page.tsx
│   │   └── ... (other steps)
│   └── home/
│       ├── layout.tsx
│       └── page.tsx
│
├── components/
│   ├── ui/                           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── onboarding/
│   │   ├── ProgressBar.tsx
│   │   └── StepIndicator.tsx
│   ├── home/
│   │   ├── PlanCard.tsx
│   │   └── ProgressWidget.tsx
│   └── habi/
│       └── HabiAvatar.tsx
│
├── contexts/
│   ├── AuthContext.tsx
│   ├── OnboardingContext.tsx
│   └── PlanContext.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useFirestore.ts
│   ├── useCalculations.ts
│   └── usePlan.ts
│
├── services/
│   ├── firebase/
│   │   ├── auth.ts
│   │   ├── firestore.ts
│   │   └── storage.ts
│   ├── calculations.ts
│   └── ai.ts
│
├── lib/
│   ├── firebase.ts
│   ├── utils.ts
│   └── constants.ts
│
├── types/
│   ├── user.ts
│   ├── plan.ts
│   └── assessment.ts
│
└── public/
    ├── images/
    └── icons/
```

## 📝 Step 2: Create Folder Structure

### 2.1 Create Folders

**Steps**:
1. In project root (`web-app/`), create these folders:
   - `components/`
   - `components/ui/`
   - `components/onboarding/`
   - `components/home/`
   - `components/habi/`
   - `contexts/`
   - `hooks/`
   - `services/`
   - `services/firebase/`
   - `lib/`
   - `types/`

2. **Note**: `app/` and `public/` already exist

### 2.2 Verify Structure

**Check that all folders are created** and match your plan.

## 🎯 Step 3: Plan State Management

### 3.1 State Management Strategy

**Decision**: Use React Context + React Query

**Why**:
- **React Context**: For app-wide state (auth, onboarding flow)
- **React Query**: For server state (Firestore data, caching)

### 3.2 Context Providers Needed

**Plan these contexts**:

1. **AuthContext**:
   - User authentication state
   - Sign in/out methods
   - Current user data

2. **OnboardingContext**:
   - Onboarding step tracking
   - Collected data across steps
   - Navigation between steps

3. **PlanContext**:
   - Current active plan
   - Plan data fetching
   - Plan updates

### 3.3 React Query Setup

**Plan**:
- Wrap app with QueryClientProvider
- Create hooks for common queries
- Cache Firestore data
- Auto-refetch on focus

## 🔌 Step 4: Plan Service Layer

### 4.1 Service Responsibilities

**Each service should handle**:
- One specific domain (Auth, Database, Storage, etc.)
- API/Firebase operations
- Error handling specific to that domain
- Data transformation

### 4.2 Service Structure

**Services in `services/` folder**:
- `firebase/auth.ts` - Authentication operations
- `firebase/firestore.ts` - Database operations
- `firebase/storage.ts` - File storage operations
- `calculations.ts` - Health calculations
- `ai.ts` - AI/chat operations

### 4.3 Service Design Decisions

**Decisions**:
1. **Error Handling**:
   - Return errors or throw?
   - Recommendation: Return Result type or throw, be consistent

2. **Type Safety**:
   - Use TypeScript interfaces for all data
   - Create types in `types/` folder

3. **Caching**:
   - Let React Query handle caching
   - Services just fetch data

## 📊 Step 5: Plan Component Structure

### 5.1 Component Categories

**UI Components** (`components/ui/`):
- Reusable, generic components
- Button, Input, Card, Modal, etc.
- No business logic

**Feature Components** (`components/onboarding/`, `components/home/`):
- Feature-specific components
- Contain business logic
- Use UI components

### 5.2 Component Design Decisions

**Decisions**:
1. **Server vs Client**:
   - Default to Server Components
   - Mark interactive components with `'use client'`

2. **Component Size**:
   - Keep components focused and small
   - Extract complex logic to hooks

3. **Props vs Context**:
   - Props for parent-child communication
   - Context for deeply nested or global state

## 🔄 Step 6: Plan Routing Strategy

### 6.1 Route Structure

**Main routes**:
- `/` - Landing page (redirects based on auth)
- `/login` - Login page
- `/signup` - Sign up page
- `/onboarding/*` - Onboarding flow
- `/home` - Main dashboard

### 6.2 Protected Routes

**Strategy**:
- Create `ProtectedRoute` component
- Wrap protected pages
- Redirect to login if not authenticated

### 6.3 Route Guards

**Flow**:
```
User visits /home
    ↓
Check authentication
    ↓
┌──────────────┬──────────────┐
│ Authenticated?│ Not authenticated?│
│              │              │
│ Check onboarding│ Redirect to login│
│              │              │
│ ┌─────────┬────┐            │
│ │Complete?│Incomplete?│            │
│ │        │            │            │
│ │Show Home│Redirect to│            │
│ │        │Onboarding│            │
│ └─────────┴────┘            │
└──────────────┴──────────────┘
```

## 🎨 Step 7: Plan Styling Strategy

### 7.1 Tailwind CSS

**Already set up** - use Tailwind for styling

**Approach**:
- Utility-first styling
- Create component classes if needed
- Use Tailwind config for custom values

### 7.2 Design System

**Plan**:
- Define color palette (in Tailwind config)
- Define typography scale
- Define spacing system (already in Tailwind)
- Define component styles

### 7.3 Responsive Design

**Strategy**:
- Mobile-first approach
- Use Tailwind breakpoints
- Test on multiple screen sizes

## 🧩 Step 8: Create Placeholder Files

### 8.1 Create Base Files

**Create these placeholder files** (empty implementations):

1. **lib/firebase.ts**
   - Firebase initialization
   - Export auth, db, storage

2. **contexts/AuthContext.tsx**
   - Auth context structure
   - Basic provider

3. **contexts/OnboardingContext.tsx**
   - Onboarding context structure
   - Basic provider

4. **components/ui/Button.tsx**
   - Button component structure

5. **components/ui/Input.tsx**
   - Input component structure

### 8.2 Why Placeholders?

**Benefits**:
- Establishes structure early
- Makes dependencies clear
- Prevents "where does this go?" moments
- Encourages proper organization

## ✅ Step 9: Verification Checklist

Before moving to authentication, verify:

**Structure**:
- [ ] All folders created
- [ ] Folder structure matches plan
- [ ] Placeholder files created

**Planning**:
- [ ] Routing strategy documented
- [ ] State management strategy decided
- [ ] Service responsibilities defined
- [ ] Component structure planned

**Configuration**:
- [ ] Next.js configured correctly
- [ ] Tailwind CSS working
- [ ] TypeScript configured
- [ ] Environment variables set up

## 🎯 Step 10: Architecture Principles

### 10.1 Key Principles

**To follow throughout development**:

1. **Component Composition**: Build complex UIs from simple components
2. **Single Responsibility**: Each component/service does one thing
3. **Type Safety**: Use TypeScript strictly
4. **Server First**: Use Server Components when possible
5. **Client Only When Needed**: Add `'use client'` only for interactivity

### 10.2 Code Organization Rules

**Rules to follow**:
- Components should be "dumb" when possible (just display)
- Business logic in services or hooks
- State in contexts or React Query
- Types in separate files
- Keep components small and focused

## 📚 Next Steps

Once architecture is planned and structure is in place:

**Move to**: `03-AUTHENTICATION-PROCESS.md`

**Prerequisites**:
- Folder structure created
- Base components planned
- Routing strategy documented
- State management approach decided

---

**Remember**: Good architecture makes everything else easier! Plan properly now. 🏗️

