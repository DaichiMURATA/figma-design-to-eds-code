# EDS Block生成プロンプトテンプレート

## 📋 使用方法

このテンプレートをコピーして、Cursorのプロンプトに貼り付けて使用します。

---

## テンプレート

### Option 1: Figma Only (Simplest)

```
# EDS Block生成リクエスト

## 入力情報

### Figmaデザイン
@figma {FIGMA_URL}

上記のFigmaコンポーネントから以下の情報を抽出してください：
- コンポーネント名とVariants
- デザイントークン（色、タイポグラフィ、スペーシング）
- レイアウト構造
- インタラクション要件

## 生成依頼

`.cursorrules`、`BLOCK-GENERATION-GUIDE.md`、`VISUAL-REGRESSION-STRATEGY.md` に従って、
以下のファイルを生成してください：

1. **Block実装**: `blocks/{block-name}/{block-name}.js`
2. **Block CSS**: `blocks/{block-name}/{block-name}.css`
3. **Storybook Story**: `blocks/{block-name}/{block-name}.stories.js`

### Storybook Story要件
- Figma Variantsごとに1つのStory exportを作成
- Visual Regressionテストで全てのバリエーションがカバーされるようにする

### コード品質要件
- EDS標準パターンに準拠
- アクセシビリティ（AA基準）を満たす
- パフォーマンス最適化（Lighthouse 100点目標）
```

### Option 2: Figma + User Story (Recommended for complex blocks)

```
# EDS Block生成リクエスト

## 入力情報

### 1. Figmaデザイン
@figma {FIGMA_URL}

上記のFigmaコンポーネントから以下の情報を抽出してください：
- コンポーネント名とVariants
- デザイントークン（色、タイポグラフィ、スペーシング）
- レイアウト構造
- インタラクション要件

### 2. UserStory
@file {USER_STORY_PATH}

上記のUserStoryから以下を抽出してください：
- 機能要件
- インタラクション要件
- アクセシビリティ要件
- テストシナリオ

## 生成依頼

`.cursorrules`、`BLOCK-GENERATION-GUIDE.md`、`VISUAL-REGRESSION-STRATEGY.md` に従って、
以下のファイルを生成してください：

1. **Block実装**: `blocks/{block-name}/{block-name}.js`
2. **Block CSS**: `blocks/{block-name}/{block-name}.css`
3. **Storybook Story**: `blocks/{block-name}/{block-name}.stories.js`

### Storybook Story要件
- Figma Variantsごとに1つのStory exportを作成
- UserStoryのテストシナリオを追加Storyとして含める
- Visual Regressionテストで全てのバリエーションがカバーされるようにする

### コード品質要件
- EDS標準パターンに準拠
- アクセシビリティ（AA基準）を満たす
- パフォーマンス最適化（Lighthouse 100点目標）
```

---

## 📝 使用例

### 例1: Figma Only - Accordion Block生成

```
# EDS Block生成リクエスト

## 入力情報

### Figmaデザイン
@figma https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework?node-id=2-1446

上記のFigmaコンポーネント「Accordion」から以下の情報を抽出してください：
- コンポーネント名とVariants
- デザイントークン（色、タイポグラフィ、スペーシング）
- レイアウト構造
- インタラクション要件

## 生成依頼

`.cursorrules`、`BLOCK-GENERATION-GUIDE.md`、`VISUAL-REGRESSION-STRATEGY.md` に従って、
以下のファイルを生成してください：

1. **Block実装**: `blocks/accordion/accordion.js`
2. **Block CSS**: `blocks/accordion/accordion.css`
3. **Storybook Story**: `blocks/accordion/accordion.stories.js`

### Storybook Story要件
- Figma Variantsごとに1つのStory exportを作成
- Visual Regressionテストで全てのバリエーションがカバーされるようにする

### コード品質要件
- EDS標準パターンに準拠
- アクセシビリティ（AA基準）を満たす
- パフォーマンス最適化（Lighthouse 100点目標）
```

### 例2: Figma + User Story - Hero Block生成

```
# EDS Block生成リクエスト

## 入力情報

### 1. Figmaデザイン
@figma https://www.figma.com/file/ABC123/EDS-Components?node-id=100:200

上記のFigmaコンポーネント「Hero」から以下の情報を抽出してください：
- コンポーネント名とVariants
- デザイントークン（色、タイポグラフィ、スペーシング）
- レイアウト構造
- インタラクション要件

### 2. UserStory
@file docs/user-stories/hero-block.md

上記のUserStoryから以下を抽出してください：
- 機能要件
- インタラクション要件
- アクセシビリティ要件
- テストシナリオ

## 生成依頼

`.cursorrules`、`BLOCK-GENERATION-GUIDE.md`、`VISUAL-REGRESSION-STRATEGY.md` に従って、
以下のファイルを生成してください：

1. **Block実装**: `blocks/hero/hero.js`
2. **Block CSS**: `blocks/hero/hero.css`
3. **Storybook Story**: `blocks/hero/hero.stories.js`

### Storybook Story要件
- Figma Variantsごとに1つのStory exportを作成
  - Default Layout
  - Centered Layout
  - FullWidth Layout
  - With/Without Image
- UserStoryのテストシナリオを追加Storyとして含める
- Visual Regressionテストで全てのバリエーションがカバーされるようにする

### コード品質要件
- EDS標準パターンに準拠
- アクセシビリティ（AA基準）を満たす
- パフォーマンス最適化（Lighthouse 100点目標）
```

### 例2: デザイントークン更新のみ

```
# デザイントークン更新リクエスト

@figma https://www.figma.com/file/ABC123/EDS-Components

このFigmaファイルのVariables（デザイントークン）を抽出し、
`styles/styles.css` のCSS Custom Propertiesを更新してください。

## 抽出対象

### Colors
- Primitives (全ての色の値)
- Brand (ブランド別の色)
- Semantic (用途別の色: primary, secondary, error, success, etc.)

### Typography
- Font families
- Font sizes (Desktop, Tablet, Mobile)
- Line heights
- Font weights
- Letter spacing

### Spacing
- Padding values
- Margin values
- Gap values

### Effects
- Border radius
- Shadows
- Transitions

## 出力形式

CSS Custom Propertiesとして、`:root` セレクタ内に定義してください。
命名規則はFigmaのVariable名に従ってください。

例:
```css
:root {
  /* Colors - Primitives */
  --color-blue-500: #1a4989;
  
  /* Colors - Brand */
  --brand-primary: var(--color-blue-500);
  
  /* Typography */
  --font-size-h1-desktop: 48px;
  --font-size-h1-mobile: 32px;
}
```
```

---

## 🔧 カスタマイズポイント

### 必須置換項目

**Option 1: Figma Only**
- `{FIGMA_URL}`: 実際のFigma URLに置換
- `{block-name}`: 生成するBlock名に置換（Figmaコンポーネント名から自動推定可能）

**Option 2: Figma + User Story**
- `{FIGMA_URL}`: 実際のFigma URLに置換
- `{USER_STORY_PATH}`: UserStoryファイルのパスに置換
- `{block-name}`: 生成するBlock名に置換

### オプション追加項目

プロジェクトの要件に応じて以下を追加可能：
- 特定のブラウザ対応要件
- パフォーマンス目標値
- 既存Blockとの整合性要件
- 特定のデザインシステム制約

---

**更新日**: 2026-01-09

