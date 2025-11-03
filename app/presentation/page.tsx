'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Shield, 
  User, 
  Target, 
  Zap, 
  Home,
  TestTube,
  Rocket,
  Settings,
  Activity,
  Heart,
  Moon,
  Brain,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { translations, type Language } from '@/lib/i18n';

interface Step {
  id: string;
  titleEn: string;
  titleJa: string;
  route?: string;
  timeEstimate: string;
  descriptionEn: string;
  descriptionJa: string;
  keyFeaturesEn: string[];
  keyFeaturesJa: string[];
  icon: React.ComponentType<{ className?: string }>;
  platform: 'web' | 'ios' | 'both';
}

interface Phase {
  id: string;
  nameEn: string;
  nameJa: string;
  descriptionEn: string;
  descriptionJa: string;
  timeEstimate: string;
  steps: Step[];
  color: string;
}

const webPhases: Phase[] = [
  {
    id: 'foundation',
    nameEn: 'Foundation',
    nameJa: '基盤構築',
    descriptionEn: 'Project setup, environment configuration, and architecture planning',
    descriptionJa: 'プロジェクト設定、環境設定、アーキテクチャ計画',
    timeEstimate: '1-2 weeks',
    color: 'bg-blue-500',
    steps: [
      {
        id: 'setup',
        titleEn: 'Setup and Preparation',
        titleJa: 'セットアップと準備',
        timeEstimate: '2-3 days',
        descriptionEn: 'Development environment setup, Firebase configuration, Next.js project initialization',
        descriptionJa: '開発環境のセットアップ、Firebase設定、Next.jsプロジェクト初期化',
        keyFeaturesEn: ['Node.js & Git setup', 'Firebase project creation', 'Next.js project initialization', 'Dependencies installation'],
        keyFeaturesJa: ['Node.js & Gitセットアップ', 'Firebaseプロジェクト作成', 'Next.jsプロジェクト初期化', '依存関係のインストール'],
        icon: Settings,
        platform: 'web',
      },
      {
        id: 'architecture',
        titleEn: 'Architecture Setup',
        titleJa: 'アーキテクチャ設定',
        timeEstimate: '2-3 days',
        descriptionEn: 'Next.js App Router structure, component organization, state management, service layer',
        descriptionJa: 'Next.js App Router構造、コンポーネント構成、状態管理、サービス層',
        keyFeaturesEn: ['Folder structure planning', 'Context providers setup', 'Service layer design', 'Routing strategy'],
        keyFeaturesJa: ['フォルダ構造の計画', 'Contextプロバイダーのセットアップ', 'サービス層の設計', 'ルーティング戦略'],
        icon: FileText,
        platform: 'web',
      },
    ],
  },
  {
    id: 'authentication',
    nameEn: 'Authentication',
    nameJa: '認証',
    descriptionEn: 'User authentication system with Firebase Auth',
    descriptionJa: 'Firebase Authを使用したユーザー認証システム',
    timeEstimate: '1 week',
    color: 'bg-green-500',
    steps: [
      {
        id: 'auth',
        titleEn: 'Authentication Process',
        titleJa: '認証プロセス',
        route: '/login',
        timeEstimate: '1 week',
        descriptionEn: 'Email/Password and Google Sign In, session management, protected routes',
        descriptionJa: 'メール/パスワードとGoogleサインイン、セッション管理、保護されたルート',
        keyFeaturesEn: ['Email/Password auth', 'Google Sign In', 'Session persistence', 'Protected routes', 'User profile creation'],
        keyFeaturesJa: ['メール/パスワード認証', 'Googleサインイン', 'セッション永続化', '保護されたルート', 'ユーザープロフィール作成'],
        icon: Shield,
        platform: 'web',
      },
    ],
  },
  {
    id: 'onboarding',
    nameEn: 'Onboarding Flow',
    nameJa: 'オンボーディングフロー',
    descriptionEn: '9-step onboarding process to collect user information',
    descriptionJa: 'ユーザー情報を収集する9ステップのオンボーディングプロセス',
    timeEstimate: '4-5 weeks',
    color: 'bg-purple-500',
    steps: [
      {
        id: 'profile',
        titleEn: 'User Profile',
        titleJa: 'ユーザープロフィール',
        route: '/onboarding/profile',
        timeEstimate: '2-3 days',
        descriptionEn: 'Collect basic user information (name, gender, date of birth, MBTI)',
        descriptionJa: '基本ユーザー情報の収集（名前、性別、生年月日、MBTI）',
        keyFeaturesEn: ['Name & gender', 'Date of birth', 'MBTI type', 'BMR calculation setup'],
        keyFeaturesJa: ['名前と性別', '生年月日', 'MBTIタイプ', 'BMR計算のセットアップ'],
        icon: User,
        platform: 'both',
      },
      {
        id: 'physical-info',
        titleEn: 'Physical Information',
        titleJa: '身体情報',
        route: '/onboarding/physical-info',
        timeEstimate: '2-3 days',
        descriptionEn: 'Collect physical measurements (height, weight, body fat %) for calculations',
        descriptionJa: '計算用の身体測定値の収集（身長、体重、体脂肪率）',
        keyFeaturesEn: ['Height & weight', 'Body fat percentage', 'BMI calculation', 'Real-time feedback'],
        keyFeaturesJa: ['身長と体重', '体脂肪率', 'BMI計算', 'リアルタイムフィードバック'],
        icon: Activity,
        platform: 'both',
      },
      {
        id: 'goals',
        titleEn: 'Goals',
        titleJa: '目標',
        route: '/onboarding/goals',
        timeEstimate: '3-5 days',
        descriptionEn: 'Set health goals, target weight, timeline with safety validations',
        descriptionJa: '健康目標、目標体重、安全検証を含むタイムラインの設定',
        keyFeaturesEn: ['Target weight', 'Goal purpose', 'Timeline (1-12 months)', 'Safety validations', 'Ideal body image upload'],
        keyFeaturesJa: ['目標体重', '目標目的', 'タイムライン（1-12ヶ月）', '安全検証', '理想的な体の画像アップロード'],
        icon: Target,
        platform: 'both',
      },
      {
        id: 'lifestyle-values',
        titleEn: 'Lifestyle & Values',
        titleJa: 'ライフスタイルと価値観',
        route: '/onboarding/lifestyle-values',
        timeEstimate: '2-3 days',
        descriptionEn: 'Understand user values and life themes for Habi AI personalization',
        descriptionJa: 'Habi AIのパーソナライズのためのユーザーの価値観とライフテーマの理解',
        keyFeaturesEn: ['Life themes', 'Ideal self description', 'Core values', 'Support types'],
        keyFeaturesJa: ['ライフテーマ', '理想の自分についての説明', 'コアバリュー', 'サポートタイプ'],
        icon: Heart,
        platform: 'both',
      },
      {
        id: 'motivation',
        titleEn: 'Motivation Assessment',
        titleJa: 'モチベーション評価',
        route: '/onboarding/motivation',
        timeEstimate: '2 days',
        descriptionEn: 'Assess psychological readiness for behavior change',
        descriptionJa: '行動変容のための心理的準備状態の評価',
        keyFeaturesEn: ['Desire to change (1-5 scale)', 'Past failure experiences', 'Success reasons', 'Anxieties'],
        keyFeaturesJa: ['変化への欲求（1-5スケール）', '過去の失敗経験', '成功の理由', '不安'],
        icon: Zap,
        platform: 'both',
      },
      {
        id: 'exercise',
        titleEn: 'Exercise Assessment',
        titleJa: '運動評価',
        route: '/onboarding/exercise',
        timeEstimate: '3-4 days',
        descriptionEn: 'Exercise preferences, history, and PAR-Q safety questionnaire',
        descriptionJa: '運動の好み、履歴、PAR-Q安全性質問票',
        keyFeaturesEn: ['Activity level', 'Exercise frequency', 'Exercise types', 'PAR-Q safety questionnaire', 'TDEE calculation'],
        keyFeaturesJa: ['活動レベル', '運動頻度', '運動タイプ', 'PAR-Q安全性質問票', 'TDEE計算'],
        icon: Activity,
        platform: 'both',
      },
      {
        id: 'dietary',
        titleEn: 'Dietary Assessment',
        titleJa: '食事評価',
        route: '/onboarding/dietary',
        timeEstimate: '3-4 days',
        descriptionEn: 'Current eating habits for personalized nutrition plan',
        descriptionJa: 'パーソナライズされた栄養プランのための現在の食習慣',
        keyFeaturesEn: ['Meals & timing', 'Nutrition balance', 'Cooking skills', 'Allergies/dislikes', 'Preferred cuisines'],
        keyFeaturesJa: ['食事とタイミング', '栄養バランス', '料理スキル', 'アレルギー/嫌いなもの', '好みの料理'],
        icon: Heart,
        platform: 'both',
      },
      {
        id: 'mental-health',
        titleEn: 'Mental Health Assessment',
        titleJa: 'メンタルヘルス評価',
        route: '/onboarding/mental-health',
        timeEstimate: '2-3 days',
        descriptionEn: 'Assess mental wellbeing and support needs',
        descriptionJa: 'メンタルウェルビーイングとサポートニーズの評価',
        keyFeaturesEn: ['Recent mood', 'Stress sources', 'Relaxation methods', 'Social support', 'AI support type'],
        keyFeaturesJa: ['最近の気分', 'ストレスの原因', 'リラックス方法', '社会的サポート', 'AIサポートタイプ'],
        icon: Brain,
        platform: 'both',
      },
      {
        id: 'sleep',
        titleEn: 'Sleep Assessment',
        titleJa: '睡眠評価',
        route: '/onboarding/sleep',
        timeEstimate: '2-3 days',
        descriptionEn: 'Analyze sleep quality and habits',
        descriptionJa: '睡眠の質と習慣の分析',
        keyFeaturesEn: ['Sleep duration', 'Bedtime & wake time', 'Sleep quality', 'Environment factors', 'Sleep hygiene'],
        keyFeaturesJa: ['睡眠時間', '就寝時間と起床時間', '睡眠の質', '環境要因', '睡眠衛生'],
        icon: Moon,
        platform: 'both',
      },
    ],
  },
  {
    id: 'plan-generation',
    nameEn: 'Plan Generation',
    nameJa: 'プラン生成',
    descriptionEn: 'Generate personalized health plans based on collected data',
    descriptionJa: '収集されたデータに基づいてパーソナライズされた健康プランを生成',
    timeEstimate: '1-2 weeks',
    color: 'bg-orange-500',
    steps: [
      {
        id: 'generate',
        titleEn: 'Plan Generation Process',
        titleJa: 'プラン生成プロセス',
        timeEstimate: '1-2 weeks',
        descriptionEn: 'Generate comprehensive plan with nutrition, exercise, sleep, and mental health components',
        descriptionJa: '栄養、運動、睡眠、メンタルヘルスのコンポーネントを含む包括的なプランの生成',
        keyFeaturesEn: ['BMR/TDEE calculations', 'Macro calculations', 'Exercise plan generation', 'Sleep plan', 'Mental health plan'],
        keyFeaturesJa: ['BMR/TDEE計算', 'マクロ計算', '運動プラン生成', '睡眠プラン', 'メンタルヘルスプラン'],
        icon: Zap,
        platform: 'both',
      },
    ],
  },
  {
    id: 'plan-proposal',
    nameEn: 'Plan Proposal',
    nameJa: 'プラン提案',
    descriptionEn: 'Plan display and adjustment through conversation with Habi AI',
    descriptionJa: 'Habi AIとの会話によるプラン表示と調整',
    timeEstimate: '2-3 weeks',
    color: 'bg-pink-500',
    steps: [
      {
        id: 'proposal',
        titleEn: 'Plan Proposal Screen',
        titleJa: 'プラン提案画面',
        timeEstimate: '2-3 weeks',
        descriptionEn: 'Display generated plan, allow adjustments via conversation, final approval',
        descriptionJa: '生成されたプランの表示、会話による調整の許可、最終承認',
        keyFeaturesEn: ['4-dimension plan display', 'Conversation interface', 'Plan adjustments', 'Habi AI integration', 'Approval flow'],
        keyFeaturesJa: ['4次元プラン表示', '会話インターフェース', 'プラン調整', 'Habi AI統合', '承認フロー'],
        icon: Target,
        platform: 'both',
      },
    ],
  },
  {
    id: 'home',
    nameEn: 'Home Screen',
    nameJa: 'ホーム画面',
    descriptionEn: 'Main dashboard with daily plan and progress tracking',
    descriptionJa: '日々のプランと進捗追跡を含むメインダッシュボード',
    timeEstimate: '2-3 weeks',
    color: 'bg-indigo-500',
    steps: [
      {
        id: 'home',
        titleEn: 'Home Screen Implementation',
        titleJa: 'ホーム画面の実装',
        route: '/home',
        timeEstimate: '2-3 weeks',
        descriptionEn: 'Daily plan display, progress tracking, Habi AI interaction',
        descriptionJa: '日々のプラン表示、進捗追跡、Habi AIとの対話',
        keyFeaturesEn: ['Daily plan cards', 'Progress tracking', 'Habi daily messages', 'Quick actions', 'Chat interface'],
        keyFeaturesJa: ['日々のプランカード', '進捗追跡', 'Habiの日々のメッセージ', 'クイックアクション', 'チャットインターフェース'],
        icon: Home,
        platform: 'both',
      },
    ],
  },
  {
    id: 'polish',
    nameEn: 'Polish & Launch',
    nameJa: '仕上げとリリース',
    descriptionEn: 'Testing, deployment, and production launch',
    descriptionJa: 'テスト、デプロイ、本番リリース',
    timeEstimate: '2-3 weeks',
    color: 'bg-teal-500',
    steps: [
      {
        id: 'testing',
        titleEn: 'Testing Strategy',
        titleJa: 'テスト戦略',
        timeEstimate: '2-3 weeks',
        descriptionEn: 'Comprehensive testing including unit, integration, E2E, and user acceptance testing',
        descriptionJa: '単体テスト、統合テスト、E2E、ユーザー受入テストを含む包括的なテスト',
        keyFeaturesEn: ['Unit tests', 'Integration tests', 'E2E tests', 'User acceptance testing', 'Security testing', 'Performance testing'],
        keyFeaturesJa: ['単体テスト', '統合テスト', 'E2Eテスト', 'ユーザー受入テスト', 'セキュリティテスト', 'パフォーマンステスト'],
        icon: TestTube,
        platform: 'both',
      },
      {
        id: 'deployment',
        titleEn: 'Deployment Process',
        titleJa: 'デプロイプロセス',
        timeEstimate: '3-5 days',
        descriptionEn: 'Production deployment to Vercel/App Store, Firebase configuration, domain/App Store setup',
        descriptionJa: 'Vercel/App Storeへの本番デプロイ、Firebase設定、ドメイン/App Store設定',
        keyFeaturesEn: ['Vercel/App Store deployment', 'Environment variables', 'Firebase security rules', 'Domain/App Store setup', 'Analytics & monitoring'],
        keyFeaturesJa: ['Vercel/App Storeデプロイ', '環境変数', 'Firebaseセキュリティルール', 'ドメイン/App Store設定', '分析とモニタリング'],
        icon: Rocket,
        platform: 'both',
      },
    ],
  },
];

