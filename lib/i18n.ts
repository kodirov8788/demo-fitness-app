// Internationalization support for English and Japanese

export type Language = 'en' | 'ja';

export const translations = {
  en: {
    // Common
    common: {
      phase: 'Phase',
      step: 'Step',
      days: 'days',
      weeks: 'weeks',
      route: 'Route',
      timeEstimate: 'Time Estimate',
      keyFeatures: 'Key Features',
      overview: 'Overview',
      statistics: 'Statistics',
      totalSteps: 'Total Steps',
      developmentPhases: 'Development Phases',
      onboardingSteps: 'Onboarding Steps',
      planDimensions: 'Plan Dimensions',
      successCriteria: 'Success Criteria',
      mvpScope: 'MVP Scope',
      timeline: 'Timeline',
    },
    // Platform names
    platforms: {
      web: 'Web App',
      ios: 'iOS App',
      both: 'Web & iOS Apps',
    },
    // Phase names
    phases: {
      foundation: 'Foundation',
      authentication: 'Authentication',
      onboarding: 'Onboarding Flow',
      planGeneration: 'Plan Generation',
      planProposal: 'Plan Proposal',
      homeScreen: 'Home Screen',
      polish: 'Polish & Launch',
    },
    // Step descriptions (key names match the step IDs)
    steps: {
      setup: {
        title: 'Setup and Preparation',
        description: 'Development environment setup, Firebase configuration, project initialization',
      },
      architecture: {
        title: 'Architecture Setup',
        description: 'Project structure, component organization, state management, service layer',
      },
      auth: {
        title: 'Authentication Process',
        description: 'Email/Password and Google/Apple Sign In, session management, protected routes',
      },
      profile: {
        title: 'User Profile',
        description: 'Collect basic user information (name, gender, date of birth, MBTI)',
      },
      'physical-info': {
        title: 'Physical Information',
        description: 'Collect physical measurements (height, weight, body fat %) for calculations',
      },
      goals: {
        title: 'Goals',
        description: 'Set health goals, target weight, timeline with safety validations',
      },
      'lifestyle-values': {
        title: 'Lifestyle & Values',
        description: 'Understand user values and life themes for Habi AI personalization',
      },
      motivation: {
        title: 'Motivation Assessment',
        description: 'Assess psychological readiness for behavior change',
      },
      exercise: {
        title: 'Exercise Assessment',
        description: 'Exercise preferences, history, and PAR-Q safety questionnaire',
      },
      dietary: {
        title: 'Dietary Assessment',
        description: 'Current eating habits for personalized nutrition plan',
      },
      'mental-health': {
        title: 'Mental Health Assessment',
        description: 'Assess mental wellbeing and support needs',
      },
      sleep: {
        title: 'Sleep Assessment',
        description: 'Analyze sleep quality and habits',
      },
      generate: {
        title: 'Plan Generation Process',
        description: 'Generate comprehensive plan with nutrition, exercise, sleep, and mental health components',
      },
      proposal: {
        title: 'Plan Proposal Screen',
        description: 'Display generated plan, allow adjustments via conversation, final approval',
      },
      home: {
        title: 'Home Screen Implementation',
        description: 'Daily plan display, progress tracking, Habi AI interaction',
      },
      testing: {
        title: 'Testing Strategy',
        description: 'Comprehensive testing including unit, integration, E2E, and user acceptance testing',
      },
      deployment: {
        title: 'Deployment Process',
        description: 'Production deployment, Firebase configuration, domain/App Store setup',
      },
    },
    // MVP scope items
    mvpScope: {
      auth: 'User Authentication',
      authDesc: 'Email/Password + Google/Apple Sign In',
      onboarding: 'Complete Onboarding Flow',
      onboardingDesc: '9 comprehensive steps',
      planGen: 'Plan Generation',
      planGenDesc: 'Personalized health plans',
      home: 'Home Screen',
      homeDesc: '4-dimensional plan view',
      habi: 'Habi AI Integration',
      habiDesc: 'Basic avatar integration',
      data: 'Data Persistence',
      dataDesc: 'Firebase integration',
    },
    // Success criteria
    successCriteria: {
      signIn: 'Users can sign up and log in',
      onboarding: 'Complete onboarding flow works end-to-end',
      plans: 'Personalized plans are generated accurately',
      viewPlan: 'Users can view their plan on home screen',
      persistence: 'All data persists correctly',
      responsive: 'App is responsive (mobile and desktop) / App is tested and ready for App Store submission',
      production: 'App is tested and ready for production deployment',
    },
  },
  ja: {
    // Common
    common: {
      phase: 'フェーズ',
      step: 'ステップ',
      days: '日',
      weeks: '週間',
      route: 'ルート',
      timeEstimate: '見積もり時間',
      keyFeatures: '主要機能',
      overview: '概要',
      statistics: '統計',
      totalSteps: '総ステップ数',
      developmentPhases: '開発フェーズ',
      onboardingSteps: 'オンボーディングステップ',
      planDimensions: 'プラン次元',
      successCriteria: '成功基準',
      mvpScope: 'MVP範囲',
      timeline: 'タイムライン',
    },
    // Platform names
    platforms: {
      web: 'Webアプリ',
      ios: 'iOSアプリ',
      both: 'Web & iOSアプリ',
    },
    // Phase names
    phases: {
      foundation: '基盤構築',
      authentication: '認証',
      onboarding: 'オンボーディングフロー',
      planGeneration: 'プラン生成',
      planProposal: 'プラン提案',
      homeScreen: 'ホーム画面',
      polish: '仕上げとリリース',
    },
    // Step descriptions
    steps: {
      setup: {
        title: 'セットアップと準備',
        description: '開発環境のセットアップ、Firebase設定、プロジェクト初期化',
      },
      architecture: {
        title: 'アーキテクチャ設定',
        description: 'プロジェクト構造、コンポーネント構成、状態管理、サービス層',
      },
      auth: {
        title: '認証プロセス',
        description: 'メール/パスワードとGoogle/Appleサインイン、セッション管理、保護されたルート',
      },
      profile: {
        title: 'ユーザープロフィール',
        description: '基本ユーザー情報の収集（名前、性別、生年月日、MBTI）',
      },
      'physical-info': {
        title: '身体情報',
        description: '計算用の身体測定値の収集（身長、体重、体脂肪率）',
      },
      goals: {
        title: '目標',
        description: '健康目標、目標体重、安全検証を含むタイムラインの設定',
      },
      'lifestyle-values': {
        title: 'ライフスタイルと価値観',
        description: 'Habi AIのパーソナライズのためのユーザーの価値観とライフテーマの理解',
      },
      motivation: {
        title: 'モチベーション評価',
        description: '行動変容のための心理的準備状態の評価',
      },
      exercise: {
        title: '運動評価',
        description: '運動の好み、履歴、PAR-Q安全性質問票',
      },
      dietary: {
        title: '食事評価',
        description: 'パーソナライズされた栄養プランのための現在の食習慣',
      },
      'mental-health': {
        title: 'メンタルヘルス評価',
        description: 'メンタルウェルビーイングとサポートニーズの評価',
      },
      sleep: {
        title: '睡眠評価',
        description: '睡眠の質と習慣の分析',
      },
      generate: {
        title: 'プラン生成プロセス',
        description: '栄養、運動、睡眠、メンタルヘルスのコンポーネントを含む包括的なプランの生成',
      },
      proposal: {
        title: 'プラン提案画面',
        description: '生成されたプランの表示、会話による調整の許可、最終承認',
      },
      home: {
        title: 'ホーム画面の実装',
        description: '日々のプラン表示、進捗追跡、Habi AIとの対話',
      },
      testing: {
        title: 'テスト戦略',
        description: '単体テスト、統合テスト、E2E、ユーザー受入テストを含む包括的なテスト',
      },
      deployment: {
        title: 'デプロイプロセス',
        description: '本番デプロイ、Firebase設定、ドメイン/App Store設定',
      },
    },
    // MVP scope items
    mvpScope: {
      auth: 'ユーザー認証',
      authDesc: 'メール/パスワード + Google/Appleサインイン',
      onboarding: '完全なオンボーディングフロー',
      onboardingDesc: '9つの包括的なステップ',
      planGen: 'プラン生成',
      planGenDesc: 'パーソナライズされた健康プラン',
      home: 'ホーム画面',
      homeDesc: '4次元プランビュー',
      habi: 'Habi AI統合',
      habiDesc: '基本的なアバター統合',
      data: 'データ永続化',
      dataDesc: 'Firebase統合',
    },
    // Success criteria
    successCriteria: {
      signIn: 'ユーザーはサインアップしてログインできます',
      onboarding: '完全なオンボーディングフローがエンドツーエンドで機能します',
      plans: 'パーソナライズされたプランが正確に生成されます',
      viewPlan: 'ユーザーはホーム画面でプランを表示できます',
      persistence: 'すべてのデータが正しく永続化されます',
      responsive: 'アプリはレスポンシブ（モバイルとデスクトップ）/ アプリはApp Store提出の準備ができています',
      production: 'アプリは本番デプロイの準備ができています',
    },
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}

