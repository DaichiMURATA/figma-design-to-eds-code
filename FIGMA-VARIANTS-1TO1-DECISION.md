# Figma Variants → Storybook Stories 方針確定

**日付:** 2026-01-13  
**決定事項:** Figma Variantsと完全に1:1対応するStory生成ルール

---

## 📋 確定した方針

### コード生成ルール
```
Figma Variants数 = Storybook Stories数 (1:1 mapping)
```

**原則:**
- ✅ **Figmaに定義されているもののみ生成**
- ✅ **推測や追加をしない** = シンプル&予測可能
- ✅ **すべての状態はFigma Variantsで表現**

---

## 🎯 採用理由

1. **Single Source of Truth**
   - Figmaがデザインと状態の唯一の真実
   - コードとデザインの一貫性を保証

2. **シンプルな生成ロジック**
   - コード生成側が「何を追加すべきか」を判断不要
   - 予測可能で再現性が高い

3. **デザイナー主導のテスト設計**
   - デザイナーがVariantsとして定義 = テストシナリオ
   - Focus/Hover/Error/Loading等、すべてデザインとして定義

4. **スケーラビリティ**
   - 新しい状態が必要 → Figmaに追加 → 自動生成
   - デザインシステムの進化に対応

---

## 📝 更新したドキュメント

### 1. `.cursorrules`
**変更内容:**
- Section 4の「STORYBOOK STORY GENERATION STRATEGY」を完全書き換え
- Figma Variantsとの1:1マッピングルールを明記
- 追加Story（edge cases, focus states等）を生成しないルールを追加

**キーポイント:**
```
❌ Do NOT add extra stories for edge cases
❌ Do NOT add extra stories for interaction states unless in Figma
❌ Do NOT add extra stories for responsive unless in Figma
```

### 2. `BLOCK-GENERATION-GUIDE.md`
**変更内容:**
- 「Story Variant Strategy for Visual Regression」セクションを更新
- Figma 1:1マッピングの具体例を追加
- Accordion blockの実例で説明

**Before:**
- 8-15 Story exportsが目標
- User Storyからも追加Storyを生成

**After:**
- Figma Variants数 = Story数（固定）
- 追加が必要ならFigmaを更新

### 3. `FIGMA-DESIGN-GUIDELINES.md` ✨ 新規作成
**目的:** デザイナー向けガイドライン

**内容:**
1. **Component Set構造**
   - 命名規則
   - Property定義方法

2. **必須Variants**
   - Interaction States (Default, Hover, Focus, Active, Disabled)
   - Content States (Empty, Error, Loading, Success)
   - Responsive Breakpoints (Desktop, Tablet, Mobile)
   - Content Variations (Minimal, Normal, Maximum)
   - Theme Variations (Light, Dark)

3. **Variant命名ベストプラクティス**
   - Property名: PascalCase、セマンティック
   - Value名: PascalCase、明確

4. **デザイントークン統合**
   - Figma Variables使用推奨
   - 自動抽出対応の命名規則

5. **アクセシビリティ要件**
   - WCAG AA準拠チェックリスト
   - Focus states必須
   - Color contrast要件

6. **具体例**
   - Button (Simple Component)
   - Accordion (Complex Component)

7. **FAQ**
   - Variant数の目安
   - 組み合わせ戦略

---

## 🔄 Accordion Blockへの適用

### 修正前（7 Stories - 間違い）
```javascript
export const Default
export const TwoItems
export const ManyItems
export const LongContent
export const RichContent
export const ExpandedState
export const AccessibilityShowcase
```

### 修正後（3 Stories - 正しい）
```javascript
// Figma Variant 1
export const Default = {
  // default, isOpen=false
};

// Figma Variant 2
export const HoverClosed = {
  // hover, isOpen=false
};

// Figma Variant 3
export const HoverExpanded = {
  // hover, isOpen=true
};
```

**結果:**
- 3 Stories × 2 viewports (375, 1200) = 6 Chromatic snapshots
- Figma Variantsと完全一致

---

## 📊 今後の運用

### デザイナーの作業フロー

1. **Figmaで Component Set作成**
   - Block名を決定（例: `Accordion`）
   - 必要なVariantsを定義
   - `FIGMA-DESIGN-GUIDELINES.md`を参照

2. **Variantsチェックリスト確認**
   - [ ] Interaction states (Default, Hover, Focus)
   - [ ] Content variations (Minimal, Normal, Maximum)
   - [ ] Responsive (Desktop, Tablet, Mobile) ※必要に応じて
   - [ ] Accessibility (Focus states, Color contrast)

3. **デザイン完了 → 開発に引き渡し**

### 開発者の作業フロー

1. **Figma URLを取得**
   ```
   https://www.figma.com/design/...?node-id=XXX
   ```

2. **自動生成コマンド実行**
   ```
   @figma https://www.figma.com/design/...?node-id=XXX
   
   Generate EDS Block for "Accordion"
   ```

3. **生成結果確認**
   - `blocks/accordion/accordion.js`
   - `blocks/accordion/accordion.css`
   - `blocks/accordion/accordion.stories.js`
   - Story数 = Figma Variants数を確認

4. **Storybook起動 → Visual確認**
   ```bash
   npm run storybook
   ```

5. **PR作成 → Chromatic VRテスト**

---

## ✅ 今回修正した問題

### 問題1: Story数の不一致
- **Before:** 7 Stories（推測で追加）
- **After:** 3 Stories（Figma Variantsと一致）

### 問題2: UIがFigmaと不一致
- **原因:** デザイントークン未使用、間違った色
- **修正:** `accordion.css`完全書き換え、デザイントークンエイリアス追加

### 問題3: デザイントークン活用不足
- **追加:** `design-tokens.css`に簡易エイリアス追加
  ```css
  --color-neutral-0: var(--color-neutral-white);
  --spacing-m: var(--spacing-scale-16);
  --font-family-body: var(--typography-family-jp-default);
  ```

---

## 🎯 次のアクション

### 短期（即実施）
1. ✅ `.cursorrules`更新完了
2. ✅ `BLOCK-GENERATION-GUIDE.md`更新完了
3. ✅ `FIGMA-DESIGN-GUIDELINES.md`作成完了
4. ⏳ `accordion.stories.js`が正しく動作するか確認（Storybook起動中）

### 中期（次のBlock生成時）
1. 新しいBlock（例: Hero, Tabs）をFigmaから生成
2. 1:1マッピングルールが正しく適用されるか検証
3. Chromatic VRテスト実行

### 長期（プロジェクト展開）
1. `FIGMA-DESIGN-GUIDELINES.md`をデザインチームと共有
2. Figma Component Libraryの標準化
3. 他プロジェクトへのテンプレート展開

---

## 📚 関連ドキュメント

- **`.cursorrules`** - AI生成ルール（開発者＆AI向け）
- **`BLOCK-GENERATION-GUIDE.md`** - Block生成の詳細ガイド（開発者向け）
- **`FIGMA-DESIGN-GUIDELINES.md`** - Figma作成ガイドライン（デザイナー向け）✨ NEW
- **`VISUAL-REGRESSION-STRATEGY.md`** - VR戦略
- **`FIGMA-MCP-INTEGRATION.md`** - Figma MCP技術仕様

---

## 💡 重要なポイント

> **"If you want it tested, define it as a Variant in Figma."**

この方針により:
- ✅ デザインとコードの完全な一貫性
- ✅ 予測可能な自動生成
- ✅ シンプルな運用
- ✅ スケーラブルなデザインシステム

**質問や改善提案があれば、このドキュメントを更新してください。**
