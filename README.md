# My Anime Collection (English/日本語）

<p align="center">
 <img src="https://img.shields.io/github/languages/count/ZacharyTStone/My-Anime-Collection?style=plastic" alt="使用言語数" />
 <img src="https://img.shields.io/github/languages/top/ZacharyTStone/My-Anime-Collection?style=plastic&labelColor=yellow" alt="主要言語" />
 <img src="https://img.shields.io/github/languages/code-size/ZacharyTStone/My-Anime-Collection?style=plastic" alt="コードサイズ" />
 <img src="https://img.shields.io/github/repo-size/ZacharyTStone/My-Anime-Collection?style=plastic" alt="リポジトリサイズ" /> 
 <img src="https://img.shields.io/github/last-commit/ZacharyTStone/My-Anime-Collection?style=plastic" alt="最終コミット" /> 
 <img src="https://img.shields.io/github/issues/ZacharyTStone/My-Anime-Collection?style=plastic" alt="イシュー" /> 
 <img src="https://img.shields.io/github/followers/ZacharyTStone?style=social" alt="フォロワー" /> 
</p>

## Description

Welcome to My Anime Collection, a free anime tracker that allows users to explore and create custom playlists to keep track of their favorite anime.

### Technologies Used

#### Backend

- **Node.js & Express** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **TypeScript** - Static typing
- **JWT** - Authentication
- **Express Rate Limit** - API request limiting
- **Helmet** - Security middleware
- **XSS Clean** - Sanitize input

#### Frontend

- **React** - UI library
- **TypeScript** - Static typing
- **Styled Components** - CSS-in-JS styling
- **Material UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Simply Carousel** - Image carousel

### Project Structure

This project uses a mono repo structure with both the frontend and backend in a single repository.

```
My-Anime-Collection/
├── Client/                      # Frontend React Application
│   ├── public/                  # Static files
│   ├── src/                     # Source code
│   │   ├── assets/              # Images, styles, etc.
│   │   ├── Components/          # Reusable UI components
│   │   ├── context/             # React Context API
│   │   ├── pages/               # Page components
│   │   ├── translations/        # Internationalization files
│   │   ├── typings-custom/      # TypeScript type definitions
│   │   ├── utils/               # Utility functions
│   │   ├── App.tsx              # Main app component
│   │   └── index.tsx            # Entry point
│   ├── tests/                   # Test files
│   └── package.json             # Frontend dependencies
│
├── Server/                      # Backend Express Server
│   ├── controllers/             # Request handlers
│   ├── db/                      # Database configuration
│   ├── errors/                  # Error handling
│   ├── middleware/              # Express middleware
│   ├── models/                  # MongoDB models
│   ├── routes/                  # API routes
│   ├── utils/                   # Utility functions
│   └── server.ts                # Server entry point
│
├── package.json                 # Root dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

The app utilizes Concurrently to run both the backend and frontend simultaneously from the same repository. While this structure simplifies local development, it does increase deployment complexity. The frontend fetches anime data from the Kitsu.io API, while the backend manages user data and playlists in MongoDB.

### Key Features

- User authentication (register, login, profile)
- Anime search and discovery
- Custom playlist creation
- Anime details and information
- Responsive design for mobile and desktop
- Dark/Light theme support
- Multiple language support (English/Japanese)

### Application Pages

- **Landing Page** - Introduction to the application with login/register options
- **Dashboard** - Main interface with anime search and playlist management
- **Custom Dashboard Tabs** - Organized access to different app features
- **Register/Login** - User authentication screens
- **Error Pages** - Custom error handling screens

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
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
# Example .env variables:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# JWT_LIFETIME=1d

# Start the development server
npm start
```

## Usage

After installation, the application will be running at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

### API Endpoints

The backend provides several RESTful endpoints:

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Authenticate a user
- `GET /api/v1/user/me` - Get current user profile
- `GET /api/v1/playlists` - Get user's anime playlists
- `POST /api/v1/playlists` - Create a new playlist
- `PUT /api/v1/playlists/:id` - Update a playlist
- `DELETE /api/v1/playlists/:id` - Delete a playlist

## Deployment

This application is deployed on Heroku. To deploy your own instance:

1. Create a Heroku account and install the Heroku CLI
2. Set up the required environment variables in Heroku
3. Connect your GitHub repository to Heroku for automatic deployment
4. Set the build configuration according to the `heroku-postbuild` script in package.json

**Note:** The current engine specifications in package.json are Node.js v20.12.1 and npm 10.2.3. Your local development environment may use different versions.

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
- **MongoDB** - NoSQL データベース
- **Mongoose** - MongoDB オブジェクトモデリング
- **TypeScript** - 静的型付け
- **JWT** - 認証
- **Express Rate Limit** - API リクエスト制限
- **Helmet** - セキュリティミドルウェア
- **XSS Clean** - 入力サニタイズ

