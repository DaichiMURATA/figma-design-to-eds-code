# フロントエンドの不具合撲滅運動 - ロードマップ

## 🎯 憲章

**AEMのEDSを利用したサイト構築において、EDS Blockの開発・改修によるUI不具合を無くす仕組みを構築し、Gitプロジェクトのテンプレートとして各構築プロジェクトが参照できるものを作る**

---

## 📊 実現したいシナリオ（全体像）

### 1. デザイン・要件からのコード生成

- ✅ **MCP経由でFigmaデザインを取得**
  - Figma Personal Access Token (PAT) による API 認証
  - デザイントークン（Colors, Typography, Spacing など）の自動抽出
  - コンポーネント構造の解析

- ✅ **UserStory（markdown）を参照（オプション）**
  - Figma のみでのブロック生成も可能
  - UserStory がある場合は追加の要件や検証シナリオを反映

- ✅ **双方を設計書としてコード生成**
  - EDS Block 実装コード（`.js`, `.css`）
  - Storybook Story（`.stories.js`）
  - Adobe EDS Block Collection のパターンに準拠

### 2. Storybookコード生成

- ✅ **実装コード + Storybook用コード**
  - Block の JavaScript ロジック
  - Figma デザインに基づく CSS スタイル
  - Storybook Story の自動生成

- ✅ **StorybookのStory：FigmaのVariant定義粒度で作成**
  - 1:1 マッピング: Figma Variant = Storybook Story
  - Component Set の Variant を検出して Story を生成
  - Sample Instances がある場合はそれも Story 化

- ✅ **UserStoryから追加検証バリエーションを識別・追加（オプション）**
  - エラーケース、エッジケース
  - ユーザーインタラクションシナリオ

### 3. Visual Regressionテスト（2層構造）

- ✅ **Layer 1: Storybook Component Testing**
  - 変更された Block のみをテスト（変更差分検出）
  - Chromatic による自動スナップショット比較
  - WCAG 2.1 Level AA アクセシビリティテスト
  - 自動ドキュメント生成

- ✅ **Layer 2: Playwright E2E Page Testing**
  - 設定ファイル（`chromatic-pages.config.json`）で管理
  - 事前定義された重要ページのフルページテスト
  - デスクトップ・モバイル両対応

### 4. PR承認フロー

- ✅ **PRコメントからChromaticビルド画面に遷移**
  - Layer 1（Storybook）と Layer 2（Playwright）の両方のリンク
  - ビルド番号と URL が自動的にコメントされる

- ✅ **Diffを確認**
  - Chromatic の 1up/2up ビューで視覚的差分を確認
  - 変更の Accept/Reject をオンラインで実施

- ✅ **PR承認時に develop ブランチで baseline を更新**
  - PR マージ時に自動的に Chromatic baseline を更新
  - `--auto-accept-changes` による自動承認
  - 次の PR は新しい baseline と比較される

- ✅ **PR Description 自動生成**
  - ブランチ名から AEM.live Preview URL を自動生成
  - `Test URL:` 形式で aem-psi-check に対応
  - `aem.page`（開発用）と `aem.live`（本番用）の両方を提供

### 5. 品質テスト機能

- ✅ **Accessibility Testing (A11y)**
  - Storybook の `@storybook/addon-a11y` による自動チェック
  - WCAG 2.1 Level AA 準拠
  - カラーコントラスト、ARIA 属性、キーボードナビゲーション検証

- ✅ **Documentation Generation**
  - コンポーネントの使い方を自動文書化
  - JSDoc コメントから自動生成
  - 目次（TOC）付き

- 🔜 **Interaction Testing（将来追加予定）**
  - ユーザー操作のシミュレーション
  - `@storybook/addon-interactions` による自動テスト
  - Storybook 9.x 安定版リリース後に実装予定

---

## 🔧 技術スタック

