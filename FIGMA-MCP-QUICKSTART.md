# Figma MCP クイックスタート

最短でFigma MCP統合を動かすためのガイド

---

## 🚀 5ステップで完了

### Step 1: Figma Personal Access Token取得（5分）

1. https://www.figma.com/settings にアクセス
2. 左サイドバー「Personal access tokens」
3. 「Generate new token」
4. 名前: `cursor-mcp-block-generation`
5. スコープ: `File content - Read only`, `Variables`
6. トークンをコピー（`figd_...`で始まる文字列）

### Step 2: 環境変数に設定（2分）

```bash
# ターミナルで実行
echo 'export FIGMA_ACCESS_TOKEN="figd_YOUR_TOKEN_HERE"' >> ~/.zshrc
source ~/.zshrc

# 確認
echo $FIGMA_ACCESS_TOKEN
```

### Step 3: MCP設定ファイル作成（3分）

```bash
# ディレクトリ作成
mkdir -p ~/.cursor

# 設定ファイル作成
cat > ~/.cursor/mcp.json << 'EOF'
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
EOF
```

### Step 4: Cursorを再起動（1分）

```bash
# Cursorを完全に終了して再起動
killall Cursor && open /Applications/Cursor.app
```

### Step 5: 動作確認（2分）

Cursorのプロンプトに入力:
```
List available MCP tools
```

Figma関連のツールが表示されればOK！

---

## ✅ テスト方法

### 実際にFigmaファイルにアクセス

```
@figma https://www.figma.com/file/YOUR_FILE_ID/YOUR_FILE_NAME

このFigmaファイルの情報を取得してください
```

成功すれば、ファイル名やコンポーネント一覧が表示されます。

---

## 🔧 トラブルシューティング

### "Figma tool not found"が出る場合

1. Cursorを**完全に終了**（Cmd+Qではなく、プロセスをkill）
2. `~/.cursor/mcp.json`が存在するか確認
3. Cursorを再起動

### "Unauthorized"が出る場合

1. トークンが正しいか確認:
   ```bash
   echo $FIGMA_ACCESS_TOKEN
   ```
2. Figmaで新しいトークンを生成
3. 環境変数を更新して`source ~/.zshrc`

### Figmaファイルが見つからない場合

1. ブラウザでFigmaファイルを開けるか確認
2. ファイルのアクセス権を確認（Viewer以上）
3. URLが正しいか確認

---

## 📝 次のステップ

1. **figma-urls.json更新**:
   ```bash
   cd /Users/dmurata/Documents/Dev/figma-design-to-eds-code
   # 実際のFigma URLに置き換え
   vim figma-urls.json
   ```

2. **Block生成テスト**:
   ```
   @figma YOUR_FIGMA_URL
   @file docs/user-stories/hero-block.md
   
   上記を基にHero Blockを生成してください
   ```

3. **詳細は `FIGMA-MCP-INTEGRATION.md` を参照**

---

**所要時間**: 合計13分  
**更新日**: 2026-01-09

