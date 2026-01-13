# フロントエンドの不具合撲滅運動 - 実装ロードマップ

## 🎯 憲章

**AEMのEDSを利用したサイト構築において、EDS Blockの開発・改修によるUI不具合を無くす仕組みを構築し、Gitプロジェクトのテンプレートとして各構築プロジェクトが参照できるものを作る**

---

## 📊 実現したいシナリオ（全体像）

### 1. デザイン・要件からのコード生成
- ✅ MCP経由でFigmaデザインを取得
- ✅ UserStory（markdown）を参照
- ✅ 双方を設計書としてコード生成（ak-eds踏襲）

### 2. Storybookコード生成
- ⏳ 実装コード + Storybook用コード
- ⏳ StorybookのStory：FigmaのVariant定義粒度で作成
- ⏳ UserStoryから追加検証バリエーションを識別・追加

### 3. PR時のVisual Regressionテスト（2層構造）
- ⏳ **Layer 1**: 変更BlockのStorybook（Chromatic & Storybook）
- ✅ **Layer 2**: 事前定義URLのE2E（Chromatic & Playwright）

### 4. PR承認フロー
- ✅ PRコメントからChromaticビルド画面に遷移
- ✅ Diffを確認
- ✅ PR承認時にmainブランチでbaselineを更新
- ⏳ ChromaticチェックをMandatory Stepに設定

---

## ✅ 既に実現済み（my-websiteで検証完了）

### Chromatic統合基盤

| 項目 | 状態 | 実装場所 |
|-----|------|---------|
| **Layer 2: Playwright E2E** | ✅ | `chromatic.config.js`, `tests/chromatic.spec.js` |
| **Baseline更新ワークフロー** | ✅ | `.github/workflows/chromatic-baseline.yml` |
| **PR用ワークフロー** | ✅ | `.github/workflows/chromatic-pr.yml` |
| **PRコメント自動投稿** | ✅ | `chromatic-pr.yml` (post-pr-comment job) |
| **Chromatic Build URL遷移** | ✅ | 正しいDiffビューに遷移 |
| **EDS Branch URL対応** | ✅ | `https://{branch}--{repo}--{owner}.{domain}/` |

### ワークフロー戦略

```
PR作成:
  → chromatic-pr.yml 実行
  → Layer 2 (Playwright E2E) テスト
  → Chromaticアップロード (--branch, --parent-branch)
  → PRコメント投稿
  → Diffレビュー

PRマージ (main):
  → chromatic-baseline.yml 実行
  → Baseline更新
  → 次のPRはこのbaselineと比較
```

---

## ⏳ これから実装すること

### Phase 1: Storybook統合（Layer 1の実装）

#### 1.1 Storybookセットアップ
- [ ] Storybookの依存関係追加
- [ ] `.storybook/` 設定ファイル作成
- [ ] EDS Block用のStorybook設定
- [ ] `npm run build-storybook` スクリプト追加

#### 1.2 サンプルBlockのStorybook作成
- [ ] 既存Block（例: `hero`）のStorybook Story作成
- [ ] Figma Variant相当のStory展開
- [ ] `argTypes` と `args` の定義

#### 1.3 Chromatic統合（Storybook）
- [ ] `chromatic-pr.yml` にLayer 1追加
- [ ] Storybook buildとChromatic upload
- [ ] Layer 1とLayer 2の並行実行

### Phase 2: 変更差分検出によるSmart実行

#### 2.1 変更Block検出スクリプト（ak-eds踏襲）
- [ ] `scripts/detect-changed-blocks.js` 移植
- [ ] Git diff解析
- [ ] 変更Blockリスト出力（JSON）

#### 2.2 変更BlockのみStorybookテスト
- [ ] `scripts/run-chromatic-smart.js` 移植
- [ ] 変更Blockに対応するStoryのみ実行
- [ ] グローバル変更時は全Block実行

#### 2.3 E2Eページ選択（Layer 2）
- [ ] `tests/pages-manifest.json` 作成
- [ ] `scripts/select-e2e-pages.js` 移植
- [ ] 変更Blockとページのマッピング

### Phase 3: Figma → コード生成の強化

#### 3.1 Figma Variant → Storybook Story生成
- [ ] Figma MCP経由でVariant情報取得
- [ ] Variant → Story export定義の自動生成
- [ ] `{block}.story.js` テンプレート生成

#### 3.2 UserStory → バリエーション追加
- [ ] UserStory markdown解析
- [ ] テストシナリオ抽出
- [ ] 追加Storyバリエーション提案

#### 3.3 コード生成ワークフロー
- [ ] Block実装コード生成（`.js`, `.css`）
- [ ] Storybook Story生成（`.story.js`）
- [ ] 生成ルールのドキュメント化

### Phase 4: PR承認フローの強化

#### 4.1 ChromaticチェックをMandatory化
- [ ] GitHub Branch Protection設定
- [ ] Required status checks: `Chromatic PR`
- [ ] ドキュメント化

#### 4.2 PR承認ガイドライン
- [ ] Chromatic Diffレビュー手順
- [ ] Accept/Rejectガイドライン
- [ ] エスカレーションフロー

#### 4.3 統合ドキュメント
- [ ] 開発者向けガイド
- [ ] レビュアー向けガイド
- [ ] トラブルシューティング

---

## 🏗️ プロジェクト構成

### テンプレートプロジェクト候補

