# 🔄 Reference Update: ak-eds → EDS Block Collection

## 変更内容サマリー

`ak-eds`プロジェクトへの参照を削除し、代わりに**Adobe EDS Block Collection**を標準パターンのリファレンスとして使用するように更新しました。

---

## ✅ 更新されたファイル

### 1. `.cursorrules`
**変更内容:**
- `ak-eds`への参照を削除
- EDS Block Collectionへのリンクを追加
- 標準ブロック（Accordion, Tabs, Carousel, Cards）の参照先を明記

**Before:**
```
- Use standard EDS patterns for similar components
- Reference existing blocks (blocks/*) for patterns
```

**After:**
```
- Use EDS Block Collection patterns (https://github.com/adobe/aem-block-collection)
- Reference Adobe's standard block implementations
- Reference specific blocks:
  - Accordion: https://github.com/adobe/aem-block-collection/tree/main/blocks/accordion
  - Tabs, Carousel, Cards: [respective URLs]
```

### 2. `BLOCK-GENERATION-GUIDE.md`
**変更内容:**
- "Mirror EDS Block Collection Patterns" セクションを更新
- GitHub リポジトリとAEM.liveドキュメントへのリンク追加
- 標準ブロックタイプのマッピング定義

**Before:**
```
### 2. Mirror EDS Block Collection Patterns (STRICT)
Inspect EDS standard blocks and match EXACTLY:
```

**After:**
```
### 2. Mirror EDS Block Collection Patterns (STRICT)
Reference Adobe's EDS Block Collection for standard patterns:
- GitHub Repository: https://github.com/adobe/aem-block-collection
- AEM.live Documentation: https://www.aem.live/docs/

Standard Block References:
- Accordion: Expand/collapse pattern with ARIA accordion
- Tabs: Tab switching with ARIA tablist/tab/tabpanel
- [etc...]
```

### 3. `FIGMA-ONLY-GENERATION.md`
**変更内容:**
- コンポーネント名から推論するロジックにEDS Block Collectionへの参照を追加
- 各標準ブロックタイプに対応するGitHubリンクを明記

### 4. `EDS-BLOCK-COLLECTION-REFERENCE.md` (新規作成)
**内容:**
- Adobe EDS Block Collectionの包括的なリファレンスガイド
- 各標準ブロック（Accordion, Tabs, Carousel, Cards, Hero）の詳細
- 共通パターン、アクセシビリティチェックリスト
- Figmaコンポーネント名 → EDS Blockタイプのマッピングテーブル

---

## 🎯 新しい参照戦略

### Block名からパターンを推論

Figmaコンポーネント名を**EDS Block Collection**の標準ブロックにマッピング:

| Figma Component | EDS Block Type | GitHub Reference |
|-----------------|----------------|------------------|
| Accordion | Accordion | [Link](https://github.com/adobe/aem-block-collection/tree/main/blocks/accordion) |
| Tabs | Tabs | [Link](https://github.com/adobe/aem-block-collection/tree/main/blocks/tabs) |
| Carousel | Carousel | [Link](https://github.com/adobe/aem-block-collection/tree/main/blocks/carousel) |
| Cards | Cards | [Link](https://github.com/adobe/aem-block-collection/tree/main/blocks/cards) |
| Hero | Hero | Standard pattern |

### 推論の優先順位

1. **Figma Component Name** → EDS Block Collection standard type
2. **EDS Block Collection Pattern** → Implementation reference
3. **Figma Variants** → Storybook Stories
4. **Figma Variables** → CSS Custom Properties
5. **AEM.live Documentation** → Best practices

---

## 📦 利点

### ✅ プロジェクト間の移植性
- `ak-eds`という特定プロジェクトへの依存を排除
- どのプロジェクトでも同じ参照先（EDS Block Collection）を使用
- Adobe公式の標準パターンに準拠

### ✅ 再現性
- Adobe公式リポジトリは変更が追跡可能
- 標準化されたパターン（Accordion, Tabs, Carousel）
- 公開されているため、誰でもアクセス可能

### ✅ 保守性
- 公式ドキュメントとの一貫性
- コミュニティベストプラクティスに準拠
- 将来のアップデートに追従しやすい

---

## 🔗 主要リソース

### Adobe公式
- **EDS Block Collection**: https://github.com/adobe/aem-block-collection
- **AEM.live Docs**: https://www.aem.live/docs/
- **Developer Tutorial**: https://www.aem.live/developer/tutorial

### このプロジェクトのドキュメント
- **EDS Block Collection Reference**: `EDS-BLOCK-COLLECTION-REFERENCE.md`
- **Block Generation Guide**: `BLOCK-GENERATION-GUIDE.md`
- **Figma Only Generation**: `FIGMA-ONLY-GENERATION.md`

---

## 💡 使用例

### Before (ak-eds参照)
```
問題点: 
- ak-edsプロジェクトにアクセスできない他プロジェクトでは動作しない
- プロジェクト固有の実装に依存
```

### After (EDS Block Collection参照)
```
@figma https://www.figma.com/design/.../...?node-id=XXX

Generate EDS Block for "Accordion"

→ AIは以下を参照:
  1. EDS Block Collection - Accordion
     https://github.com/adobe/aem-block-collection/tree/main/blocks/accordion
  2. 標準的なARIA accordion pattern
  3. WCAG AA アクセシビリティ基準
  
→ どのプロジェクトでも同じ品質で生成可能
```

---

## 🎉 結果

### テンプレートプロジェクトとしての完成度向上
- ✅ 外部プロジェクトへの依存を排除
- ✅ Adobe公式パターンに準拠
- ✅ どのEDSプロジェクトでも利用可能
- ✅ 再現性の高いBlock生成

### 生成品質の向上
- ✅ 標準化されたパターン（公式準拠）
- ✅ 一貫したアクセシビリティ実装
- ✅ ベストプラクティスの適用

---

**更新日**: 2026-01-13
**影響範囲**: `.cursorrules`, `BLOCK-GENERATION-GUIDE.md`, `FIGMA-ONLY-GENERATION.md`
**新規追加**: `EDS-BLOCK-COLLECTION-REFERENCE.md`
