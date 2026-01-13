# Figma MCP統合設計書

## 🎯 目的

FigmaデザインからEDS Block生成を行うため、MCP（Model Context Protocol）経由でFigmaファイルにアクセスする基盤を構築する。

---

## 🔑 1. Figma認証情報の設定

### 1.1 Figma Personal Access Token (PAT) の取得

#### 手順

1. **Figmaアカウント設定にアクセス**:
   ```
   https://www.figma.com/settings
   ```

2. **Personal Access Tokensセクションに移動**:
   - 左サイドバーから「Personal access tokens」を選択

3. **新しいトークンを作成**:
   - 「Generate new token」をクリック
   - トークン名: `cursor-mcp-block-generation`（識別しやすい名前）
   - スコープ: 
     - ✅ `File content - Read only`
     - ✅ `Variables` (デザイントークン取得用)
     - ❌ Write権限は不要

4. **トークンをコピーして保存**:
   - ⚠️ **重要**: 生成時にのみ表示されるため、必ずコピーして安全な場所に保存
   - 形式: `figd_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### 1.2 セキュリティベストプラクティス

#### ✅ 推奨される保管場所

1. **パスワードマネージャー**（最推奨）:
   - 1Password
   - Bitwarden
   - LastPass

2. **ローカル環境変数**:
   ```bash
   # ~/.zshrc または ~/.bash_profile
   export FIGMA_ACCESS_TOKEN="figd_YOUR_TOKEN_HERE"
   ```

3. **暗号化されたファイル**:
   ```bash
   # セキュアな場所に保存
   echo "figd_YOUR_TOKEN_HERE" > ~/.figma_token
   chmod 600 ~/.figma_token
   ```

#### ❌ 絶対にやってはいけないこと

- ✗ Gitリポジトリにコミットしてはいけない
- ✗ Slackや非暗号化チャットで送信しない
- ✗ スクリーンショットを取らない
- ✗ 公開ドキュメントに記載しない

---

## ⚙️ 2. MCP設定ファイルの構成

### 2.1 Cursor設定（推奨）

#### ファイル: `~/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-figma"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_YOUR_TOKEN_HERE"
      }
    }
  }
}
```

**環境変数を利用する場合**（より安全）:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-figma"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
```

この場合、事前に環境変数を設定：
```bash
# ~/.zshrc に追加
export FIGMA_ACCESS_TOKEN="figd_YOUR_TOKEN_HERE"
```

### 2.2 Claude Desktop設定（代替案）

#### ファイル: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-figma"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_YOUR_TOKEN_HERE"
      }
    }
  }
}
```

### 2.3 設定の確認

Cursorを再起動後、以下を確認：

1. **MCP接続確認**:
   ```
   Settings > Features > MCP Servers
   ```
   - `figma` サーバーが表示されているか確認

2. **プロンプトで確認**:
   ```
   List available MCP tools
   ```
   - Figma関連のツールが表示されるか確認

---

## 📝 3. プロンプトでのFigmaアクセス方法

### 3.1 基本パターン

#### パターンA: Figmaファイル全体の情報取得

```
@figma https://www.figma.com/file/{file_id}/{file_name}
このFigmaファイルのコンポーネント一覧を取得してください
```

#### パターンB: 特定のページ/フレームの情報取得

```
@figma https://www.figma.com/file/{file_id}/{file_name}?node-id={node_id}
このフレームのデザイン情報を詳細に取得してください
```

#### パターンC: デザイントークン（Variables）の取得

```
@figma https://www.figma.com/file/{file_id}/{file_name}
このファイルのVariables（色、タイポグラフィ、スペーシング）を取得してください
```

### 3.2 Block生成用プロンプトテンプレート

#### テンプレート: `prompts/generate-block-from-figma.md`

```markdown
# EDS Block生成プロンプト

## 入力情報

### 1. Figmaデザイン
@figma {FIGMA_URL}

