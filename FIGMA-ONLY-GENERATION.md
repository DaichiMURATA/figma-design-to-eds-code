# Figma Only 生成対応 - 更新サマリー

## ✅ 更新完了

### 1. `.cursorrules` 更新
- **Option A: Figma Only (Simplest)** を追加
- User Storyはオプショナルに変更
- Figmaのみで要件を推論するロジックを追加

### 2. `BLOCK-GENERATION-GUIDE.md` 更新
- Quick Referenceに「Figma only」パターンを追加
- User Story無しでの要件推論方法を明記

### 3. `prompts/generate-block-from-figma.md` 更新
- Option 1: Figma Only テンプレート追加
- Option 2: Figma + User Story を推奨オプションとして明記
- 使用例にFigma Onlyパターンを追加

---

## 🎯 新しい使用方法

### Figma Onlyで生成（最もシンプル）

```
@figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework?node-id=2-1446

Generate EDS Block for "Accordion"
```

**AIが自動で行うこと:**
1. Figmaコンポーネント名から Block名を推定（"Accordion" → `accordion`）
2. Figma Variantsから Story variantsを生成
3. コンポーネント構造からインタラクション要件を推論
4. 標準的なアクセシビリティパターン（WCAG AA）を適用
5. 類似する既存ブロックパターンを参照

**生成されるファイル:**
- `blocks/accordion/accordion.js`
- `blocks/accordion/accordion.css`
- `blocks/accordion/accordion.stories.js`

---

### Figma + User Story（複雑なBlockに推奨）

```
@figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/...?node-id=2-1446
@file docs/user-stories/hero-block.md

Generate EDS Block
```

**User Storyがある場合の追加メリット:**
- 詳細な機能要件を反映
- カスタムなインタラクション要件
- 特定のエッジケース対応
- プロジェクト固有のテストシナリオ

---

## 📋 要件推論ロジック（Figma Onlyの場合）

### コンポーネント名から推論

Block名を**EDS Block Collection**の標準パターンにマッピング：

- **Accordion** → 展開/折りたたみ機能、キーボードナビゲーション、ARIA accordion pattern
  - 参照: https://github.com/adobe/aem-block-collection/tree/main/blocks/accordion
  
- **Tabs** → タブ切り替え、ARIA tablist/tab/tabpanel pattern
  - 参照: https://github.com/adobe/aem-block-collection/tree/main/blocks/tabs
  
- **Carousel** → 前後ナビゲーション、自動再生（オプション）、ARIA carousel pattern
  - 参照: https://github.com/adobe/aem-block-collection/tree/main/blocks/carousel
  
- **Hero** → ヒーローセクション、CTAボタン、大きな画像/動画サポート
  - 標準的なヒーローセクションパターン
  
- **Cards** → カードレイアウト、グリッド配置、セマンティックリスト構造
  - 参照: https://github.com/adobe/aem-block-collection/tree/main/blocks/cards

**参考リソース:**
- AEM Block Collection: https://github.com/adobe/aem-block-collection
- AEM.live Documentation: https://www.aem.live/docs/

### Figma Variantsから推論
- **Layout: Default, Compact, FullWidth** → Layout variant Stories
- **Theme: Light, Dark** → Theme variant Stories
- **Size: Small, Medium, Large** → Size variant Stories
- **HasImage: True, False** → Content variant Stories

### インタラクション要件の推論
- ボタン要素 → クリックイベント、キーボード操作（Enter/Space）
- パネル要素 → 表示/非表示切り替え、ARIA hidden
- リスト要素 → セマンティックHTML（`<ul>`, `<li>`）
- 画像要素 → `createOptimizedPicture()` 使用

### アクセシビリティの推論
- インタラクティブ要素 → ARIA attributes（`aria-expanded`, `aria-controls`）
- パネル → `role="region"`, `aria-labelledby`
- ボタン → `<button>` 要素、focus indicators
- キーボードナビゲーション → Enter, Space, Arrow keys, Home, End

---

## 🔄 推論の優先順位

1. **Figma Component Name** → EDS Block Collection standard block type
2. **Figma Variants** → Storybook Stories
3. **Figma Variables (Design Tokens)** → CSS Custom Properties
4. **Component Structure** → HTML structure, interactions
5. **EDS Block Collection Patterns** → Standard implementation reference
   - GitHub: https://github.com/adobe/aem-block-collection
6. **EDS Standards** → Default accessibility (WCAG AA), performance
7. **AEM.live Documentation** → https://www.aem.live/docs/

---

## 💡 ベストプラクティス

### いつFigma Onlyを使うか
✅ 標準的なUIコンポーネント（Accordion, Tabs, Card, Hero）
✅ Figmaのデザインが完全で明確
✅ プロジェクト固有の特殊要件がない
✅ 迅速なプロトタイピング

### いつFigma + User Storyを使うか
✅ 複雑なビジネスロジック
✅ プロジェクト固有の要件
✅ 特殊なエッジケース対応
✅ 詳細なテストシナリオが必要
✅ チーム間の要件共有が必要

---

## 🚀 今すぐ試せます！

```
@figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework?node-id=2-1446

Generate EDS Block for "Accordion"
```

このプロンプトだけで、完全なEDS Blockが生成されます！

---

**更新日**: 2026-01-13 12:00 JST
**対応範囲**: Figma Only / Figma + User Story の両方に対応
