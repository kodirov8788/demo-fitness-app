# Web App Setup and Preparation

## 🎯 Purpose

This document guides you through setting up the development environment, tools, and project structure before starting web app development.

## ⏱️ Time Estimate

**2-3 days**

## 📦 Step 1: Install Development Tools

### 1.1 Install Node.js

**What**: JavaScript runtime needed for Next.js

**Steps**:
1. Go to [nodejs.org](https://nodejs.org/)
2. Download LTS (Long Term Support) version
3. Version needed: 18.0 or newer (20.0+ recommended)
4. Run installer
5. Follow installation prompts
6. Restart terminal after installation

**Verify**:
- Open Terminal/Command Prompt
- Run: `node --version`
- Should show version 18.0.0 or higher
- Run: `npm --version`
- Should show npm version

### 1.2 Install Git (if not already installed)

**What**: Version control system

**Steps**:
1. Check if installed: Run `git --version` in terminal
2. If not installed:
   - **Mac**: Install Xcode Command Line Tools: `xcode-select --install`
   - **Windows**: Download from [git-scm.com](https://git-scm.com/)
   - **Linux**: `sudo apt install git` (Ubuntu/Debian)

**Verify**:
- Run: `git --version`
- Should show git version

### 1.3 Install Code Editor

**Recommended**: VS Code or Cursor

**VS Code Setup**:
1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install
3. Install extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features

**Cursor Setup**:
- Similar to VS Code
- Already has AI features built-in

## 🔥 Step 2: Firebase Project Setup

### 2.1 Create Firebase Project

**What**: Set up backend services for the web app

**Steps**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Project name: "HabiMate" (or your preferred name)
4. Accept terms and click "Continue"
5. Choose whether to enable Google Analytics (optional)
6. Click "Create project"
7. Wait for project creation (30 seconds to 1 minute)

### 2.2 Add Web App to Firebase

**Steps**:
1. In Firebase Console, click "Add app" → Web icon (`</>`)
2. Register app:
   - App nickname: "HabiMate Web"
   - Firebase Hosting: Not needed for MVP (optional)
3. Click "Register app"
4. **Copy Firebase configuration object**
   - You'll see a JavaScript object with keys like `apiKey`, `authDomain`, etc.
   - Keep this safe - you'll use it in Next.js app
5. Click "Continue to console"

### 2.3 Enable Firebase Services

**In Firebase Console, enable these services**:

1. **Authentication**:
   - Go to Authentication → Get Started
   - Enable Email/Password provider
   - Enable Google provider (for Google Sign In)
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

## 📁 Step 3: Create Next.js Project

### 3.1 Initialize Next.js Project

**Steps**:
1. Open Terminal/Command Prompt
2. Navigate to where you want project:
   - `cd /path/to/project/root`
3. Create Next.js app:
   - Run: `npx create-next-app@latest web-app --typescript --tailwind --app --no-src-dir --import-alias "@/*"`
   - **Flags explained**:
     - `--typescript`: Use TypeScript
     - `--tailwind`: Include Tailwind CSS
     - `--app`: Use App Router (Next.js 13+)
     - `--no-src-dir`: Keep files in root (simpler)
     - `--import-alias "@/*"`: Use @ for imports
4. Follow prompts:
   - ESLint: Yes
   - Tailwind CSS: Yes (already included)
   - `src/` directory: No (we chose --no-src-dir)
   - App Router: Yes (already included)
   - Import alias: @/* (already set)
5. Wait for installation (2-5 minutes)

### 3.2 Verify Project Structure

**You should see**:
```
web-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

### 3.3 Navigate to Project

**Steps**:
1. In terminal: `cd web-app`
2. Project is ready to use

## 📦 Step 4: Install Dependencies

### 4.1 Install Firebase

**Steps**:
1. In terminal (in web-app directory)
2. Run: `npm install firebase`
3. Wait for installation

### 4.2 Install Additional Dependencies

**For MVP, install**:

```bash
# React Query for data fetching
npm install @tanstack/react-query

# Form handling (optional but recommended)
npm install react-hook-form

# Date handling
npm install date-fns
```

**Run all at once**:
```bash
npm install @tanstack/react-query react-hook-form date-fns
```

### 4.3 Verify Installation

**Check**:
- Open `package.json`
- Should see all installed packages in dependencies
- Run: `npm list` to see installed packages

## 🔧 Step 5: Configure Firebase

### 5.1 Create Environment File

**Steps**:
1. In project root (`web-app/`), create file: `.env.local`
2. This file stores environment variables (not committed to git)

### 5.2 Add Firebase Config

**In `.env.local`, add** (using config from Firebase Console):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important**:
- Prefix all variables with `NEXT_PUBLIC_` (required for client-side access)
- Use values from Firebase Console
- Never commit `.env.local` to git (already in `.gitignore`)

### 5.3 Create Firebase Config File

**Steps**:
1. Create folder: `lib/` (in project root)
2. Create file: `lib/firebase.ts`
3. We'll configure this in Phase 3 (Authentication)

## 🎨 Step 6: Configure Tailwind CSS

### 6.1 Verify Tailwind Setup

**Check**:
- `tailwind.config.ts` should exist
- `app/globals.css` should have Tailwind directives

**Tailwind directives should be in `globals.css`**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6.2 Customize Tailwind (Optional)

**For MVP**:
- Default Tailwind config is sufficient
- Customize colors/fonts later if needed

## ✅ Step 7: Verify Setup

### 7.1 Test Development Server

**Steps**:
1. In terminal (in `web-app/` directory)
2. Run: `npm run dev`
3. Should see: "Ready on http://localhost:3000"
4. Open browser: `http://localhost:3000`
5. Should see Next.js welcome page

**If errors**:
- Check Node.js version (must be 18+)
- Check all dependencies installed
- Try deleting `node_modules` and `package-lock.json`, then `npm install`

### 7.2 Test Build

**Steps**:
1. Stop dev server (Ctrl+C)
2. Run: `npm run build`
3. Should build successfully
4. Run: `npm start` (or `npm run start`)
5. App should run in production mode

**If build fails**:
- Check for TypeScript errors
- Fix any issues before proceeding

## ✅ Step 8: Verification Checklist

Before moving to next phase, verify:

**Development Tools**:
- [ ] Node.js installed (18.0+)
- [ ] npm working correctly
- [ ] Git installed and working
- [ ] Code editor set up

**Project Setup**:
- [ ] Next.js project created
- [ ] Project runs without errors
- [ ] Tailwind CSS working
- [ ] TypeScript configured

**Firebase**:
- [ ] Firebase project created
- [ ] Web app added to Firebase
- [ ] Firebase services enabled (Auth, Firestore, Storage)
- [ ] Environment variables set up
- [ ] `.env.local` file created (not committed)

**Dependencies**:
- [ ] Firebase installed
- [ ] React Query installed
- [ ] Other dependencies installed
- [ ] `package.json` updated

**Testing**:
- [ ] Dev server runs (`npm run dev`)
- [ ] Production build works (`npm run build`)
- [ ] No TypeScript errors
- [ ] No console errors

## 🐛 Common Issues and Solutions

### Issue: "Command not found: npx"
**Solution**: Node.js not installed or not in PATH. Reinstall Node.js.

### Issue: "Port 3000 already in use"
**Solution**: 
- Use different port: `npm run dev -- -p 3001`
- Or stop other process using port 3000

### Issue: "Firebase config not working"
**Solution**:
- Check `.env.local` file exists
- Check all variables have `NEXT_PUBLIC_` prefix
- Check values match Firebase Console
- Restart dev server after changing .env

### Issue: "Module not found"
**Solution**:
- Run `npm install` again
- Check `package.json` has dependency
- Delete `node_modules` and reinstall

### Issue: "TypeScript errors"
**Solution**:
- Check `tsconfig.json` is correct
- Check all imports are correct
- Make sure TypeScript is installed: `npm install -D typescript @types/react @types/node`

## 📚 Next Steps

Once all items in checklist are complete:

**Move to**: `02-ARCHITECTURE-SETUP.md`

---

**Remember**: Good setup prevents problems later! Take time to verify everything works. 🔧

