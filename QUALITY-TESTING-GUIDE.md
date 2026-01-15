# Quality Testing Guide - Chromatic & Storybook 統合

## 📋 目次

- [概要](#概要)
- [実装済み機能](#実装済み機能)
- [追加された品質テスト機能](#追加された品質テスト機能)
- [使用方法](#使用方法)
- [アクセシビリティテスト](#アクセシビリティテスト)
- [今後追加可能な機能](#今後追加可能な機能)
- [トラブルシューティング](#トラブルシューティング)

---

## 概要

このプロジェクトは、**Chromatic** と **Storybook** を統合した包括的な品質テストシステムを構築しています。

### テスト戦略

```
┌─────────────────────────────────────────────────────────────┐
│                    Two-Layer Testing                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: Storybook Components (変更されたブロックのみ)      │
│  ├── Visual Regression Testing                             │
│  ├── Accessibility Testing (A11y)                          │
│  ├── Documentation Generation                              │
│  └── Responsive Design Testing                             │
│                                                             │
│  Layer 2: Playwright E2E Pages (設定ファイルベース)         │
│  ├── Full Page Visual Regression                           │
│  └── Cross-Browser Testing                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 実装済み機能

### ✅ 1. Visual Regression Testing

**Layer 1: Storybook**
- コンポーネント単位のスクリーンショット比較
- 変更されたブロックのみを自動検出してテスト
- Figma Variant に対応した Story 粒度

**Layer 2: Playwright**
- ページ単位のスクリーンショット比較
- `chromatic-pages.config.json` で管理
- デスクトップ・モバイル両対応

### ✅ 2. Accessibility Testing (A11y)

**実装状況:** ✅ 完了

**機能:**
- WCAG 2.1 Level AA 準拠チェック
- カラーコントラスト検証
- ARIA 属性の検証
- キーボードナビゲーション検証
- スクリーンリーダー対応検証

**設定ファイル:**
- `.storybook/main.js` - アドオン有効化
- `.storybook/preview.js` - デフォルトルール設定

**実装方法:**

```javascript
// .storybook/main.js
addons: [
  '@storybook/addon-a11y',  // ✅ 有効化済み
  '@storybook/addon-docs',
  '@chromatic-com/storybook',
],
```

```javascript
// .storybook/preview.js
parameters: {
  a11y: {
    config: {
      rules: [
        { id: 'color-contrast', enabled: true },
        { id: 'aria-*', enabled: true },
        { id: 'keyboard', enabled: true },
      ],
    },
  },
},
```

### ✅ 3. Documentation Generation

**実装状況:** ✅ 完了

**機能:**
- コンポーネントの使い方を自動文書化
- Props の説明
- 使用例のコードスニペット
- 目次 (TOC) 自動生成

**設定:**

```javascript
// .storybook/preview.js
parameters: {
  docs: {
    toc: true,  // 目次を自動生成
  },
},
```

---

## 追加された品質テスト機能

### 🆕 アクセシビリティテスト (A11y)

#### 使い方

**1. Storybook を起動:**

```bash
npm run storybook
```

**2. ブラウザで確認:**

Storybook を開くと、各 Story に **"Accessibility"** タブが表示されます：

```
┌─────────────────────────────────────┐
│ Canvas  │  Docs  │  Accessibility  │
├─────────────────────────────────────┤
│                                     │
│  ✅ Passes: 12                      │
│  ❌ Violations: 2                   │
│  ⚠️  Incomplete: 1                  │
│                                     │
│  📋 Detailed Report:                │
│  ├── Color Contrast                 │
│  │   ✅ Pass                        │
│  ├── ARIA Attributes                │
│  │   ❌ Violation: Missing label   │
│  └── Keyboard Navigation            │
│      ✅ Pass                        │
│                                     │
└─────────────────────────────────────┘
```

**3. Chromatic で自動実行:**

PR 作成時に Chromatic が自動的にアクセシビリティチェックを実行します。

```yaml
# .github/workflows/chromatic-two-layer.yml
# Layer 1 で自動的に A11y テストが実行される
```

#### アクセシビリティ違反の修正例

**違反例: カラーコントラスト不足**

```css
/* ❌ 修正前 */
.button {
  background-color: #cccccc;
  color: #ffffff;
  /* コントラスト比: 2.3:1 (WCAG AA 基準: 4.5:1) */
}

/* ✅ 修正後 */
.button {
  background-color: #6c757d;
  color: #ffffff;
  /* コントラスト比: 4.6:1 (WCAG AA 準拠) */
}
```

**違反例: ARIA 属性の欠落**

```javascript
// ❌ 修正前
const button = document.createElement('button');
button.textContent = '+';
button.addEventListener('click', toggleAccordion);

// ✅ 修正後
const button = document.createElement('button');
button.textContent = '+';
button.setAttribute('aria-expanded', 'false');
button.setAttribute('aria-controls', `accordion-content-${id}`);
button.setAttribute('aria-label', 'Toggle accordion section');
button.addEventListener('click', toggleAccordion);
```

#### Story ごとにカスタマイズ

特定の Story で A11y ルールをカスタマイズする場合：

```javascript
export const MyStory = {
  render: () => Template(),
  parameters: {
    a11y: {
      config: {
        rules: [
          // 特定のルールを無効化（理由がある場合のみ）
          { id: 'color-contrast', enabled: false },
        ],
      },
    },
  },
};
```

---

## 今後追加可能な機能

### 🔜 1. インタラクションテスト (優先度: 高)

**パッケージ:** `@storybook/addon-interactions` (Storybook 9.x では alpha)

**機能:**
- ユーザー操作のシミュレーション
- クリック、入力、ホバーなどのテスト
- アサーション（期待される動作の検証）

**実装例:**

```javascript
import { userEvent, within, expect } from '@storybook/test';

export const AccordionInteraction = {
  render: () => Template(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 1. アコーディオンボタンをクリック
    const button = canvas.getByRole('button', { name: /toggle accordion/i });
    await userEvent.click(button);
    
    // 2. コンテンツが表示されることを検証
    const content = canvas.getByRole('region');
    await expect(content).toBeVisible();
    
    // 3. ARIA 属性が更新されることを検証
    await expect(button).toHaveAttribute('aria-expanded', 'true');
  },
};
```

**メリット:**
- ユーザー体験の自動検証
- リグレッション防止
- インタラクションのドキュメント化

**実装時期:**
- Storybook 9.x の安定版リリース後（推定: 2026年Q2）

---

### 🔜 2. レスポンシブデザインテスト (優先度: 中)

**パッケージ:** `@storybook/addon-viewport` (Storybook 8.x では利用可能)

**機能:**
- 複数のビューポートサイズでプレビュー
- モバイル、タブレット、デスクトップ

**実装例:**

```javascript
// .storybook/preview.js
export default {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
      defaultViewport: 'desktop',
    },
  },
};
```

**Chromatic 統合:**

```javascript
export const MyStory = {
  render: () => Template(),
  parameters: {
    chromatic: {
      viewports: [375, 768, 1200], // 3つのビューポートでスナップショット
    },
  },
};
```

---

### 🔜 3. パフォーマンス測定 (優先度: 低)

**パッケージ:** `storybook-addon-performance` (コミュニティ)

**機能:**
- レンダリング時間の測定
- 再レンダリングの検出
- メモリ使用量の監視

---

## 使用方法

### ローカル開発

**1. Storybook を起動:**

```bash
npm run storybook
```

ブラウザで `http://localhost:6006` を開きます。

**2. アクセシビリティチェック:**

各 Story の **"Accessibility"** タブで確認します。

**3. ドキュメント確認:**

各 Story の **"Docs"** タブで自動生成されたドキュメントを確認します。

### CI/CD (GitHub Actions)

**PR 作成時:**

```bash
# 自動的に実行される
1. Layer 1: Storybook Components
   - Visual Regression
   - Accessibility Testing ✅
   - Documentation Generation ✅

2. Layer 2: Playwright E2E
   - Full Page Visual Regression
```

**PR コメント例:**

```markdown
🎨 Chromatic Two-Layer Visual Testing Results

Layer 1: Storybook Component Testing (Changed Blocks Only)
✅ Executed - Changed block stories tested
🔗 View Chromatic Build #42 →
Stories tested:
⚡ Only changed blocks are tested for efficiency
🔍 Accessibility: 12 passes, 0 violations

Layer 2: Playwright E2E Page Testing (Config-Based)
✅ Executed - E2E pages tested
🔗 View Chromatic Build #43 →
Screenshots captured and available in artifacts
📄 Test pages defined in chromatic-pages.config.json
```

---

## アクセシビリティテスト

### WCAG 2.1 Level AA 準拠

以下の基準を自動的にチェックします：

#### 1. **知覚可能 (Perceivable)**

- **カラーコントラスト**: テキストと背景のコントラスト比が 4.5:1 以上
- **テキストのサイズ変更**: 200% まで拡大しても読める
- **画像の代替テキスト**: すべての画像に `alt` 属性

#### 2. **操作可能 (Operable)**

- **キーボード操作**: すべての機能がキーボードでアクセス可能
- **フォーカス可視**: フォーカス状態が視覚的に明確
- **時間制限なし**: タイムアウトなし（または延長可能）

#### 3. **理解可能 (Understandable)**

- **言語指定**: `lang` 属性で言語を明示
- **ラベル**: フォーム要素に明確なラベル
- **エラーメッセージ**: エラーが明確に伝わる

#### 4. **堅牢性 (Robust)**

- **ARIA 属性**: 正しい ARIA 属性の使用
- **有効な HTML**: 構文エラーなし

### 検証ツール

Storybook の A11y アドオンは、以下のツールを統合しています：

- **axe-core**: Deque Systems 製のアクセシビリティエンジン
- **WCAG 2.1**: Web Content Accessibility Guidelines
- **Section 508**: アメリカのアクセシビリティ基準

---

## トラブルシューティング

### A11y 違反が多すぎる

**問題:** 既存のコードで多数のアクセシビリティ違反が検出される。

**解決策:**

1. **段階的な修正:**
   - 重大度の高い違反から優先的に修正
   - 新規ブロックは必ず A11y 準拠で作成

2. **一時的な除外:**
   - 既存ブロックの Story で一時的にルールを無効化
   - 修正予定を TODO コメントで記載

```javascript
export const LegacyBlock = {
  render: () => Template(),
  parameters: {
    a11y: {
      config: {
        rules: [
          // TODO: カラーコントラストを修正後に有効化
          { id: 'color-contrast', enabled: false },
        ],
      },
    },
  },
};
```

### Storybook が起動しない

**問題:** `npm run storybook` でエラーが発生する。

**解決策:**

```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
npm run storybook
```

### Chromatic でアクセシビリティ結果が表示されない

**問題:** Chromatic ダッシュボードで A11y 結果が見えない。

**解決策:**

- Chromatic の A11y 機能は **有料プラン** で利用可能です。
- 無料プランでは、ローカル Storybook での確認のみとなります。

---

## まとめ

### 現在利用可能な品質テスト機能

| 機能 | 状態 | Layer | 効果 |
|------|------|-------|------|
| Visual Regression | ✅ 実装済み | 1 & 2 | ⭐⭐⭐ |
| Accessibility (A11y) | ✅ 実装済み | 1 | ⭐⭐⭐ |
| Documentation | ✅ 実装済み | 1 | ⭐⭐ |
| Interaction Tests | 🔜 将来 | 1 | ⭐⭐⭐ |
| Responsive Testing | 🔜 将来 | 1 | ⭐⭐ |
| Performance | 🔜 将来 | 1 | ⭐ |

### 推奨ワークフロー

1. **ブロック開発時:**
   - Storybook を起動して開発
   - Accessibility タブで A11y 準拠を確認
   - Docs タブでドキュメントを確認

2. **PR 作成前:**
   - ローカルで Storybook を確認
   - A11y 違反がないことを確認

3. **PR 作成後:**
   - Chromatic の Visual Regression 結果を確認
   - PR コメントのリンクから Chromatic ダッシュボードへ

4. **PR マージ後:**
   - `develop` ブランチの Baseline が自動更新される

---

## 参考リンク

- [Storybook A11y Addon](https://storybook.js.org/addons/@storybook/addon-a11y)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Chromatic Documentation](https://www.chromatic.com/docs/)
