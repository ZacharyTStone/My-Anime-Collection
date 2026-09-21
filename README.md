# My Anime Collection (English/日本語）

<p align="center">
 <img src="https://img.shields.io/github/languages/count/ZacharyTStone/My-Anime-Collection?style=plastic" alt="Languages Count" />
 <img src="https://img.shields.io/github/languages/top/ZacharyTStone/My-Anime-Collection?style=plastic&labelColor=yellow" alt="Top Language" />
 <img src="https://img.shields.io/github/languages/code-size/ZacharyTStone/My-Anime-Collection?style=plastic" alt="Code Size" />
 <img src="https://img.shields.io/github/repo-size/ZacharyTStone/My-Anime-Collection?style=plastic" alt="Repo Size" /> 
 <img src="https://img.shields.io/github/last-commit/ZacharyTStone/My-Anime-Collection?style=plastic" alt="Last Commit" /> 
 <img src="https://img.shields.io/github/issues/ZacharyTStone/My-Anime-Collection?style=plastic" alt="Issues" /> 
 <img src="https://img.shields.io/github/followers/ZacharyTStone?style=social" alt="Followers" /> 
</p>

## Description

Welcome to My Anime Collection, a free anime tracker that allows users to explore and create custom playlists to keep track of their favorite anime. This project also serves as a personal testing ground for experimenting with new technologies — such as Zustand, React Compiler, and Tailwind — and for learning tools like Storybook.

### Technologies Used

#### Backend

- **Node.js & Express 5** - Server framework
- **MongoDB & Mongoose** - NoSQL database and object modeling
- **TypeScript** - Static typing
- **JWT & Google OAuth** - Authentication
- **Zod** - Request schema validation
- **Groq AI** (Llama 3.3 70B) - AI-powered anime recommendations
- **Express Rate Limit** - API request limiting (multi-tier)
- **Helmet** - Security headers
- **Express Mongo Sanitize** - NoSQL injection protection

#### Frontend

- **React 19** with **React Compiler** - UI library with automatic optimizations
- **Vite 7** - Build tool and dev server
- **TypeScript** - Static typing
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible headless component primitives
- **Zustand** - Global state (auth, anime, playlist, language, settings)
- **TanStack Query** - Server state, caching, and request deduplication
- **React Router 8** - Navigation with lazy-loaded routes
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **react-i18next** - Internationalization (English/Japanese)
- **React Toastify** - Notifications
- **DOMPurify** - XSS sanitization
- **Storybook & Vitest** - Component development and testing

### Project Structure

This project uses a monorepo structure with both the frontend and backend in a single repository.