| レイヤー | ツール | 用途 |
|---------|--------|------|
| **デザイン** | Figma (MCP) | デザイン取得、Variant定義、デザイントークン抽出 |
| **要件** | Markdown | UserStory、テストシナリオ（オプション） |
| **コード生成** | AI (Cursor) | Block実装、Story生成、EDS Block Collection準拠 |
| **Component Test** | Storybook 9.x | UI開発、Visual Regression、A11y テスト |
| **E2E Test** | Playwright | ページレベル Visual Regression |
| **Visual Regression** | Chromatic | スナップショット比較、Diffレビュー、Baseline管理 |
| **CI/CD** | GitHub Actions | 自動テスト、PR コメント、Baseline更新 |
| **Linting** | ESLint, Stylelint | コード品質チェック |

### 主要な依存関係

```json
{
  "devDependencies": {
    "@chromatic-com/playwright": "^0.12.8",
    "@chromatic-com/storybook": "^4.1.3",
    "@playwright/test": "^1.45.3",
    "@storybook/addon-a11y": "^9.1.17",
    "@storybook/addon-docs": "^9.1.17",
    "@storybook/html-vite": "^9.1.17",
    "chromatic": "^13.3.5",
    "eslint": "8.57.1",
    "playwright": "^1.45.3",
    "storybook": "^9.1.17",
    "stylelint": "16.26.1"
  }
}
```

---

## 📂 プロジェクト構成

```
/Users/dmurata/Documents/Dev/d2c/
  ├── blocks/              # EDS Blocks
  │   └── {block}/
  │       ├── {block}.js          # Block 実装
  │       ├── {block}.css         # Block スタイル
  │       └── {block}.stories.js  # Storybook Story (Figma Variant 対応)
  │
  ├── scripts/
  │   └── extract-figma-tokens.js # Figma Variables → CSS Custom Properties
  │
  ├── tests/
  │   ├── chromatic.spec.js       # Layer 2 (Playwright E2E)
  │   └── chromatic-pages.config.json # テスト対象ページ定義
  │
  ├── styles/
  │   ├── styles.css              # グローバルスタイル
  │   └── design-tokens.css       # Figma から抽出した Design Tokens
  │
  ├── .storybook/                 # Storybook 設定
  │   ├── main.js                 # アドオン設定 (a11y, docs, chromatic)
  │   └── preview.js              # A11y ルール、Chromatic パラメータ
  │
  ├── .github/
  │   ├── pull_request_template.md        # PR テンプレート
  │   └── workflows/
  │       ├── chromatic-two-layer.yml     # Layer 1 + Layer 2 統合
  │       └── auto-pr-description.yml     # Preview URL 自動生成
  │
  ├── tools/sidekick/              # AEM Sidekick 設定
  │   ├── config.json              # Sidekick 基本設定
  │   ├── library.html             # Library UI カスタマイズ
  │   └── library.json             # ブロックカタログ定義
  │
  ├── chromatic.config.json        # Chromatic CLI 設定
  ├── chromatic.config.js          # Playwright Chromatic 設定
  ├── chromatic-pages.config.json  # E2E テスト対象ページ定義
  │
  ├── .cursorrules                 # AI コード生成ルール
  ├── BLOCK-GENERATION-GUIDE.md    # Block 生成ガイド
  ├── FIGMA-DESIGN-GUIDELINES.md   # Figma デザインガイドライン
  ├── FIGMA-VARIANTS-1TO1-DECISION.md # Variant マッピング決定記録
  ├── QUALITY-TESTING-GUIDE.md     # 品質テスト機能ガイド
  ├── PR-DESCRIPTION-AUTO-UPDATE-GUIDE.md # PR URL 自動生成ガイド
  └── VISUAL-REGRESSION-STRATEGY.md # Visual Regression 戦略
```

---

## 📚 主要ドキュメント

### コード生成

