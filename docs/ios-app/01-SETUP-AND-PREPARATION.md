# iOS App Setup and Preparation

## 🎯 Purpose

This document guides you through setting up the development environment, tools, and project structure before starting iOS app development.

## ⏱️ Time Estimate

**3-5 days**

## 📦 Step 1: Install Development Tools

### 1.1 Install Xcode

**What**: Apple's official development environment for iOS

**Steps**:
1. Open Mac App Store
2. Search for "Xcode"
3. Install Xcode 15.0 or newer (latest version recommended)
4. Wait for installation to complete (can take 1-2 hours)
5. Open Xcode and accept license agreement
6. Install additional components when prompted

**Verify**:
- Open Terminal
- Run: `xcodebuild -version`
- Should show Xcode version 15.0 or higher

### 1.2 Install Command Line Tools

**What**: Essential command-line utilities for iOS development

**Steps**:
1. Open Terminal
2. Run: `xcode-select --install`
3. Follow installation prompts
4. Wait for completion

**Verify**:
- Run: `git --version` (should show git version)
- Run: `swift --version` (should show Swift version)

### 1.3 Install CocoaPods

**What**: Dependency manager for iOS projects (manages third-party libraries)

**Steps**:
1. Open Terminal
2. Run: `sudo gem install cocoapods`
3. Enter your Mac password when prompted
4. Wait for installation
5. Run: `pod setup` (downloads repository index)

**Verify**:
- Run: `pod --version`
- Should show CocoaPods version

**Note**: If you get permission errors, you may need to install using: `sudo gem install -n /usr/local/bin cocoapods`

### 1.4 Install SwiftLint (Optional but Recommended)

**What**: Tool to enforce Swift style and conventions

**Steps**:
1. Install Homebrew if not already installed:
   - Run: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
2. Install SwiftLint:
   - Run: `brew install swiftlint`

**Verify**:
- Run: `swiftlint version`

## 🔥 Step 2: Firebase Project Setup

### 2.1 Create Firebase Project

**What**: Set up backend services for the app

**Steps**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Project name: "HabiMate" (or your preferred name)
4. Accept terms and click "Continue"
5. Choose whether to enable Google Analytics (optional)
6. Click "Create project"
7. Wait for project creation (30 seconds to 1 minute)

### 2.2 Add iOS App to Firebase

