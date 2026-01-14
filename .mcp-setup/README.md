# Figma MCP セットアップ

## 🚀 自動セットアップ（推奨）

### 1回実行するだけ！

```bash
cd /Users/dmurata/Documents/Dev/d2c/.mcp-setup
./setup-figma-mcp.sh
```

スクリプトが以下を自動で行います：
1. Figma Access Tokenの入力を求める
2. `~/.zshrc` に環境変数を追加
3. `~/.cursor/mcp.json` を作成
4. 設定を確認

### セットアップ後

```bash
# 1. 環境変数を有効化
source ~/.zshrc

# 2. Cursorを再起動
killall Cursor && open /Applications/Cursor.app

# 3. 検証スクリプトで確認
./verify-setup.sh
```

---

## 📝 手動セットアップ

自動スクリプトを使いたくない場合：

### Step 1: Figma Access Token取得

1. https://www.figma.com/settings にアクセス
2. 「Personal access tokens」セクション
3. 「Generate new token」
   - 名前: `cursor-mcp-block-generation`
   - スコープ: `File content - Read only`, `Variables`
4. トークンをコピー（`figd_...`）

### Step 2: 環境変数設定

```bash
# ~/.zshrc に追加
echo 'export FIGMA_ACCESS_TOKEN="figd_YOUR_TOKEN_HERE"' >> ~/.zshrc
source ~/.zshrc
```

### Step 3: MCP設定ファイル作成

```bash
# テンプレートをコピー
mkdir -p ~/.cursor
cat mcp.json.template | sed 's/REPLACE_WITH_YOUR_FIGMA_TOKEN/YOUR_ACTUAL_TOKEN/' > ~/.cursor/mcp.json
```

または、`mcp.json.template` を手動で編集して `~/.cursor/mcp.json` として保存。

### Step 4: Cursor再起動

```bash
killall Cursor && open /Applications/Cursor.app
```

---

## ✅ 動作確認

### 方法1: 検証スクリプト

```bash
./verify-setup.sh
```

### 方法2: Cursorで確認

1. **Settings > Features > MCP Servers**
   - `figma` サーバーが表示されているか確認

2. **プロンプトで確認**:
   ```
   List available MCP tools
   ```
   - Figma関連のツールが表示されるか確認

### 方法3: 実際にFigmaファイルにアクセス

```
@figma https://www.figma.com/file/YOUR_FILE_ID/YOUR_FILE_NAME

このFigmaファイルの情報を取得してください
```

---

## 🔧 トラブルシューティング

### "Figma tool not found"

```bash
# 1. Cursorを完全に終了
killall Cursor

# 2. MCP設定を確認
cat ~/.cursor/mcp.json

# 3. Cursorを再起動
open /Applications/Cursor.app
```

### "Unauthorized"

```bash
# 1. 環境変数を確認
echo $FIGMA_ACCESS_TOKEN

# 2. 新しいトークンで再セットアップ
./setup-figma-mcp.sh
```

### 環境変数が認識されない

```bash
# 現在のシェルで有効化
source ~/.zshrc

# 確認
echo $FIGMA_ACCESS_TOKEN
```

---

## 📂 ファイル構成

```
.mcp-setup/
├── README.md              # このファイル
├── setup-figma-mcp.sh     # 自動セットアップスクリプト
├── verify-setup.sh        # 検証スクリプト
└── mcp.json.template      # MCP設定テンプレート
```

---

## 🔒 セキュリティ

- ✅ トークンは環境変数で管理
- ✅ `.gitignore` に含まれる（コミットされない）
- ✅ パスワードマネージャーへのバックアップ推奨
- ⚠️ 3-6ヶ月ごとにトークンをローテーション

---

**更新日**: 2026-01-09