```
My-Anime-Collection/
├── Client/                      # Frontend React Application (Vite)
│   ├── public/                  # Static files
│   ├── src/                     # Source code
│   │   ├── assets/              # Images
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ui/              # Headless primitives (button, dialog, select...)
│   │   │   ├── AnimeCard/       # Anime card and its modals
│   │   │   ├── CollectionToolbar/ # Stats, export, random pick
│   │   │   ├── Layout/          # Layout components
│   │   │   └── Navbar/          # Navbar, mobile menu, user menu
│   │   ├── hooks/               # Shared hooks and store selectors
│   │   ├── pages/               # Page components
│   │   │   ├── DashboardTabs/   # Dashboard sub-pages
│   │   │   └── LandingSections/ # Landing page sections
│   │   ├── queries/             # TanStack Query hooks and query keys
│   │   ├── routes/              # React Router configuration
│   │   ├── stores/              # Zustand stores
│   │   ├── translations/        # i18n files (en.json, jp.json)
│   │   ├── utils/               # Utility functions and shared types
│   │   ├── App.tsx              # Main app component
│   │   └── index.tsx            # Entry point
│   ├── vite.config.ts           # Vite configuration
│   ├── playwright.config.ts     # Playwright test configuration
│   └── package.json             # Frontend dependencies
│
├── Server/                      # Backend Express Server
│   ├── config/                  # Environment configuration
│   ├── controllers/             # Request handlers (auth, animes, playlists)
│   ├── db/                      # Database connection
│   ├── errors/                  # Custom error classes
│   ├── middleware/              # Auth, error handling, security
│   ├── models/                  # MongoDB models (User, Anime, Playlists)
│   ├── routes/                  # API route definitions
│   ├── utils/                   # Helpers, Groq AI, rate limiters
│   └── server.ts                # Server entry point
│
├── scripts/                     # One-off maintenance scripts
├── .github/workflows/           # CI and CodeQL pipelines
├── package.json                 # Root dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

The app utilizes Concurrently to run both the backend and frontend simultaneously from the same repository. The frontend fetches anime data from the Kitsu.io API, while the backend manages user data, playlists, and AI-powered recommendations via the Groq API.

### Key Features

- User authentication (register, login, profile management)
- Demo account system with auto-expiration (30-day TTL)
- Anime search and discovery via Kitsu.io API
- Custom playlist creation and management
- AI-powered anime recommendations (Groq / Llama 3.3)
- Responsive design for mobile and desktop
- Bilingual support (English/Japanese)
- Lazy-loaded routes for performance
- Multi-tier API rate limiting

### Application Pages

- **Landing Page** - Introduction with testimonials, feature highlights, and login/register options
- **Dashboard** - Main interface with navbar and lazy-loaded child routes
- **My Animes** - View saved animes with search, filter, sort, and pagination
- **Add Anime** - Search the Kitsu.io API with debounced search and add to playlists
- **Top Animes** - Browse trending anime from Kitsu.io
- **Edit Playlists** - Create, edit, and delete custom playlists
- **Profile** - Update user info or delete account
- **Register/Login** - User authentication screens (includes demo mode)
- **Error Pages** - Custom 404 and error handling screens

### Testing

The project uses a multi-layered testing strategy:

- **Vitest (server)** - Route, middleware, and controller tests against an in-memory MongoDB (`Server/__tests__/`)
- **Vitest (client)** - Unit tests for stores, utilities, and components (`Client/src/**/*.test.ts(x)`)
- **Storybook + Vitest Browser** - Component stories rendered in a real browser via Playwright (`Client/src/**/*.stories.ts`)

```bash
# Run everything CI runs
npm run lint:client && npm run typecheck && npm run typecheck:client
npm test

# Server tests only
npm run test:server

# Client unit tests only
npm run test:client

# Storybook component tests (real browser)
npm --prefix Client run test -- --project=storybook
```

Every one of these runs in CI on each push and pull request. `npm run build`
only builds; verification is CI's job, so a deploy never waits on the test suite.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Links](#links)
- [License](#license)
- [Contributions](#contributions)
- [Questions](#questions)

## Installation

To set up this project locally:

```bash
# Clone the repository
git clone https://github.com/ZacharyTStone/My-Anime-Collection.git

# Install dependencies
npm run install-dependencies

# Set up environment variables (create .env file in root directory)
# Required .env variables:
# MONGO_URL=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# JWT_LIFETIME=1d
# GROQ_API_KEY=your_groq_api_key

