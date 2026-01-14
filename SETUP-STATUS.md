# セットアップ状況 - Figma Design to EDS Code Template

## ✅ 完了項目

### 1. プロジェクト基本構造
- [x] EDS Boilerplate ベース構造
- [x] npm パッケージ設定
- [x] Storybook 依存関係追加
- [x] Git リポジトリ初期化

### 2. Figma MCP統合
- [x] MCP設定ファイルテンプレート (`.mcp-setup/mcp.json.template`)
- [x] 自動セットアップスクリプト (`.mcp-setup/setup-figma-mcp.sh`)
- [x] 検証スクリプト (`.mcp-setup/verify-setup.sh`)
- [x] セットアップ用 README (`.mcp-setup/README.md`)
- [x] 動作検証ドキュメント (`.mcp-setup/VERIFICATION.md`)
- [x] Figma API アクセス確認済み（実際のプロジェクトファイルで）

**実際のFigmaプロジェクト:**
- ファイル名: `SandBox 0108-AEM Figma Design Framework`
- ファイルID: `MJTwyRbE5EVdlci3UIwsut`
- URL: https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework?node-id=2-1446

### 3. Block生成ガイド（NEW! ✨）
- [x] **`.cursorrules`** - AI向け自動生成ルール (5.4KB)
  - Figma MCP統合ワークフロー
  - ユーザー入力形式定義
  - 自動処理ステップ
  - Story生成戦略
  
- [x] **`BLOCK-GENERATION-GUIDE.md`** - 包括的な生成ルール (16KB)
  - JavaScript実装要件
  - CSS実装要件（Figma Variables → CSS Custom Properties）
  - Storybook Story要件
  - Figma Variant → Story Export マッピング
  - プロダクションチェックリスト
  - 共通パターン集
  
- [x] **`VISUAL-REGRESSION-STRATEGY.md`** - Visual Regression戦略 (13KB)
  - Story Export = Snapshot の原則
  - Figma Variant マッピング戦略
  - What to/not to export as Stories
  - 実例とベストプラクティス

### 4. Storybook設定
- [x] `.storybook/main.js` - Storybook設定
- [x] `.storybook/preview.js` - プレビュー設定（背景、ビューポート、デコレーター）
- [x] サンプルHero Block Story (`blocks/hero/hero.stories.js`)

### 5. ドキュメント
- [x] `FIGMA-MCP-INTEGRATION.md` - Figma MCP統合設計書 (450行)
- [x] `FIGMA-MCP-QUICKSTART.md` - クイックスタートガイド
- [x] `figma-urls.json` - Figma URL管理テンプレート
- [x] `prompts/generate-block-from-figma.md` - ブロック生成プロンプトテンプレート
- [x] `docs/user-stories/hero-block.md` - サンプルUser Story

### 6. Chromatic統合（my-website検証済み）
- [x] Chromatic アカウント設定
- [x] GitHub Actions ワークフロー設定（2層戦略）
- [x] Playwright E2E テスト設定
- [x] Chromatic baseline管理戦略確立
- [x] PR経由Visual Regression動作確認済み

---

## 📋 次のステップ

### Phase 1: 環境確認（進行中）
- [x] npm install 完了
- [ ] Storybook 起動確認 (`npm run storybook`)
- [ ] Cursor MCP経由でFigmaアクセス確認

### Phase 2: Block生成テスト
- [ ] 実際のFigmaコンポーネント選定
- [ ] User Story ドキュメント作成
- [ ] Block生成プロンプト実行
- [ ] 生成されたコードレビュー
- [ ] Storybook で Story確認

### Phase 3: Visual Regression統合
- [ ] GitHub リポジトリ作成
- [ ] Chromatic プロジェクト作成
- [ ] GitHub Secrets 設定 (`CHROMATIC_PROJECT_TOKEN`)
- [ ] PR経由でVR テスト実行

### Phase 4: テンプレート化
- [ ] README.md 完成版作成
- [ ] セットアップガイド整備
- [ ] サンプルBlock追加
- [ ] テンプレートとして公開準備