- `.cursorrules` - AI コード生成ルール（EDS Block Collection 準拠）
- `BLOCK-GENERATION-GUIDE.md` - Block 生成の詳細ガイド
- `FIGMA-DESIGN-GUIDELINES.md` - デザイナー向け Figma ガイドライン
- `FIGMA-VARIANTS-1TO1-DECISION.md` - Figma Variant と Story の 1:1 マッピング決定記録
- `EDS-BLOCK-COLLECTION-REFERENCE.md` - 標準 Block パターン参照

### Visual Regression Testing

- `VISUAL-REGRESSION-STRATEGY.md` - 2層 VR 戦略の詳細
- `CHROMATIC-PLAYWRIGHT-SETUP.md` - Playwright Chromatic プロジェクト設定
- `CHROMATIC-PAGES-CONFIG.md` - E2E テスト対象ページ管理

### 品質テスト

- `QUALITY-TESTING-GUIDE.md` - A11y テスト、ドキュメント生成、今後の追加機能

### PR ワークフロー

- `PR-DESCRIPTION-AUTO-UPDATE-GUIDE.md` - Preview URL 自動生成の仕組み

### Figma 連携

- `FIGMA-MCP-QUICKSTART.md` - Figma MCP セットアップクイックスタート
- `FIGMA-VARIABLES-TO-CSS.md` - Figma Variables 抽出と CSS 変換

---

## 🚀 使い方

### 1. 新しい Block を生成

```bash
# Figma のみから生成（最もシンプル）
@figma https://www.figma.com/design/{file-id} Generate EDS Block for "BlockName"

# Figma + UserStory から生成
@figma https://www.figma.com/design/{file-id}
@docs/user-stories/block-name.md
Generate EDS Block for "BlockName"
```

### 2. Storybook で開発

```bash
npm run storybook
# → http://localhost:6006
```

- **Canvas タブ**: コンポーネントのプレビュー
- **Accessibility タブ**: A11y チェック結果
- **Docs タブ**: 自動生成されたドキュメント

### 3. PR を作成

```bash
git checkout -b feature-new-block
git add blocks/new-block/
git commit -m "feat: Add new block"
git push origin feature-new-block
gh pr create --title "feat: Add new block" --base develop --web
```

PR 作成時に自動的に：
- Preview URL（`aem.page` と `aem.live`）が Description に追加される
- Layer 1（Storybook）と Layer 2（Playwright）の Chromatic テストが実行される
- PR コメントに Chromatic Build リンクが投稿される

### 4. Chromatic で Diff を確認

PR コメントのリンクから Chromatic Dashboard へ：
- 変更された Block の Story を確認（Layer 1）
- 重要ページのスクリーンショットを確認（Layer 2）
- 変更を Accept または Reject

### 5. PR をマージ

PR マージ時に自動的に：
- `develop` ブランチの Chromatic baseline が更新される
- 次の PR はこの新しい baseline と比較される

---

## 🎯 プロジェクトの現在地

### ✅ 完成している機能

| 機能 | 状態 | ドキュメント |
|------|------|-------------|
| Figma MCP 統合 | ✅ | `FIGMA-MCP-QUICKSTART.md` |
| Figma Design Token 抽出 | ✅ | `FIGMA-VARIABLES-TO-CSS.md` |
| Block コード生成（Figma のみ） | ✅ | `BLOCK-GENERATION-GUIDE.md` |
| Block コード生成（Figma + UserStory） | ✅ | `BLOCK-GENERATION-GUIDE.md` |
| Figma Variant → Storybook Story（1:1） | ✅ | `FIGMA-VARIANTS-1TO1-DECISION.md` |
| Layer 1: Storybook Visual Regression | ✅ | `VISUAL-REGRESSION-STRATEGY.md` |
| Layer 2: Playwright E2E Visual Regression | ✅ | `CHROMATIC-PLAYWRIGHT-SETUP.md` |
| Chromatic 2層統合ワークフロー | ✅ | `.github/workflows/chromatic-two-layer.yml` |
| PR コメント自動投稿 | ✅ | `chromatic-two-layer.yml` |
| Baseline 自動更新（develop マージ時） | ✅ | `chromatic-two-layer.yml` |
| Accessibility Testing (A11y) | ✅ | `QUALITY-TESTING-GUIDE.md` |
| Documentation Generation | ✅ | `QUALITY-TESTING-GUIDE.md` |
| PR Description 自動生成（Preview URL） | ✅ | `PR-DESCRIPTION-AUTO-UPDATE-GUIDE.md` |
| aem-psi-check 対応 | ✅ | `PR-DESCRIPTION-AUTO-UPDATE-GUIDE.md` |
| ESLint / Stylelint 設定 | ✅ | `.eslintrc.cjs`, `.stylelintrc.json` |
| Sidekick Library 統合 | ✅ | `tools/sidekick/library.json` |