上記のFigmaコンポーネントのデザイン仕様を取得してください。
以下の情報を抽出：
- コンポーネント名
- Variants（バリエーション）
- プロパティ（Props）
- デザイントークン（色、タイポグラフィ、スペーシング）
- レイアウト構造

### 2. UserStory
@file {USER_STORY_PATH}

上記のUserStoryを参照し、以下を抽出：
- 機能要件
- インタラクション要件
- アクセシビリティ要件
- テストシナリオ

## 生成指示

以下のファイルを生成してください：

1. **Block実装**: `blocks/{block-name}/{block-name}.js`
   - Figmaの構造に基づくHTML生成
   - EDS Block標準パターンに準拠

2. **Block CSS**: `blocks/{block-name}/{block-name}.css`
   - Figmaのデザイントークンを使用
   - CSS Custom Propertiesで定義

3. **Storybook Story**: `blocks/{block-name}/{block-name}.stories.js`
   - Figma Variantsごとに1つのStory export
   - UserStoryのテストシナリオを追加Storyとして含める

## 生成ルール

- `.cursorrules` および `BLOCK-GENERATION-GUIDE.md` に従う
- `VISUAL-REGRESSION-STRATEGY.md` に従ってStory Variantを設計
```

### 3.3 実際の使用例

```
プロンプト例1: Hero Block生成

@figma https://www.figma.com/file/ABC123/MyProject?node-id=100:200
@file docs/user-stories/hero-block.md

上記のFigmaコンポーネント「Hero」とUserStoryを基に、
EDS Blockとして実装してください。

Figmaで定義されているVariants:
- Layout: Default, Centered, FullWidth
- Theme: Light, Dark

これらのVariantsに対応するStorybook Storiesを生成し、
Visual Regressionテストでカバーできるようにしてください。
```

```
プロンプト例2: デザイントークン更新

@figma https://www.figma.com/file/ABC123/MyProject

このFigmaファイルのVariables（デザイントークン）を抽出し、
`styles/styles.css` のCSS Custom Propertiesを更新してください。

以下のカテゴリを含める：
- Colors (Primitives, Brand, Semantic)
- Typography (Font sizes, Line heights, Font weights)
- Spacing (Padding, Margin, Gap)
- Border radius
```

---

## 🔄 4. Block生成ワークフローへの統合

### 4.1 ワークフロー概要

```
1. Figmaデザイン完成
   ↓
2. UserStory作成（markdown）
   ↓
3. プロンプト経由でBlock生成
   ├─ @figma でデザイン取得
   ├─ @file でUserStory参照
   └─ .cursorrules に基づき生成
   ↓
