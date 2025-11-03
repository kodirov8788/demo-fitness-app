# iOS Architecture Setup Process

## 🎯 Purpose

This document guides you through setting up the MVVM-C architecture structure for the Habi Mate iOS app. You'll create the folder structure, establish patterns, and plan component organization.

## ⏱️ Time Estimate

**3-5 days**

## 🏗️ Understanding MVVM-C

### What is MVVM-C?

**MVVM-C** stands for:

- **M**odel - Data structures and business logic
- **V**iew - User interface (SwiftUI views)
- **V**iew**M**odel - Connects View and Model, handles user actions
- **C**oordinator - Manages navigation flow

### Why This Architecture?

**Benefits**:

- **Separation of concerns**: Each component has one responsibility
- **Testability**: ViewModels can be tested independently
- **Maintainability**: Changes are isolated to specific layers
- **Reusability**: ViewModels can be reused across views
- **Clear navigation**: Coordinators handle all screen transitions

### How Data Flows

```
User Interaction (View)
    ↓
ViewModel receives action
    ↓
ViewModel updates Model
    ↓
Model changes trigger ViewModel updates
    ↓
ViewModel updates View (@Published properties)
    ↓
View automatically refreshes (SwiftUI reactivity)
    ↓
Coordinator handles navigation (if needed)
```

## 📁 Step 1: Plan Folder Structure

### 1.1 Main Structure Design

**Plan your folder hierarchy**:

```
HabiMate/
├── App/
│   ├── HabiMateApp.swift          # App entry point
│   └── AppDelegate.swift          # (if needed)
│
├── Models/
│   ├── User.swift
│   ├── PhysicalInfo.swift
│   ├── Goal.swift
│   ├── Plan.swift
│   └── Assessment.swift
│
├── Views/
│   ├── Auth/
│   │   ├── LoginView.swift
│   │   └── SignUpView.swift
│   ├── Onboarding/
│   │   ├── UserProfileView.swift
│   │   ├── PhysicalInfoView.swift
│   │   └── ... (9 total onboarding views)
│   ├── Home/
│   │   ├── HomeView.swift
│   │   └── Components/
│   └── Plan/
│       ├── PlanProposalView.swift
│       └── PlanDetailView.swift
│
├── ViewModels/
│   ├── BaseViewModel.swift        # Protocol/base class
│   ├── AuthViewModel.swift
│   ├── UserProfileViewModel.swift
│   └── ... (one per view)
│
├── Coordinators/
│   ├── AppCoordinator.swift      # Root coordinator
│   ├── AuthCoordinator.swift
│   ├── OnboardingCoordinator.swift
│   └── MainCoordinator.swift
│
├── Services/
│   ├── AuthService.swift
│   ├── FirestoreService.swift
│   ├── StorageService.swift
│   ├── CalculationService.swift
│   └── AIService.swift
│
├── Utils/
│   ├── Extensions/
│   ├── Constants.swift
│   └── Helpers.swift
│
└── Resources/
    ├── Assets.xcassets
    └── GoogleService-Info.plist
```

## 📝 Step 2: Create Folder Structure in Xcode

### 2.1 Create Groups

**Steps**:

1. In Xcode, right-click on "HabiMate" folder (blue icon)
2. Select "New Group" for each main folder:
   - App
   - Models
   - Views
   - ViewModels
   - Coordinators
   - Services
   - Utils
   - Resources

### 2.2 Organize Subfolders

**Under Views, create subgroups**:

- Auth
- Onboarding
- Home
- Plan

**Under Services, no subgroups needed** (flat structure is fine)

**Under Utils, create subgroup**:

- Extensions

### 2.3 Verify Structure

**Check that**:

- All groups are created (yellow folder icons)
- Structure matches your plan
- Main groups are at top level
- Subgroups are properly nested

## 🎯 Step 3: Plan Base Components

### 3.1 Base ViewModel Protocol

**Purpose**: Common interface for all ViewModels

**Define**:

- Protocol name: `BaseViewModel`
- Properties: `isLoading`, `errorMessage`
- Methods: Error handling helpers

**Why**: Ensures consistency across all ViewModels

### 3.2 Coordinator Protocol

**Purpose**: Standard interface for navigation

**Define**:

- Protocol name: `Coordinator`
- Methods: `start()`, `finish()`
- Navigation methods specific to flow

**Why**: Allows type-safe navigation and testing

### 3.3 App Coordinator

**Purpose**: Root-level navigation manager

**Responsibilities**:

- Decide which flow to show (Auth vs Main App)
- Handle top-level navigation
- Manage child coordinators lifecycle

**Decisions to make**:

- How to check authentication state
- How to transition between flows
- How to handle app lifecycle events

## 🔄 Step 4: Plan Navigation Flow

### 4.1 App Launch Flow

**Decision points**:

1. When app launches:

   - Check if user is authenticated
   - If yes → Show main app
   - If no → Show authentication screen