# Start the development server
npm start
```

## Usage

After installation, the application will be running at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

### API Endpoints

#### Auth

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Authenticate a user
- `POST /api/v1/auth/google` - Authenticate via Google OAuth
- `PATCH /api/v1/auth/updateUser` - Update user profile (authenticated)
- `DELETE /api/v1/auth/deleteUser` - Delete user account (authenticated)

#### Animes

- `GET /api/v1/animes` - Get user's saved animes (authenticated)
- `POST /api/v1/animes` - Save an anime (authenticated)
- `DELETE /api/v1/animes/:id` - Delete a saved anime (authenticated)
- `POST /api/v1/animes/recommendations` - Get AI-powered anime recommendations (authenticated)
- `GET /api/v1/animes/stats` - Collection statistics (authenticated)

#### Playlists

- `GET /api/v1/playlists` - Get user's playlists (authenticated)
- `POST /api/v1/playlists` - Create a new playlist (authenticated)
- `PUT /api/v1/playlists/:id` - Update a playlist (authenticated)
- `DELETE /api/v1/playlists/:id` - Delete a playlist (authenticated)

## Links

- **Live Site:** [My Anime Collection](https://www.my-anime-collection.com)
- **Storybook:** [Component Library](https://my-anime-collection-storybook.onrender.com) — An experimental Storybook instance used to explore component-driven development. Stories are primarily AI-generated as a sandbox for learning Storybook's tooling and workflow.
- **GitHub Repository:** [My Anime Collection on GitHub](https://github.com/ZacharyTStone/My-Anime-Collection)

## License

[![MIT License](https://img.shields.io/badge/license-MIT-green?style=plastic)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

## Contributions

Currently, I am not accepting contributions for this project. If you're interested in contributing, check out my other app [Haku](https://github.com/ZacharyTStone/haku).

## Questions

Feel free to connect with me:

- [GitHub](https://github.com/ZacharyTStone)
- [LinkedIn](https://www.linkedin.com/in/zach-stone-45b649211/)

For project-related inquiries, contact me at Zach.Stone.Developer@gmail.com.

---

## 説明

「My Anime Collection（私のアニメコレクション）」へようこそ。これは、ユーザーがお気に入りのアニメを追跡するためのカスタムプレイリストを探索および作成できる無料のアニメトラッカーです。このプロジェクトは、Zustand、React Compiler、Tailwind などの新しい技術を試したり、Storybook などのツールを学ぶための実験場としても活用しています。

### 使用技術

#### バックエンド

- **Node.js & Express 5** - サーバーフレームワーク
- **MongoDB & Mongoose** - NoSQL データベースとオブジェクトモデリング
- **TypeScript** - 静的型付け
- **JWT & Google OAuth** - 認証
- **Zod** - リクエストスキーマ検証
- **Groq AI**（Llama 3.3 70B）- AI によるアニメおすすめ機能
- **Express Rate Limit** - API リクエスト制限（多段階）
- **Helmet** - セキュリティヘッダー
- **Express Mongo Sanitize** - NoSQL インジェクション対策

#### フロントエンド

- **React 19** と **React Compiler** - 自動最適化付き UI ライブラリ
- **Vite 7** - ビルドツールと開発サーバー
- **TypeScript** - 静的型付け
- **Tailwind CSS v4** - ユーティリティファーストのスタイリング
- **Radix UI** - アクセシブルなヘッドレス UI プリミティブ
- **Zustand** - グローバル状態（auth、anime、playlist、language、settings）
- **TanStack Query** - サーバー状態管理・キャッシュ・リクエスト重複排除
- **React Router 8** - 遅延読み込みルート付きナビゲーション
- **Axios** - HTTP クライアント
- **Framer Motion** - アニメーション
- **react-i18next** - 国際化（英語/日本語）
- **React Toastify** - 通知
- **DOMPurify** - XSS サニタイズ
- **Storybook & Vitest** - コンポーネント開発とテスト

### プロジェクト構造

このプロジェクトは、フロントエンドとバックエンドを単一のリポジトリに含むモノレポ構造を使用しています。

```
My-Anime-Collection/
├── Client/                      # フロントエンドReactアプリケーション（Vite）
│   ├── public/                  # 静的ファイル
│   ├── src/                     # ソースコード
│   │   ├── assets/              # 画像
│   │   ├── components/          # 再利用可能なUIコンポーネント
│   │   │   ├── ui/              # ヘッドレスUIプリミティブ
│   │   │   ├── AnimeCard/       # アニメカードとモーダル
│   │   │   ├── CollectionToolbar/ # 統計、エクスポート、ランダム選択
│   │   │   ├── Layout/          # レイアウトコンポーネント
│   │   │   └── Navbar/          # ナビバー、モバイルメニュー、ユーザーメニュー
│   │   ├── hooks/               # 共有フックとストアセレクター
│   │   ├── pages/               # ページコンポーネント
│   │   │   ├── DashboardTabs/   # ダッシュボードサブページ
│   │   │   └── LandingSections/ # ランディングページのセクション
│   │   ├── queries/             # TanStack Query フックとクエリキー
│   │   ├── routes/              # React Routerの設定
│   │   ├── stores/              # Zustandストア
│   │   ├── translations/        # i18nファイル（en.json, jp.json）
│   │   ├── utils/               # ユーティリティ関数と共有型
│   │   ├── App.tsx              # メインアプリコンポーネント
│   │   └── index.tsx            # エントリーポイント
│   ├── vite.config.ts           # Vite設定
│   ├── playwright.config.ts     # Playwrightテスト設定
│   └── package.json             # フロントエンド依存関係
│
├── Server/                      # バックエンドExpressサーバー
│   ├── config/                  # 環境設定
│   ├── controllers/             # リクエストハンドラー（auth, animes, playlists）
│   ├── db/                      # データベース接続
│   ├── errors/                  # カスタムエラークラス
│   ├── middleware/              # 認証、エラー処理、セキュリティ
│   ├── models/                  # MongoDBモデル（User, Anime, Playlists）
│   ├── routes/                  # APIルート定義
│   ├── utils/                   # ヘルパー、Groq AI、レートリミッター
│   └── server.ts                # サーバーエントリーポイント
│
├── scripts/                     # メンテナンス用スクリプト
├── .github/workflows/           # CIとCodeQLパイプライン
├── package.json                 # ルート依存関係とスクリプト
└── tsconfig.json                # TypeScript設定
```

このアプリは Concurrently を使用して、同じリポジトリからバックエンドとフロントエンドを同時に実行します。フロントエンドは Kitsu.io API からアニメデータを取得し、バックエンドは MongoDB でユーザーデータとプレイリストを管理し、Groq API で AI おすすめ機能を提供します。

### 主な機能

- ユーザー認証（登録、ログイン、プロフィール管理）
- デモアカウントシステムと自動期限切れ（30日TTL）
- Kitsu.io API によるアニメ検索と発見
- カスタムプレイリスト作成と管理
- AI によるアニメおすすめ機能（Groq / Llama 3.3）
- モバイルとデスクトップ向けのレスポンシブデザイン
- 二言語対応（英語/日本語）
- パフォーマンスのための遅延読み込みルート
- 多段階API レート制限

### アプリケーションページ

- **ランディングページ** - お客様の声、機能紹介、ログイン/登録オプション付きの紹介ページ
- **ダッシュボード** - ナビバーと遅延読み込みの子ルート付きメインインターフェース
- **マイアニメ** - 検索、フィルタ、ソート、ページネーション付きの保存済みアニメ表示
- **アニメ追加** - Kitsu.io API のデバウンス検索とプレイリストへの追加
- **トップアニメ** - Kitsu.io のトレンドアニメ閲覧
- **プレイリスト編集** - カスタムプレイリストの作成、編集、削除
- **プロフィール** - ユーザー情報の更新またはアカウント削除
- **登録/ログイン** - ユーザー認証画面（デモモード含む）
- **エラーページ** - カスタム404とエラー処理画面

### テスト

このプロジェクトは多層テスト戦略を採用しています：

- **Vitest（サーバー）** - インメモリ MongoDB を用いたルート・ミドルウェア・コントローラーのテスト（`Server/__tests__/`）
- **Vitest（クライアント）** - ストア、ユーティリティ、コンポーネントのユニットテスト（`Client/src/**/*.test.ts(x)`）
- **Storybook + Vitest Browser** - Playwright を使用した実ブラウザでのコンポーネントテスト（`Client/src/**/*.stories.ts`）

```bash
# CIと同じ検証をすべて実行
npm run lint:client && npm run typecheck && npm run typecheck:client
npm test