### 🔜 今後追加予定の機能

| 機能 | 優先度 | 実装時期 |
|------|--------|---------|
| Interaction Testing | 高 | Storybook 9.x 安定版リリース後（2026年Q2予定） |
| Responsive Design Testing | 中 | 必要に応じて |
| Performance Measurement | 低 | 必要に応じて |

---

## 💡 テンプレートとして使用する方法

このプロジェクト（`d2c`）は、他の AEM EDS プロジェクトのテンプレートとして使用できます。

### 1. プロジェクトをクローン

```bash
git clone https://github.com/DaichiMURATA/d2c.git your-project-name
cd your-project-name
```

### 2. リポジトリ情報を更新

以下のファイルのリポジトリ名と Owner を更新：

- `.github/workflows/chromatic-two-layer.yml`
- `.github/workflows/auto-pr-description.yml`
- `.github/pull_request_template.md`
- `chromatic-pages.config.json`
- `chromatic.config.js`
- `tests/chromatic.spec.js`
- `tools/sidekick/config.json`

### 3. Chromatic プロジェクトを作成

- [Chromatic](https://www.chromatic.com/) でアカウント作成
- 2つのプロジェクトを作成:
  - Storybook 用（Layer 1）
  - Playwright 用（Layer 2）
- Project Token と App ID を取得

### 4. GitHub Secrets/Variables を設定

**Secrets:**
- `CHROMATIC_STORYBOOK_TOKEN`
- `CHROMATIC_PLAYWRIGHT_TOKEN`

**Variables:**
- `CHROMATIC_STORYBOOK_APP_ID`
- `CHROMATIC_PLAYWRIGHT_APP_ID`

### 5. Figma アクセストークンを設定

```bash
export FIGMA_ACCESS_TOKEN="your-figma-token"
```

### 6. 依存関係をインストール

```bash
npm install
```

### 7. Storybook を起動して動作確認

```bash
npm run storybook
```

---

## 📝 更新履歴

- **2026-01-15**: aem-psi-check 対応、PR Description 自動生成機能追加
- **2026-01-15**: Accessibility Testing (A11y) と Documentation Generation 追加
- **2026-01-15**: Storybook 9.x 互換性修正（`element` → `context` パラメータ）
- **2026-01-15**: リポジトリ名を `figma-design-to-eds-code` から `d2c` に変更
- **2026-01-15**: ESLint / Stylelint 設定完了、デフォルトブランチを `develop` に変更
- **2026-01-09**: Layer 1 (Storybook) と Layer 2 (Playwright) の Chromatic 統合完了
- **2026-01-09**: Figma Variant → Storybook Story 1:1 マッピング決定
- **2026-01-08**: Figma Design Token 抽出機能実装
- **2026-01-08**: Figma MCP 統合完了
- **2026-01-07**: Block コード生成機能（Figma のみ）実装完了

---

**プロジェクト**: フロントエンドの不具合撲滅運動  
**テンプレート**: `d2c` (Design to Code)  
**現在地**: 全機能実装完了、テンプレート化準備完了  
**最終ゴール**: 各 AEM EDS 構築プロジェクトへの展開と不具合ゼロの実現
