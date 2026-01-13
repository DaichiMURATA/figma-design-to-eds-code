# フロントエンドの不具合撲滅運動 - 次のアクション

## 🎯 現状サマリー

### ✅ 完了済み（my-websiteで検証）

1. **Layer 2: Playwright E2E + Chromatic**
   - EDS Branch URL対応
   - Chromatic統合
   - Baseline/PR分離戦略

2. **ワークフロー基盤**
   - `chromatic-baseline.yml`
   - `chromatic-pr.yml`
   - PRコメント自動投稿

### 📍 現在地

- **テンプレートプロジェクト**: `figma-design-to-eds-code/`
- **参照プロジェクト**: `ak-eds/`（Storybook完備）
- **次のステップ**: Layer 1（Storybook）の実装

---

## 🚀 今日のゴール: Storybookセットアップ

### ステップ1: 依存関係の追加

```bash
cd /Users/dmurata/Documents/Dev/figma-design-to-eds-code
npm install @storybook/addon-a11y@^9.0.16 @storybook/addon-docs@^9.0.11 @storybook/html-vite@^9.0.11 storybook@^9.0.11 msw-storybook-addon --save-dev
```

### ステップ2: Storybook設定ファイルの作成

`.storybook/main.js` と `.storybook/preview.js` を作成（ak-edsから移植）

### ステップ3: Hero BlockのStory作成

`blocks/hero/hero.stories.js` を作成

### ステップ4: 動作確認

```bash
npm run storybook
# http://localhost:6006 で確認
```

---

詳細は `ROADMAP.md` を参照してください。

**更新日**: 2026-01-09