**Steps**:
1. In Firebase Console, click "Add app" → iOS icon
2. Register app:
   - Bundle ID: `com.yourcompany.habimate` (you'll set this in Xcode)
   - App nickname: "HabiMate iOS"
   - App Store ID: Leave blank for now
3. Click "Register app"
4. Download `GoogleService-Info.plist`
   - **Important**: Keep this file safe - you'll add it to Xcode later
5. Click "Next" through remaining steps (we'll do SDK setup later)

### 2.3 Enable Firebase Services

**In Firebase Console, enable these services**:

1. **Authentication**:
   - Go to Authentication → Get Started
   - Enable Email/Password provider
   - Enable Apple provider (for Sign in with Apple)
   - Click "Save"

2. **Firestore Database**:
   - Go to Firestore Database → Create database
   - Start in test mode (we'll add security rules later)
   - Choose location closest to your users
   - Click "Enable"

3. **Storage**:
   - Go to Storage → Get Started
   - Start in test mode
   - Use default bucket
   - Click "Done"

### 2.4 Configure Security Rules (Later)

**Note**: We'll set up proper security rules in Phase 3. For now, test mode is fine for development.

## 📁 Step 3: Create Xcode Project

### 3.1 Create New Project

**Steps**:
1. Open Xcode
2. File → New → Project
3. Select "iOS" tab
4. Choose "App" template
5. Click "Next"

### 3.2 Configure Project

**Settings**:
- Product Name: `HabiMate`
- Team: Select your Apple Developer account
- Organization Identifier: `com.yourcompany` (or your domain)
- Bundle Identifier: Will auto-fill as `com.yourcompany.HabiMate`
- Interface: **SwiftUI** (recommended) or Storyboard
- Language: **Swift**
- Storage: Core Data → **Don't include** (we use Firestore)
- Include Tests: ✅ **Check this**

Click "Next"

### 3.3 Choose Location

**Steps**:
1. Choose where to save project
2. **Recommended**: Create in project root: `ios-app/` folder
3. Create Git repository: ✅ **Check this**
4. Click "Create"

### 3.4 Verify Project Structure

**You should see**:
- `HabiMate/` folder (main app code)
- `HabiMateTests/` folder (unit tests)
- `HabiMateUITests/` folder (UI tests)
- `HabiMate.xcodeproj` (project file)

## 📱 Step 4: Configure Project Settings

### 4.1 Set Minimum iOS Version

**Steps**:
1. Select project in navigator (top "HabiMate" item)
2. Select "HabiMate" target
3. Go to "General" tab
4. Set "iOS Deployment Target" to **iOS 16.0** or higher
   - This ensures access to modern SwiftUI features

### 4.2 Enable Sign In with Apple

**Steps**:
1. Select "HabiMate" target
2. Go to "Signing & Capabilities" tab
3. Click "+ Capability"
4. Search for and add "Sign In with Apple"
5. This automatically adds required entitlements

### 4.3 Configure Bundle Identifier

**Steps**:
1. Ensure Bundle ID matches Firebase project
2. If different from Firebase, update Firebase Console to match
3. Format: `com.yourcompany.HabiMate`

### 4.4 Add App Icons and Launch Screen

**For MVP**: Use default icons and launch screen
**Later**: Replace with custom designs

## 📦 Step 5: Install Dependencies (CocoaPods)

### 5.1 Create Podfile

**Steps**:
1. Close Xcode
2. Open Terminal
3. Navigate to project directory:
   - `cd /path/to/ios-app/HabiMate`
4. Create Podfile:
   - Run: `pod init`

### 5.2 Configure Podfile

**Edit Podfile** to include:

```ruby
platform :ios, '16.0'

target 'HabiMate' do
  use_frameworks!

  # Firebase
  pod 'Firebase/Auth'
  pod 'Firebase/Firestore'
  pod 'Firebase/Storage'
  pod 'Firebase/Analytics'

  target 'HabiMateTests' do
    inherit! :search_paths
  end
end
```

### 5.3 Install Pods

**Steps**:
1. In Terminal (still in project directory)
2. Run: `pod install`
3. Wait for download and installation (2-5 minutes)
4. You'll see "Pod installation complete!"

### 5.4 Open Workspace (Not Project)

**Important**: From now on, always open `HabiMate.xcworkspace` (NOT `.xcodeproj`)

**Steps**:
1. Close Xcode if open
2. Double-click `HabiMate.xcworkspace`
3. Or run: `open HabiMate.xcworkspace`

## 🔧 Step 6: Add Firebase Configuration

### 6.1 Add GoogleService-Info.plist

**Steps**:
1. In Xcode, right-click on project navigator
2. Select "Add Files to HabiMate..."
3. Navigate to downloaded `GoogleService-Info.plist`
4. **Important**: Check "Copy items if needed"
5. **Important**: Check "HabiMate" target
6. Click "Add"

### 6.2 Verify File Location

**The file should be**:
- In project root (same level as `Info.plist`)
- Visible in Xcode navigator
- Included in "HabiMate" target

## ✅ Step 7: Verification Checklist

Before moving to next phase, verify:

- [ ] Xcode installed and opens correctly
- [ ] Command line tools installed
- [ ] CocoaPods installed and working
- [ ] SwiftLint installed (if using)
- [ ] Firebase project created
- [ ] iOS app added to Firebase
- [ ] GoogleService-Info.plist added to Xcode project
- [ ] Firebase services enabled (Auth, Firestore, Storage)
- [ ] Xcode project created with SwiftUI
- [ ] Podfile created and configured
- [ ] Pods installed successfully
- [ ] Workspace opens without errors
- [ ] Sign In with Apple capability added
- [ ] Minimum iOS version set to 16.0+
- [ ] Bundle identifier configured

## 🐛 Common Issues and Solutions

### Issue: "pod install fails with permission error"
**Solution**: Use `sudo gem install -n /usr/local/bin cocoapods`

### Issue: "GoogleService-Info.plist not found"
**Solution**: 
- Re-download from Firebase Console
- Make sure it's added to the correct target
- Verify file is in project directory

### Issue: "Firebase pods not found after installation"
**Solution**: 
- Make sure you opened `.xcworkspace` not `.xcodeproj`
- Run `pod install` again
- Clean build folder: Product → Clean Build Folder

### Issue: "Sign In with Apple not working"
**Solution**: 
- Capability must be added in Xcode
- Must test on real device (simulator limitations)
- Must have Apple Developer account

## 📚 Next Steps

Once all items in the checklist are complete, move to:
**`02-ARCHITECTURE-SETUP.md`**

---

**Remember**: Proper setup saves time later! Take your time with this phase. 🔧