```
/Users/dmurata/Documents/Dev/figma-design-to-eds-code/
  ├── blocks/              # EDS Blocks
  │   └── {block}/
  │       ├── {block}.js
  │       ├── {block}.css
  │       └── {block}.story.js  ← Storybook Story
  ├── scripts/
  │   ├── detect-changed-blocks.js
  │   ├── run-chromatic-smart.js
  │   └── select-e2e-pages.js
  ├── tests/
  │   ├── chromatic.spec.js      ← Layer 2 (Playwright)
  │   └── pages-manifest.json
  ├── .storybook/           ← Storybook設定
  ├── .github/workflows/
  │   ├── chromatic-baseline.yml
  │   └── chromatic-pr.yml       ← Layer 1 + Layer 2
  └── chromatic.config.js
```

### 参照プロジェクト

| プロジェクト | 参照箇所 |
|------------|---------|
| **ak-eds** | コード生成、Smart実行、2層戦略 |
| **eds-base-site** | Baseline/PR分離戦略、Storybook設定 |
| **my-website** | Playwright E2E、EDS URL対応 |

---

## 📅 実装優先順位

### 🚀 High Priority（Phase 1）

1. **Storybookセットアップ**
   - 理由: Layer 1の基盤となる
   - 期間: 1-2日
   - 依存: なし

2. **サンプルBlockのStory作成**
   - 理由: Layer 1の動作確認
   - 期間: 1日
   - 依存: Storybookセットアップ

3. **Layer 1のChromatic統合**
   - 理由: 2層戦略の完成
   - 期間: 1日
   - 依存: Storybook Story

### 🔄 Medium Priority（Phase 2）

4. **変更差分検出**
   - 理由: Smart実行によるCI時間短縮
   - 期間: 2-3日
   - 依存: Layer 1完成

5. **E2Eページ選択**
   - 理由: Layer 2の最適化
   - 期間: 1-2日
   - 依存: 変更差分検出

### 🎨 Low Priority（Phase 3-4）

6. **Figma → Story生成強化**
   - 理由: 開発効率向上（手動でも可能）
   - 期間: 3-5日
   - 依存: Storybook完成

7. **PR承認フロー強化**
   - 理由: 運用改善（基本機能は完成済み）
   - 期間: 1-2日
   - 依存: 全体完成

---

## 🎯 最初のマイルストーン（1週間目標）

### Goal: Layer 1（Storybook）の完成とChromatic統合

#### タスク

1. ✅ **Day 1**: Storybookセットアップ
   - 依存関係追加
   - `.storybook/` 設定
   - 動作確認（`npm run storybook`）

2. ✅ **Day 2**: サンプルStory作成
   - `hero` BlockのStory作成
   - 2-3のVariant作成
   - ローカルで動作確認

3. ✅ **Day 3**: Chromatic統合（Layer 1）
   - `chromatic-pr.yml` 更新
   - Layer 1 + Layer 2並行実行
   - PRでテスト

4. ✅ **Day 4-5**: テンプレート化
   - 他のBlockにも適用
   - ドキュメント整備
   - ak-edsへの適用検討

---

## 🔧 技術スタック

| レイヤー | ツール | 用途 |
|---------|--------|------|
| **デザイン** | Figma (MCP) | デザイン取得、Variant定義 |
| **要件** | Markdown | UserStory、テストシナリオ |
| **コード生成** | AI (Cursor) | Block実装、Story生成 |
| **Component Test** | Storybook | UI開発、Visual Regression |
| **E2E Test** | Playwright | ページレベルVisual Regression |
| **Visual Regression** | Chromatic | スナップショット比較、Diffレビュー |
| **CI/CD** | GitHub Actions | 自動テスト、Baseline更新 |

---

## 📚 参考ドキュメント

### 既存ドキュメント

- `ak-eds/.cursorrules` - コード生成ルール
- `ak-eds/VISUAL-REGRESSION-STRATEGY.md` - VR戦略
- `ak-eds/BLOCK-GENERATION-GUIDE.md` - Block生成ガイド
- `my-website/CHROMATIC-WORKFLOW-STRATEGY.md` - ワークフロー戦略
- `my-website/CHROMATIC-BASELINE-GUIDE.md` - Baseline管理

### 作成予定ドキュメント

- `figma-design-to-eds-code/GETTING-STARTED.md` - テンプレート利用ガイド
- `figma-design-to-eds-code/STORYBOOK-GUIDE.md` - Storybook作成ガイド
- `figma-design-to-eds-code/PR-WORKFLOW.md` - PR作成〜承認フロー

---

## 💡 次のアクション

### 即座に着手できること

1. **テンプレートプロジェクトの初期化**
   ```bash
   cd /Users/dmurata/Documents/Dev/figma-design-to-eds-code
   # Storybookセットアップ開始
   ```

2. **ak-edsからStorybookブロックを参照**
   ```bash
   cd /Users/dmurata/Documents/Customers/AK/ak-eds
   # 既存のStorybook設定を確認
   ```

3. **my-websiteのChromatic設定を移植**
   - `chromatic.config.js`
   - `chromatic-baseline.yml`
   - `chromatic-pr.yml`

---

**プロジェクト**: フロントエンドの不具合撲滅運動  
**現在地**: Layer 2（Playwright）完成、Layer 1（Storybook）着手準備完了  
**次のマイルストーン**: Layer 1のChromatic統合（1週間）  
**最終ゴール**: テンプレートプロジェクトの完成と各プロジェクトへの展開

---

**更新日**: 2026-01-09