#### フロントエンド

- **React** - UI ライブラリ
- **TypeScript** - 静的型付け
- **Styled Components** - CSS-in-JS スタイリング
- **Material UI** - コンポーネントライブラリ
- **React Router** - ナビゲーション
- **Axios** - HTTP クライアント
- **React Toastify** - 通知
- **React Simply Carousel** - 画像カルーセル

### プロジェクト構造

このプロジェクトは、フロントエンドとバックエンドを単一のリポジトリに含むモノレポ構造を使用しています。

```
My-Anime-Collection/
├── Client/                      # フロントエンドReactアプリケーション
│   ├── public/                  # 静的ファイル
│   ├── src/                     # ソースコード
│   │   ├── assets/              # 画像、スタイルなど
│   │   ├── Components/          # 再利用可能なUIコンポーネント
│   │   ├── context/             # React Context API
│   │   ├── pages/               # ページコンポーネント
│   │   ├── translations/        # 国際化ファイル
│   │   ├── typings-custom/      # TypeScript型定義
│   │   ├── utils/               # ユーティリティ関数
│   │   ├── App.tsx              # メインアプリコンポーネント
│   │   └── index.tsx            # エントリーポイント
│   ├── tests/                   # テストファイル
│   └── package.json             # フロントエンド依存関係
│
├── Server/                      # バックエンドExpressサーバー
│   ├── controllers/             # リクエストハンドラー
│   ├── db/                      # データベース設定
│   ├── errors/                  # エラー処理
│   ├── middleware/              # Expressミドルウェア
│   ├── models/                  # MongoDBモデル
│   ├── routes/                  # APIルート
│   ├── utils/                   # ユーティリティ関数
│   └── server.ts                # サーバーエントリーポイント
│
├── package.json                 # ルート依存関係とスクリプト
└── tsconfig.json                # TypeScript設定
```

このアプリは Concurrently を使用して、同じリポジトリからバックエンドとフロントエンドを同時に実行します。この構造はローカル開発を簡素化しますが、デプロイの複雑さは増します。フロントエンドは Kitsu.io API からアニメデータを取得し、バックエンドは MongoDB でユーザーデータとプレイリストを管理します。

### 主な機能

- ユーザー認証（登録、ログイン、プロフィール）
- アニメ検索と発見
- カスタムプレイリスト作成
- アニメ詳細情報
- モバイルとデスクトップ向けのレスポンシブデザイン
- ダーク/ライトテーマ対応
- 複数言語サポート（英語/日本語）

### アプリケーションページ

- **ランディングページ** - ログイン/登録オプション付きのアプリケーション紹介
- **ダッシュボード** - アニメ検索とプレイリスト管理のメインインターフェース
- **カスタムダッシュボードタブ** - アプリ機能への整理されたアクセス
- **登録/ログイン** - ユーザー認証画面
- **エラーページ** - カスタムエラー処理画面

## 目次

- [インストール方法](#インストール方法)
- [使用方法](#使用方法)
- [API エンドポイント](#api-エンドポイント)
- [デプロイメント](#デプロイメント)
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
# .envファイルの例：
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# JWT_LIFETIME=1d

# 開発サーバーを起動
npm start
```

## 使用方法

インストール後、アプリケーションは以下で実行されます：

- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:5001

### API エンドポイント

バックエンドは以下の RESTful エンドポイントを提供します：

- `POST /api/v1/auth/register` - 新規ユーザー登録
- `POST /api/v1/auth/login` - ユーザー認証
- `GET /api/v1/user/me` - 現在のユーザープロフィール取得
- `GET /api/v1/playlists` - ユーザーのアニメプレイリスト取得
- `POST /api/v1/playlists` - 新規プレイリスト作成
- `PUT /api/v1/playlists/:id` - プレイリスト更新
- `DELETE /api/v1/playlists/:id` - プレイリスト削除

## デプロイメント

このアプリケーションは Heroku にデプロイされています。独自のインスタンスをデプロイするには：

1. Heroku アカウントを作成し、Heroku CLI をインストール
2. Heroku で必要な環境変数を設定
3. GitHub リポジトリを Heroku に接続して自動デプロイを設定
4. package.json の`heroku-postbuild`スクリプトに従ってビルド構成を設定

**注：** package.json の現在のエンジン仕様は Node.js v20.12.1 と npm 10.2.3 です。ローカル開発環境では異なるバージョンを使用している場合があります。

## リンク

- **サイト：** [My Anime Collection](https://www.my-anime-collection.com](https://my-anime-collection.onrender.com)
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
