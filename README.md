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

Welcome to My Anime Collection, a free anime tracker that allows users to explore and create custom playlists to keep track of their favorite anime.

### Technologies Used

#### Backend

- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - NoSQL database and object modeling
- **TypeScript** - Static typing
- **JWT** - Authentication
- **Gemini AI** - AI-powered anime recommendations
- **Express Rate Limit** - API request limiting
- **Helmet** - Security middleware
- **Express Mongo Sanitize** - Input sanitization

#### Frontend

- **React 18** - UI library
- **TypeScript** - Static typing
- **Styled Components & SASS** - Styling
- **Material UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **react-i18next** - Internationalization (English/Japanese)
- **React Toastify** - Notifications
- **DOMPurify** - XSS sanitization
- **CRACO** - Create React App configuration override
- **Playwright** - End-to-end testing

### Project Structure

This project uses a monorepo structure with both the frontend and backend in a single repository.

```
My-Anime-Collection/
├── Client/                      # Frontend React Application
│   ├── public/                  # Static files
│   ├── src/                     # Source code
│   │   ├── assets/              # Images, SCSS styles, etc.
│   │   ├── Components/          # Reusable UI components
│   │   ├── context/             # React Context API (Auth, Anime, Playlist, Language)
│   │   ├── pages/               # Page components and dashboard tabs
│   │   ├── routes/              # Route definitions
│   │   ├── translations/        # i18n files (en.json, jp.json)
│   │   ├── typings-custom/      # TypeScript type definitions
│   │   ├── utils/               # Utility functions, types, hooks
│   │   ├── App.tsx              # Main app component
│   │   └── index.tsx            # Entry point
│   ├── craco.config.js          # CRACO configuration
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
│   ├── utils/                   # Helpers, Gemini AI, rate limiters
│   └── server.ts                # Server entry point
│
├── package.json                 # Root dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

The app utilizes Concurrently to run both the backend and frontend simultaneously from the same repository. The frontend fetches anime data from the Kitsu.io API, while the backend manages user data, playlists, and AI-powered recommendations via Google's Gemini API.

### Key Features

- User authentication (register, login, profile management)
- Anime search and discovery via Kitsu.io API
- Custom playlist creation and management
- AI-powered anime recommendations (Gemini)
- Responsive design for mobile and desktop
- Dark/Light theme support
- Bilingual support (English/Japanese)

### Application Pages

- **Landing Page** - Introduction with testimonials, feature highlights, and login/register options
- **Dashboard** - Main interface with anime search and playlist management
- **Dashboard Tabs** - Add Anime, My Animes, Top Animes, Edit Playlists, Profile
- **Register/Login** - User authentication screens (includes demo mode)
- **Error Pages** - Custom error handling screens

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
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
# GEMINI_API_KEY=your_gemini_api_key

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
- `PATCH /api/v1/auth/updateUser` - Update user profile (authenticated)
- `DELETE /api/v1/auth/deleteUser` - Delete user account (authenticated)

#### Animes

- `GET /api/v1/animes` - Get user's saved animes (authenticated)
- `POST /api/v1/animes` - Save an anime (authenticated)
- `DELETE /api/v1/animes/:id` - Delete a saved anime (authenticated)
- `POST /api/v1/animes/recommendations` - Get AI-powered anime recommendations (authenticated)

#### Playlists

- `GET /api/v1/playlists` - Get user's playlists (authenticated)
- `POST /api/v1/playlists` - Create a new playlist (authenticated)
- `PUT /api/v1/playlists/:id` - Update a playlist (authenticated)
- `DELETE /api/v1/playlists/:id` - Delete a playlist (authenticated)

## Links

- **Live Site:** [My Anime Collection](https://www.my-anime-collection.com)
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

「My Anime Collection（私のアニメコレクション）」へようこそ。これは、ユーザーがお気に入りのアニメを追跡するためのカスタムプレイリストを探索および作成できる無料のアニメトラッカーです。

### 使用技術

#### バックエンド

- **Node.js & Express** - サーバーフレームワーク
- **MongoDB & Mongoose** - NoSQL データベースとオブジェクトモデリング
- **TypeScript** - 静的型付け
- **JWT** - 認証
- **Gemini AI** - AI によるアニメおすすめ機能
- **Express Rate Limit** - API リクエスト制限
- **Helmet** - セキュリティミドルウェア
- **Express Mongo Sanitize** - 入力サニタイズ

#### フロントエンド

- **React 18** - UI ライブラリ
- **TypeScript** - 静的型付け
- **Styled Components & SASS** - スタイリング
- **Material UI** - コンポーネントライブラリ
- **React Router** - ナビゲーション
- **Axios** - HTTP クライアント
- **Framer Motion** - アニメーション
- **react-i18next** - 国際化（英語/日本語）
- **React Toastify** - 通知
- **DOMPurify** - XSS サニタイズ
- **CRACO** - Create React App 設定のカスタマイズ
- **Playwright** - E2E テスト

### プロジェクト構造

このプロジェクトは、フロントエンドとバックエンドを単一のリポジトリに含むモノレポ構造を使用しています。

```
My-Anime-Collection/
├── Client/                      # フロントエンドReactアプリケーション
│   ├── public/                  # 静的ファイル
│   ├── src/                     # ソースコード
│   │   ├── assets/              # 画像、SCSSスタイルなど
│   │   ├── Components/          # 再利用可能なUIコンポーネント
│   │   ├── context/             # React Context API（Auth, Anime, Playlist, Language）
│   │   ├── pages/               # ページコンポーネントとダッシュボードタブ
│   │   ├── routes/              # ルート定義
│   │   ├── translations/        # i18nファイル（en.json, jp.json）
│   │   ├── typings-custom/      # TypeScript型定義
│   │   ├── utils/               # ユーティリティ関数、型、フック
│   │   ├── App.tsx              # メインアプリコンポーネント
│   │   └── index.tsx            # エントリーポイント
│   ├── craco.config.js          # CRACO設定
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
│   ├── utils/                   # ヘルパー、Gemini AI、レートリミッター
│   └── server.ts                # サーバーエントリーポイント
│
├── package.json                 # ルート依存関係とスクリプト
└── tsconfig.json                # TypeScript設定
```

このアプリは Concurrently を使用して、同じリポジトリからバックエンドとフロントエンドを同時に実行します。フロントエンドは Kitsu.io API からアニメデータを取得し、バックエンドは MongoDB でユーザーデータとプレイリストを管理し、Google Gemini API で AI おすすめ機能を提供します。

### 主な機能

- ユーザー認証（登録、ログイン、プロフィール管理）
- Kitsu.io API によるアニメ検索と発見
- カスタムプレイリスト作成と管理
- AI によるアニメおすすめ機能（Gemini）
- モバイルとデスクトップ向けのレスポンシブデザイン
- ダーク/ライトテーマ対応
- 二言語対応（英語/日本語）

### アプリケーションページ

- **ランディングページ** - お客様の声、機能紹介、ログイン/登録オプション付きの紹介ページ
- **ダッシュボード** - アニメ検索とプレイリスト管理のメインインターフェース
- **ダッシュボードタブ** - アニメ追加、マイアニメ、トップアニメ、プレイリスト編集、プロフィール
- **登録/ログイン** - ユーザー認証画面（デモモード含む）
- **エラーページ** - カスタムエラー処理画面

## 目次

- [インストール方法](#インストール方法)
- [使用方法](#使用方法)
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
# GEMINI_API_KEY=your_gemini_api_key

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
- `PATCH /api/v1/auth/updateUser` - ユーザープロフィール更新（認証必須）
- `DELETE /api/v1/auth/deleteUser` - ユーザーアカウント削除（認証必須）

#### アニメ

- `GET /api/v1/animes` - 保存済みアニメ取得（認証必須）
- `POST /api/v1/animes` - アニメ保存（認証必須）
- `DELETE /api/v1/animes/:id` - 保存済みアニメ削除（認証必須）
- `POST /api/v1/animes/recommendations` - AI おすすめアニメ取得（認証必須）

#### プレイリスト

- `GET /api/v1/playlists` - ユーザーのプレイリスト取得（認証必須）
- `POST /api/v1/playlists` - 新規プレイリスト作成（認証必須）
- `PUT /api/v1/playlists/:id` - プレイリスト更新（認証必須）
- `DELETE /api/v1/playlists/:id` - プレイリスト削除（認証必須）

## リンク

- **サイト：** [My Anime Collection](https://www.my-anime-collection.com)
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