2. After authentication:
   - Check if onboarding complete
   - If yes → Show home screen
   - If no → Show onboarding flow

### 4.2 Onboarding Flow

**Flow sequence**:

1. User Profile
2. Physical Info
3. Goals
4. Lifestyle Values
5. Motivation
6. Exercise
7. Dietary
8. Mental Health
9. Sleep
10. Plan Proposal

**Navigation decisions**:

- Can users go back to previous steps? (Yes)
- Can users skip steps? (No - all required for MVP)
- How to save progress? (After each step)
- What if user exits mid-flow? (Save as draft)

### 4.3 Main App Flow

**After onboarding complete**:

- Home Screen (default)
- Plan Details (when user taps plan)
- Settings (later, not MVP)
- Profile (later, not MVP)

## 🔌 Step 5: Plan Service Layer

### 5.1 Service Responsibilities

**Each service should handle**:

- One specific domain (Auth, Database, Storage, etc.)
- Network/database operations
- Error handling specific to that domain
- Data transformation

### 5.2 Service Interfaces

**Decision**: Use protocols for services

**Why**:

- Easy to mock for testing
- Easy to swap implementations
- Clear contracts

**Plan protocols for**:

- AuthServiceProtocol
- FirestoreServiceProtocol
- StorageServiceProtocol
- CalculationServiceProtocol

### 5.3 Service Dependencies

**Map dependencies**:

- ViewModels depend on Services
- Services are independent (no cross-dependencies)
- Services don't depend on ViewModels or Views

## 📊 Step 6: Plan Data Models

### 6.1 Model Structure

**Each model should**:

- Represent one entity (User, Plan, etc.)
- Be a struct (immutable is preferred)
- Have Codable conformance (for Firestore)
- Include validation logic

### 6.2 Model Relationships

**Plan relationships**:

- User has many PhysicalInfo records (history)
- User has one active Goal
- User has one active Plan
- Plan contains Nutrition, Exercise, Sleep, MentalHealth sub-plans

### 6.3 Model Location

**Where models live**:

- In `Models/` folder
- One file per model (for clarity)
- Can group related models if needed

## 🧪 Step 7: Plan Testing Strategy

### 7.1 What to Test

**ViewModel tests**:

- Business logic
- Data transformations
- Error handling

**Service tests**:

- API interactions (mocked)
- Data persistence
- Error scenarios

**UI tests** (later):

- Critical user flows
- Onboarding completion
- Plan generation

### 7.2 Test Organization

**Structure**:

- `HabiMateTests/` mirrors main app structure
- One test file per ViewModel
- One test file per Service

## 📝 Step 8: Create Placeholder Files

### 8.1 Create Base Files

**Create these placeholder files** (empty implementations):

1. **App/HabiMateApp.swift**

   - App entry point
   - Initialize AppCoordinator

2. **ViewModels/BaseViewModel.swift**

   - Protocol definition
   - Basic error handling

3. **Coordinators/AppCoordinator.swift**

   - Root coordinator
   - Basic flow switching

4. **Services/AuthService.swift**

   - Service protocol and implementation
   - Basic structure

5. **Models/User.swift**
   - User data structure
   - Basic properties

### 8.2 Why Placeholders?

**Benefits**:

- Establishes structure early
- Makes dependencies clear
- Prevents "where does this go?" moments
- Encourages proper organization

## ✅ Step 9: Verification Checklist

Before moving to authentication, verify:

**Structure**:

- [ ] All folders/groups created in Xcode
- [ ] Folder structure matches plan
- [ ] Subfolders properly organized

**Planning**:

- [ ] Navigation flow documented
- [ ] Service responsibilities defined
- [ ] Model relationships mapped
- [ ] Testing strategy planned

**Files**:

- [ ] Base ViewModel protocol created
- [ ] Base Coordinator protocol created
- [ ] App Coordinator created
- [ ] Placeholder services created
- [ ] Placeholder models created

**Documentation**:

- [ ] Architecture decisions documented
- [ ] Navigation flows documented
- [ ] Dependencies mapped

## 🎯 Step 10: Architecture Principles

### 10.1 Key Principles

**To follow throughout development**:

1. **Single Responsibility**: Each class/struct does one thing
2. **Dependency Injection**: Pass dependencies, don't create them
3. **Protocol-Oriented**: Use protocols for abstraction
4. **Immutable Models**: Prefer structs over classes for models
5. **Reactive UI**: Use @Published properties for state management

### 10.2 Code Organization Rules

**Rules to follow**:

- Views should be "dumb" (just display)
- ViewModels contain all logic
- Services handle data operations
- Coordinators handle navigation only
- Models are pure data structures

## 📚 Next Steps

Once architecture is planned and structure is in place:

**Move to**: `03-AUTHENTICATION-PROCESS.md`

**Prerequisites**:

- Folder structure created
- Base components planned
- Navigation flow documented

---

**Remember**: Good architecture makes everything else easier! Take time to plan properly. 🏗️