const iosPhases: Phase[] = [
  {
    id: 'foundation',
    nameEn: 'Foundation',
    nameJa: '基盤構築',
    descriptionEn: 'Project setup, environment configuration, and MVVM-C architecture planning',
    descriptionJa: 'プロジェクト設定、環境設定、MVVM-Cアーキテクチャ計画',
    timeEstimate: '1-2 weeks',
    color: 'bg-blue-500',
    steps: [
      {
        id: 'setup',
        titleEn: 'Setup and Preparation',
        titleJa: 'セットアップと準備',
        timeEstimate: '3-5 days',
        descriptionEn: 'Xcode setup, CocoaPods installation, Firebase configuration, project initialization',
        descriptionJa: 'Xcodeセットアップ、CocoaPodsインストール、Firebase設定、プロジェクト初期化',
        keyFeaturesEn: ['Xcode installation', 'CocoaPods setup', 'Firebase project creation', 'SwiftUI project initialization', 'Sign In with Apple capability'],
        keyFeaturesJa: ['Xcodeインストール', 'CocoaPodsセットアップ', 'Firebaseプロジェクト作成', 'SwiftUIプロジェクト初期化', 'Sign In with Apple機能'],
        icon: Settings,
        platform: 'ios',
      },
      {
        id: 'architecture',
        titleEn: 'Architecture Setup',
        titleJa: 'アーキテクチャ設定',
        timeEstimate: '3-5 days',
        descriptionEn: 'MVVM-C architecture structure, folder organization, Coordinator pattern, service layer',
        descriptionJa: 'MVVM-Cアーキテクチャ構造、フォルダ構成、Coordinatorパターン、サービス層',
        keyFeaturesEn: ['MVVM-C structure', 'Coordinator pattern', 'Service protocols', 'Model organization', 'Navigation strategy'],
        keyFeaturesJa: ['MVVM-C構造', 'Coordinatorパターン', 'サービスプロトコル', 'モデル構成', 'ナビゲーション戦略'],
        icon: FileText,
        platform: 'ios',
      },
    ],
  },
  {
    id: 'authentication',
    nameEn: 'Authentication',
    nameJa: '認証',
    descriptionEn: 'User authentication system with Firebase Auth',
    descriptionJa: 'Firebase Authを使用したユーザー認証システム',
    timeEstimate: '1 week',
    color: 'bg-green-500',
    steps: [
      {
        id: 'auth',
        titleEn: 'Authentication Process',
        titleJa: '認証プロセス',
        timeEstimate: '1 week',
        descriptionEn: 'Email/Password and Apple Sign In, session management, Coordinator navigation',
        descriptionJa: 'メール/パスワードとAppleサインイン、セッション管理、Coordinatorナビゲーション',
        keyFeaturesEn: ['Email/Password auth', 'Apple Sign In', 'Session persistence', 'Coordinator navigation', 'User profile creation'],
        keyFeaturesJa: ['メール/パスワード認証', 'Appleサインイン', 'セッション永続化', 'Coordinatorナビゲーション', 'ユーザープロフィール作成'],
        icon: Shield,
        platform: 'ios',
      },
    ],
  },
];