---

## 🎯 プロンプト形式（確定版）

### 基本形式

```
@figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework?node-id=2-1446
@file docs/user-stories/hero-block.md

上記のFigmaデザインとUserStoryを基に、EDS Blockを生成してください。

生成ファイル:
- blocks/hero/hero.js
- blocks/hero/hero.css
- blocks/hero/hero.stories.js

要件:
- Figma Variantsに対応したStorybook Storiesを作成
- Visual Regressionテスト対応（各Variant → 1 Story Export）
- WCAG AA アクセシビリティ準拠
```

### 簡略版

```
@figma {FIGMA_URL}
@file {USER_STORY_PATH}

Generate EDS Block
```

---

## 🔧 利用可能なコマンド

```bash
# Storybook起動
npm run storybook

# Storybookビルド
npm run build-storybook

# Linting
npm run lint
npm run lint:fix

# Chromatic実行（ローカルテスト）
npm run chromatic

# Chromatic E2Eテスト
npm run chromatic:e2e

# Figma MCP セットアップ
cd .mcp-setup
./setup-figma-mcp.sh

# Figma MCP 検証
./verify-setup.sh
```

---

## 📁 プロジェクト構造

```
d2c/
├── .cursorrules                        # AI自動生成ルール ⭐
├── BLOCK-GENERATION-GUIDE.md           # Block生成包括ガイド ⭐
├── VISUAL-REGRESSION-STRATEGY.md       # Visual Regression戦略 ⭐
├── FIGMA-MCP-INTEGRATION.md           # Figma MCP設計書
├── FIGMA-MCP-QUICKSTART.md            # クイックスタート
├── .mcp-setup/                        # Figma MCP セットアップ
│   ├── README.md
│   ├── setup-figma-mcp.sh            # 自動セットアップ
│   ├── verify-setup.sh               # 検証スクリプト
│   ├── mcp.json.template             # MCP設定テンプレート
│   └── VERIFICATION.md               # 検証結果
├── .storybook/                        # Storybook設定
│   ├── main.js
│   └── preview.js
├── blocks/                            # EDS Blocks
│   └── hero/                         # サンプルBlock
│       ├── hero.js
│       ├── hero.css
│       └── hero.stories.js           # Storybook Story
├── docs/                              # ドキュメント
│   └── user-stories/                 # User Story
│       └── hero-block.md
├── prompts/                           # プロンプトテンプレート
│   └── generate-block-from-figma.md
├── styles/                            # グローバルスタイル
│   └── styles.css                    # Design Tokens
├── scripts/                           # ユーティリティ
│   └── aem.js                        # EDS ヘルパー関数
└── package.json                       # npm 設定
```

---

## 🎉 新規追加ファイル（今回作成）

1. **`.cursorrules`** (5.4KB)
   - Figma MCP統合ワークフロー定義
   - AI自動生成ルール
   - プロンプト形式定義

2. **`BLOCK-GENERATION-GUIDE.md`** (16KB)
   - JavaScript/CSS/Storybook実装要件
   - Figma → Code マッピング戦略
   - プロダクションチェックリスト

3. **`VISUAL-REGRESSION-STRATEGY.md`** (13KB)
   - Story Export = Snapshot 原則
   - Figma Variant → Story Export マッピング
   - ベストプラクティス集

---

## 🚀 今すぐできること

1. **Storybookを起動して確認**:
   ```bash
   cd /Users/dmurata/Documents/Dev/d2c
   npm run storybook
   ```

2. **Figma MCPでデザイン取得テスト**:
   ```
   @figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework?node-id=2-1446
   
   このFigmaコンポーネントの情報を取得してください
   ```

3. **Block生成プロンプト実行**:
   ```
   @figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/...?node-id=2-1446
   @file docs/user-stories/hero-block.md
   
   Generate EDS Block
   ```

---

**更新日**: 2026-01-13 11:52 JST
**ステータス**: ガイドファイル作成完了、Storybook起動確認待ち