4. 生成されたコードを確認
   ├─ blocks/{block}/*.js
   ├─ blocks/{block}/*.css
   └─ blocks/{block}/*.stories.js
   ↓
5. Storybookで動作確認
   └─ npm run storybook
   ↓
6. PR作成 & Chromatic Visual Regression
```

### 4.2 Figma URL取得方法

#### Figmaファイル全体のURL
```
右上の「Share」ボタン → 「Copy link」
例: https://www.figma.com/file/ABC123DEF456/ProjectName
```

#### 特定のコンポーネント/フレームのURL
```
対象のフレームを選択 → 右クリック → 「Copy link」
または: 対象を選択した状態でアドレスバーのURLをコピー
例: https://www.figma.com/file/ABC123DEF456/ProjectName?node-id=100:200
```

### 4.3 プロジェクト内での管理

#### `figma-urls.json`（推奨）

```json
{
  "project": "figma-design-to-eds-code",
  "mainFile": "https://www.figma.com/file/ABC123DEF456/EDS-Components",
  "components": {
    "hero": {
      "url": "https://www.figma.com/file/ABC123DEF456/EDS-Components?node-id=100:200",
      "description": "Hero block with multiple layout variants",
      "variants": ["Default", "Centered", "FullWidth"],
      "lastUpdated": "2026-01-09"
    },
    "card": {
      "url": "https://www.figma.com/file/ABC123DEF456/EDS-Components?node-id=200:300",
      "description": "Card component with image and text",
      "variants": ["Vertical", "Horizontal", "Minimal"],
      "lastUpdated": "2026-01-09"
    }
  },
  "designTokens": {
    "url": "https://www.figma.com/file/ABC123DEF456/EDS-Components",
    "description": "All design tokens (colors, typography, spacing)",
    "lastSynced": "2026-01-09"
  }
}
```

---

## 🛡️ 5. セキュリティとトラブルシューティング

### 5.1 トークンのローテーション

**推奨頻度**: 3-6ヶ月ごと

**手順**:
1. 新しいトークンを生成
2. MCP設定を更新
3. Cursorを再起動
4. 古いトークンを無効化

### 5.2 アクセス権限の確認

Figmaファイルへのアクセス権が必要：
- ✅ Viewer以上の権限
- ✅ 組織のSSO認証が必要な場合は認証済み

### 5.3 よくある問題と解決策

#### 問題1: "Figma MCP tool not found"

**原因**: MCP設定が読み込まれていない

**解決策**:
```bash
# 1. 設定ファイルの確認
cat ~/.cursor/mcp.json

# 2. Cursorを完全再起動
killall Cursor && open /Applications/Cursor.app

# 3. MCP接続状態を確認
# Settings > Features > MCP Servers
```

#### 問題2: "Unauthorized"

**原因**: トークンが無効または期限切れ

**解決策**:
```bash
# 1. トークンを再生成
# 2. 環境変数を更新
export FIGMA_ACCESS_TOKEN="figd_NEW_TOKEN"

# 3. MCP設定を更新
# 4. Cursorを再起動
```

#### 問題3: "File not found"

**原因**: FigmaファイルのURLが間違っているか、アクセス権がない

**解決策**:
- URLを確認（特にfile_idが正しいか）
- Figmaでファイルを開けるか確認
- ファイルの共有設定を確認

---

## 📋 6. チェックリスト

### 初期セットアップ

- [ ] Figma Personal Access Tokenを取得
- [ ] トークンをセキュアに保存（パスワードマネージャー推奨）
- [ ] 環境変数に設定（`~/.zshrc`）
- [ ] `~/.cursor/mcp.json` を作成・更新
- [ ] Cursorを再起動
- [ ] MCP接続を確認（Settings > MCP Servers）
- [ ] プロンプトでFigmaツールの動作確認

### 日常的な使用

- [ ] Figma URLを取得（`figma-urls.json`に記録推奨）
- [ ] UserStoryをmarkdownで作成
- [ ] プロンプトで`@figma`と`@file`を使用
- [ ] 生成されたコードをレビュー
- [ ] Storybookで動作確認
- [ ] PRを作成してChromatic VRテスト

### セキュリティメンテナンス

- [ ] 3-6ヶ月ごとにトークンをローテーション
- [ ] 使用していないトークンを無効化
- [ ] `.gitignore`にトークン関連ファイルが含まれているか確認
- [ ] チーム内で取得方法を共有（トークン自体は共有しない）

---

## 🎯 実装状況

### ✅ 準備完了

- Block生成ルール（`.cursorrules`、`BLOCK-GENERATION-GUIDE.md`）
- Visual Regression戦略（`VISUAL-REGRESSION-STRATEGY.md`）
- Storybook設定
- Chromatic統合

### ⏳ 次のアクション

1. **Figma PAT取得**（個人で実施）
2. **MCP設定**（`~/.cursor/mcp.json`）
3. **figma-urls.json作成**（プロジェクトで管理）
4. **Block生成テスト**（Hero blockで検証）

---

**プロジェクト**: figma-design-to-eds-code  
**憲章**: フロントエンドの不具合撲滅運動  
**更新日**: 2026-01-09