// Combine iOS-specific phases with shared phases (onboarding, plan generation, etc.)
const allIosPhases: Phase[] = [
  ...iosPhases,
  ...webPhases.slice(2), // Use shared phases from onboarding onwards
];

export default function PresentationPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedPlatform, setSelectedPlatform] = useState<'web' | 'ios' | 'both'>('both');

  const phases = selectedPlatform === 'web' ? webPhases : selectedPlatform === 'ios' ? allIosPhases : webPhases;
  const totalSteps = phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const totalTime = language === 'en' ? '11-16 weeks (3-4 months)' : '11-16週間（3-4ヶ月）';

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };

  const getStepTitle = (step: Step) => language === 'en' ? step.titleEn : step.titleJa;
  const getStepDescription = (step: Step) => language === 'en' ? step.descriptionEn : step.descriptionJa;
  const getStepFeatures = (step: Step) => language === 'en' ? step.keyFeaturesEn : step.keyFeaturesJa;
  const getPhaseName = (phase: Phase) => language === 'en' ? phase.nameEn : phase.nameJa;
  const getPhaseDescription = (phase: Phase) => language === 'en' ? phase.descriptionEn : phase.descriptionJa;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {language === 'en' ? 'HabiMate MVP Development' : 'HabiMate MVP開発'}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                {language === 'en' 
                  ? 'Complete Development Roadmap & Process Documentation' 
                  : '完全な開発ロードマップとプロセス文書'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <div className="flex items-center gap-2 border rounded-md p-1">
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                  className="h-8"
                >
                  EN
                </Button>
                <Button
                  variant={language === 'ja' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLanguage('ja')}
                  className="h-8"
                >
                  JA
                </Button>
              </div>
              {/* Platform Filter */}
              <div className="flex items-center gap-2 border rounded-md p-1">
                <Button
                  variant={selectedPlatform === 'both' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPlatform('both')}
                  className="h-8"
                  title={language === 'en' ? 'Both Platforms' : '両プラットフォーム'}
                >
                  <Globe className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedPlatform === 'web' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPlatform('web')}
                  className="h-8"
                  title={language === 'en' ? 'Web Only' : 'Webのみ'}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedPlatform === 'ios' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPlatform('ios')}
                  className="h-8"
                  title={language === 'en' ? 'iOS Only' : 'iOSのみ'}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Clock className="mr-1 h-3 w-3" />
                {totalTime}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Overview Stats */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">{phases.length}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Development Phases' : '開発フェーズ'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">{totalSteps}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Total Steps' : '総ステップ数'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">9</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Onboarding Steps' : 'オンボーディングステップ'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Plan Dimensions' : 'プラン次元'}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Simple To-Do List */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {language === 'en' ? '📋 MVP To-Do Lists' : '📋 MVP タスクリスト'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Simple checklists of all steps needed to complete the MVP for each platform' 
              : '各プラットフォームのMVPを完了するために必要なすべてのステップのシンプルなチェックリスト'}
          </p>
        </div>

        {/* Web App To-Do List */}
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <div className="flex items-center gap-3">
              <Monitor className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl text-blue-900">
                {language === 'en' ? '🌐 Web App To-Do List' : '🌐 Webアプリ タスクリスト'}
              </CardTitle>
            </div>
            <CardDescription className="text-blue-700">
              {language === 'en' 
                ? 'Checklist for web app development' 
                : 'Webアプリ開発のチェックリスト'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Phase 1: Foundation */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-600">
                  {language === 'en' ? 'Phase 1: Get Started' : 'フェーズ1: 開始準備'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Set up Node.js and development tools',
                    'Create Firebase project and configure authentication',
                    'Initialize Next.js project with TypeScript',
                    'Organize project structure and folders',
                  ] : [
                    'Node.jsと開発ツールをセットアップ',
                    'Firebaseプロジェクトを作成し、認証を設定',
                    'TypeScriptでNext.jsプロジェクトを初期化',
                    'プロジェクト構造とフォルダを整理',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 2: Authentication */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-600">
                  {language === 'en' ? 'Phase 2: User Login' : 'フェーズ2: ユーザーログイン'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Create login page with email and password',
                    'Add Google Sign In',
                    'Set up user accounts and profiles',
                    'Make sure users stay logged in',
                  ] : [
                    'メールとパスワードでログインページを作成',
                    'Googleサインインを追加',
                    'ユーザーアカウントとプロフィールを設定',
                    'ユーザーがログインしたままになるようにする',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 3: Onboarding */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-purple-600">
                  {language === 'en' ? 'Phase 3: Collect User Information (9 Steps)' : 'フェーズ3: ユーザー情報収集（9ステップ）'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Step 1: Ask for name, gender, and birthday',
                    'Step 2: Get height, weight, and body measurements',
                    'Step 3: Ask about their health goals and target weight',
                    'Step 4: Learn about their lifestyle and values',
                    'Step 5: Understand their motivation and readiness',
                    'Step 6: Collect exercise preferences and safety information',
                    'Step 7: Ask about eating habits and food preferences',
                    'Step 8: Understand mental health and support needs',
                    'Step 9: Get information about their sleep habits',
                  ] : [
                    'ステップ1: 名前、性別、誕生日を尋ねる',
                    'ステップ2: 身長、体重、身体測定値を取得',
                    'ステップ3: 健康目標と目標体重について尋ねる',
                    'ステップ4: ライフスタイルと価値観を理解する',
                    'ステップ5: モチベーションと準備状態を理解する',
                    'ステップ6: 運動の好みと安全情報を収集',
                    'ステップ7: 食習慣と食べ物の好みについて尋ねる',
                    'ステップ8: メンタルヘルスとサポートニーズを理解する',
                    'ステップ9: 睡眠習慣に関する情報を取得',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 4: Plan Generation */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-orange-600">
                  {language === 'en' ? 'Phase 4: Create Personalized Plan' : 'フェーズ4: パーソナライズされたプランを作成'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Calculate calories and nutrition needs',
                    'Create exercise plan based on preferences',
                    'Set up sleep schedule and recommendations',
                    'Plan mental health check-ins and support',
                    'Combine everything into one personalized plan',
                  ] : [
                    'カロリーと栄養ニーズを計算',
                    '好みに基づいて運動プランを作成',
                    '睡眠スケジュールと推奨事項を設定',
                    'メンタルヘルスのチェックインとサポートを計画',
                    'すべてを1つのパーソナライズされたプランに統合',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 5: Plan Proposal */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-pink-600">
                  {language === 'en' ? 'Phase 5: Review and Adjust Plan' : 'フェーズ5: プランを確認して調整'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Show the user their personalized plan',
                    'Let them chat with Habi AI to make changes',
                    'Allow adjustments to calories, exercise, sleep, etc.',
                    'Get user approval before starting',
                  ] : [
                    'ユーザーにパーソナライズされたプランを表示',
                    'Habi AIとチャットして変更を許可',
                    'カロリー、運動、睡眠などを調整可能にする',
                    '開始前にユーザーの承認を得る',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 6: Home Screen */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-indigo-600">
                  {language === 'en' ? 'Phase 6: Build Main Dashboard' : 'フェーズ6: メインダッシュボードを構築'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Create home screen with daily plan',
                    'Show nutrition, exercise, sleep, and mental health cards',
                    'Add progress tracking',
                    'Make Habi AI messages visible',
                    'Add quick action buttons',
                  ] : [
                    '日々のプランを含むホーム画面を作成',
                    '栄養、運動、睡眠、メンタルヘルスカードを表示',
                    '進捗追跡を追加',
                    'Habi AIメッセージを表示可能にする',
                    'クイックアクションボタンを追加',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 7: Testing & Launch */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-teal-600">
                  {language === 'en' ? 'Phase 7: Test and Launch' : 'フェーズ7: テストとリリース'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Test all features work correctly',
                    'Test on different devices and screen sizes',
                    'Fix any bugs or issues found',
                    'Deploy to production on Vercel',
                    'Make sure everything works for real users',
                  ] : [
                    'すべての機能が正しく動作することをテスト',
                    '異なるデバイスと画面サイズでテスト',
                    '見つかったバグや問題を修正',
                    'Vercelで本番環境にデプロイ',
                    '実際のユーザーにとってすべてが機能することを確認',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* iOS App To-Do List */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader className="bg-purple-50">
            <div className="flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-purple-600" />
              <CardTitle className="text-2xl text-purple-900">
                {language === 'en' ? '📱 iOS App To-Do List' : '📱 iOSアプリ タスクリスト'}
              </CardTitle>
            </div>
            <CardDescription className="text-purple-700">
              {language === 'en' 
                ? 'Checklist for iOS app development' 
                : 'iOSアプリ開発のチェックリスト'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Phase 1: Foundation */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-600">
                  {language === 'en' ? 'Phase 1: Get Started' : 'フェーズ1: 開始準備'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Set up Xcode and development tools',
                    'Create Firebase project and configure authentication',
                    'Initialize Xcode project with SwiftUI',
                    'Set up CocoaPods for dependencies',
                    'Organize project with MVVM-C architecture',
                  ] : [
                    'Xcodeと開発ツールをセットアップ',
                    'Firebaseプロジェクトを作成し、認証を設定',
                    'SwiftUIでXcodeプロジェクトを初期化',
                    '依存関係のためにCocoaPodsをセットアップ',
                    'MVVM-Cアーキテクチャでプロジェクトを整理',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 2: Authentication */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-600">
                  {language === 'en' ? 'Phase 2: User Login' : 'フェーズ2: ユーザーログイン'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Create login screen with email and password',
                    'Add Apple Sign In',
                    'Set up user accounts and profiles',
                    'Make sure users stay logged in',
                  ] : [
                    'メールとパスワードでログイン画面を作成',
                    'Appleサインインを追加',
                    'ユーザーアカウントとプロフィールを設定',
                    'ユーザーがログインしたままになるようにする',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 3: Onboarding */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-purple-600">
                  {language === 'en' ? 'Phase 3: Collect User Information (9 Steps)' : 'フェーズ3: ユーザー情報収集（9ステップ）'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Step 1: Ask for name, gender, and birthday',
                    'Step 2: Get height, weight, and body measurements',
                    'Step 3: Ask about their health goals and target weight',
                    'Step 4: Learn about their lifestyle and values',
                    'Step 5: Understand their motivation and readiness',
                    'Step 6: Collect exercise preferences and safety information',
                    'Step 7: Ask about eating habits and food preferences',
                    'Step 8: Understand mental health and support needs',
                    'Step 9: Get information about their sleep habits',
                  ] : [
                    'ステップ1: 名前、性別、誕生日を尋ねる',
                    'ステップ2: 身長、体重、身体測定値を取得',
                    'ステップ3: 健康目標と目標体重について尋ねる',
                    'ステップ4: ライフスタイルと価値観を理解する',
                    'ステップ5: モチベーションと準備状態を理解する',
                    'ステップ6: 運動の好みと安全情報を収集',
                    'ステップ7: 食習慣と食べ物の好みについて尋ねる',
                    'ステップ8: メンタルヘルスとサポートニーズを理解する',
                    'ステップ9: 睡眠習慣に関する情報を取得',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 4: Plan Generation */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-orange-600">
                  {language === 'en' ? 'Phase 4: Create Personalized Plan' : 'フェーズ4: パーソナライズされたプランを作成'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Calculate calories and nutrition needs',
                    'Create exercise plan based on preferences',
                    'Set up sleep schedule and recommendations',
                    'Plan mental health check-ins and support',
                    'Combine everything into one personalized plan',
                  ] : [
                    'カロリーと栄養ニーズを計算',
                    '好みに基づいて運動プランを作成',
                    '睡眠スケジュールと推奨事項を設定',
                    'メンタルヘルスのチェックインとサポートを計画',
                    'すべてを1つのパーソナライズされたプランに統合',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 5: Plan Proposal */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-pink-600">
                  {language === 'en' ? 'Phase 5: Review and Adjust Plan' : 'フェーズ5: プランを確認して調整'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Show the user their personalized plan',
                    'Let them chat with Habi AI to make changes',
                    'Allow adjustments to calories, exercise, sleep, etc.',
                    'Get user approval before starting',
                  ] : [
                    'ユーザーにパーソナライズされたプランを表示',
                    'Habi AIとチャットして変更を許可',
                    'カロリー、運動、睡眠などを調整可能にする',
                    '開始前にユーザーの承認を得る',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 6: Home Screen */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-indigo-600">
                  {language === 'en' ? 'Phase 6: Build Main Dashboard' : 'フェーズ6: メインダッシュボードを構築'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Create home screen with daily plan',
                    'Show nutrition, exercise, sleep, and mental health cards',
                    'Add progress tracking',
                    'Make Habi AI messages visible',
                    'Add quick action buttons',
                  ] : [
                    '日々のプランを含むホーム画面を作成',
                    '栄養、運動、睡眠、メンタルヘルスカードを表示',
                    '進捗追跡を追加',
                    'Habi AIメッセージを表示可能にする',
                    'クイックアクションボタンを追加',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phase 7: Testing & Launch */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-teal-600">
                  {language === 'en' ? 'Phase 7: Test and Launch' : 'フェーズ7: テストとリリース'}
                </h3>
                <ul className="space-y-2 ml-4">
                  {(language === 'en' ? [
                    'Test all features work correctly',
                    'Test on different iOS devices',
                    'Fix any bugs or issues found',
                    'Prepare for App Store submission',
                    'Submit to App Store and make sure everything works',
                  ] : [
                    'すべての機能が正しく動作することをテスト',
                    '異なるiOSデバイスでテスト',
                    '見つかったバグや問題を修正',
                    'App Store提出の準備',
                    'App Storeに提出し、すべてが機能することを確認',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* MVP Scope */}
      <section className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'MVP Scope' : 'MVP範囲'}</CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Complete features included in the Minimum Viable Product' 
                : '最小限の実行可能なプロダクトに含まれる完全な機能'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {language === 'en' ? 'User Authentication' : 'ユーザー認証'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' 
                      ? 'Email/Password + Google/Apple Sign In' 
                      : 'メール/パスワード + Google/Appleサインイン'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {language === 'en' ? 'Complete Onboarding Flow' : '完全なオンボーディングフロー'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? '9 comprehensive steps' : '9つの包括的なステップ'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {language === 'en' ? 'Plan Generation' : 'プラン生成'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Personalized health plans' : 'パーソナライズされた健康プラン'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {language === 'en' ? 'Home Screen' : 'ホーム画面'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? '4-dimensional plan view' : '4次元プランビュー'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {language === 'en' ? 'Habi AI Integration' : 'Habi AI統合'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Basic avatar integration' : '基本的なアバター統合'}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {language === 'en' ? 'Data Persistence' : 'データ永続化'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Firebase integration' : 'Firebase統合'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Detailed Development Phases */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {language === 'en' ? '🔧 Detailed Development Phases' : '🔧 詳細な開発フェーズ'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Technical details for each development phase' 
              : '各開発フェーズの技術詳細'}
          </p>
        </div>

        {/* Web App Phases */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Monitor className="h-8 w-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-900">
              {language === 'en' ? '🌐 Web App Development Phases' : '🌐 Webアプリ開発フェーズ'}
            </h3>
          </div>
          <div className="space-y-8">
            {webPhases.map((phase, phaseIndex) => {
              const displaySteps = selectedPlatform === 'both' || selectedPlatform === 'web'
                ? phase.steps.filter(step => step.platform === 'web' || step.platform === 'both')
                : [];
              
              if (displaySteps.length === 0) return null;

              return (
                <Card key={`web-${phase.id}`} className="overflow-hidden border-2 border-blue-100">
                  <CardHeader className={`${phase.color} text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-xl md:text-2xl">
                          {language === 'en' ? 'Phase' : 'フェーズ'} {phaseIndex + 1}: {getPhaseName(phase)}
                        </CardTitle>
                        <CardDescription className="text-white/90 mt-2">
                          {getPhaseDescription(phase)}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Clock className="mr-1 h-3 w-3" />
                        {phase.timeEstimate}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {displaySteps.map((step, stepIndex) => {
                        const Icon = step.icon;
                        return (
                          <div
                            key={step.id}
                            className="border-l-4 border-l-primary pl-4 pb-6 last:pb-0"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`${phase.color} p-2 rounded-lg text-white flex-shrink-0`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="text-lg font-semibold">
                                        {stepIndex + 1}. {getStepTitle(step)}
                                      </h3>
                                      <Badge variant="outline" className="text-xs">
                                        <Monitor className="h-3 w-3 mr-1" />
                                        Web
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {getStepDescription(step)}
                                    </p>
                                  </div>
                                  <Badge variant="outline" className="flex-shrink-0">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {step.timeEstimate}
                                  </Badge>
                                </div>
                                <div className="mt-4">
                                  <div className="text-sm font-medium mb-2">
                                    {language === 'en' ? 'Key Features:' : '主要機能:'}
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {getStepFeatures(step).map((feature, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                {step.route && (
                                  <div className="mt-4">
                                    <Badge variant="outline" className="text-xs">
                                      {language === 'en' ? 'Route:' : 'ルート:'} {step.route}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* iOS App Phases */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="h-8 w-8 text-purple-600" />
            <h3 className="text-2xl font-bold text-purple-900">
              {language === 'en' ? '📱 iOS App Development Phases' : '📱 iOSアプリ開発フェーズ'}
            </h3>
          </div>
          <div className="space-y-8">
            {allIosPhases.map((phase, phaseIndex) => {
              const displaySteps = selectedPlatform === 'both' || selectedPlatform === 'ios'
                ? phase.steps.filter(step => step.platform === 'ios' || step.platform === 'both')
                : [];
              
              if (displaySteps.length === 0) return null;

              return (
                <Card key={`ios-${phase.id}`} className="overflow-hidden border-2 border-purple-100">
                  <CardHeader className={`${phase.color} text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-xl md:text-2xl">
                          {language === 'en' ? 'Phase' : 'フェーズ'} {phaseIndex + 1}: {getPhaseName(phase)}
                        </CardTitle>
                        <CardDescription className="text-white/90 mt-2">
                          {getPhaseDescription(phase)}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Clock className="mr-1 h-3 w-3" />
                        {phase.timeEstimate}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {displaySteps.map((step, stepIndex) => {
                        const Icon = step.icon;
                        return (
                          <div
                            key={step.id}
                            className="border-l-4 border-l-primary pl-4 pb-6 last:pb-0"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`${phase.color} p-2 rounded-lg text-white flex-shrink-0`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="text-lg font-semibold">
                                        {stepIndex + 1}. {getStepTitle(step)}
                                      </h3>
                                      <Badge variant="outline" className="text-xs">
                                        <Smartphone className="h-3 w-3 mr-1" />
                                        iOS
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {getStepDescription(step)}
                                    </p>
                                  </div>
                                  <Badge variant="outline" className="flex-shrink-0">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {step.timeEstimate}
                                  </Badge>
                                </div>
                                <div className="mt-4">
                                  <div className="text-sm font-medium mb-2">
                                    {language === 'en' ? 'Key Features:' : '主要機能:'}
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {getStepFeatures(step).map((feature, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                {step.route && (
                                  <div className="mt-4">
                                    <Badge variant="outline" className="text-xs">
                                      {language === 'en' ? 'Route:' : 'ルート:'} {step.route}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Criteria */}
      <section className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'MVP Success Criteria' : 'MVP成功基準'}</CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'The MVP is complete when all these criteria are met' 
                : 'これらの基準がすべて満たされたとき、MVPは完了します'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(language === 'en' ? [
                'Users can sign up and log in',
                'Complete onboarding flow works end-to-end',
                'Personalized plans are generated accurately',
                'Users can view their plan on home screen',
                'All data persists correctly',
                'App is responsive (mobile and desktop) / App is tested and ready for App Store submission',
                'App is tested and ready for production deployment',
              ] : [
                'ユーザーはサインアップしてログインできます',
                '完全なオンボーディングフローがエンドツーエンドで機能します',
                'パーソナライズされたプランが正確に生成されます',
                'ユーザーはホーム画面でプランを表示できます',
                'すべてのデータが正しく永続化されます',
                'アプリはレスポンシブ（モバイルとデスクトップ）/ アプリはApp Store提出の準備ができています',
                'アプリは本番デプロイの準備ができています',
              ]).map((criterion, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{criterion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            {language === 'en' 
              ? 'HabiMate Web & iOS MVP Development Roadmap' 
              : 'HabiMate Web & iOS MVP開発ロードマップ'}
          </p>
          <p className="mt-1">
            {language === 'en' 
              ? 'This presentation showcases the complete development process' 
              : 'このプレゼンテーションは、完全な開発プロセスを示しています'}
          </p>
        </div>
      </footer>
    </div>
  );
}