# サーバーテストのみ
npm run test:server

# クライアントユニットテストのみ
npm run test:client

# Storybook コンポーネントテスト（実ブラウザ）
npm --prefix Client run test -- --project=storybook
```

これらはすべて、プッシュとプルリクエストのたびに CI で実行されます。`npm run build`
はビルドのみを行い、検証は CI の役割です。そのためデプロイがテストを待つことはありません。

## 目次

- [インストール方法](#インストール方法)
- [使用方法](#使用方法)
- [テスト](#テスト)
- [API エンドポイント](#api-エンドポイント)
- [リンク](#リンク)
- [ライセンス](#ライセンス)
- [貢献](#貢献)
- [質問](#質問)

## インストール方法

ローカルでプロジェクトをセットアップするには：

```bash
# リポジトリをクローン
git clone https://github.com/ZacharyTStone/My-Anime-Collection.git

# 依存関係をインストール
npm run install-dependencies

# 環境変数を設定（ルートディレクトリに.envファイルを作成）
# 必要な.env変数：
# MONGO_URL=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# JWT_LIFETIME=1d
# GROQ_API_KEY=your_groq_api_key

# 開発サーバーを起動
npm start
```

## 使用方法

インストール後、アプリケーションは以下で実行されます：

- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:5001

### API エンドポイント

#### 認証

- `POST /api/v1/auth/register` - 新規ユーザー登録
- `POST /api/v1/auth/login` - ユーザー認証
- `POST /api/v1/auth/google` - Google OAuth による認証
- `PATCH /api/v1/auth/updateUser` - ユーザープロフィール更新（認証必須）
- `DELETE /api/v1/auth/deleteUser` - ユーザーアカウント削除（認証必須）

#### アニメ

- `GET /api/v1/animes` - 保存済みアニメ取得（認証必須）
- `POST /api/v1/animes` - アニメ保存（認証必須）
- `DELETE /api/v1/animes/:id` - 保存済みアニメ削除（認証必須）
- `POST /api/v1/animes/recommendations` - AI おすすめアニメ取得（認証必須）
- `GET /api/v1/animes/stats` - コレクション統計（認証必須）

#### プレイリスト

- `GET /api/v1/playlists` - ユーザーのプレイリスト取得（認証必須）
- `POST /api/v1/playlists` - 新規プレイリスト作成（認証必須）
- `PUT /api/v1/playlists/:id` - プレイリスト更新（認証必須）
- `DELETE /api/v1/playlists/:id` - プレイリスト削除（認証必須）

## リンク

- **サイト：** [My Anime Collection](https://www.my-anime-collection.com)
- **Storybook：** [コンポーネントライブラリ](https://my-anime-collection-storybook.onrender.com) — コンポーネント駆動開発を学ぶための実験的な Storybook インスタンス。ストーリーは主に AI で生成され、Storybook のツールやワークフローを習得するためのサンドボックスとして活用しています。
- **GitHub リポジトリ：** [My Anime Collection on GitHub](https://github.com/ZacharyTStone/My-Anime-Collection)

## ライセンス

[![MIT ライセンス](https://img.shields.io/badge/license-MIT-green?style=plastic)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

## 貢献

現在、このプロジェクトでは貢献を受け付けていません。貢献に興味がある場合は、他のアプリ [Haku](https://github.com/ZacharyTStone/haku) をご覧ください。

## 質問

お気軽にご連絡ください：

- [GitHub](https://github.com/ZacharyTStone)
- [LinkedIn](https://www.linkedin.com/in/zach-stone-45b649211/)

プロジェクトに関するお問い合わせは、Zach.Stone.Developer@gmail.com までお気軽にどうぞ。
