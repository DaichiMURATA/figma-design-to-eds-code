#!/bin/bash

# Figma MCP セットアップスクリプト
# このスクリプトは、Figma MCPを使用するための環境を自動でセットアップします

set -e

echo "🚀 Figma MCP セットアップを開始します..."
echo ""

# ========================================
# Step 1: Figma Access Tokenの入力
# ========================================
echo "📝 Step 1: Figma Personal Access Token を入力してください"
echo ""
echo "取得方法:"
echo "  1. https://www.figma.com/settings にアクセス"
echo "  2. 左サイドバー「Personal access tokens」を選択"
echo "  3. 「Generate new token」をクリック"
echo "  4. 名前: cursor-mcp-block-generation"
echo "  5. スコープ: 'File content - Read only', 'Variables' を選択"
echo "  6. 生成されたトークンをコピー (figd_... で始まる文字列)"
echo ""
read -p "Figma Access Token を入力: " FIGMA_TOKEN

if [ -z "$FIGMA_TOKEN" ]; then
  echo "❌ エラー: トークンが入力されていません"
  exit 1
fi

echo ""
echo "✅ トークンを受け取りました"
echo ""

# ========================================
# Step 2: 環境変数の設定
# ========================================
echo "📝 Step 2: 環境変数を設定しています..."

# .zshrc に追加（既に存在する場合はスキップ）
if ! grep -q "FIGMA_ACCESS_TOKEN" ~/.zshrc 2>/dev/null; then
  echo "" >> ~/.zshrc
  echo "# Figma MCP - Added by setup script on $(date)" >> ~/.zshrc
  echo "export FIGMA_ACCESS_TOKEN=\"${FIGMA_TOKEN}\"" >> ~/.zshrc
  echo "✅ ~/.zshrc に環境変数を追加しました"
else
  # 既存のトークンを更新
  sed -i.bak "s|export FIGMA_ACCESS_TOKEN=.*|export FIGMA_ACCESS_TOKEN=\"${FIGMA_TOKEN}\"|" ~/.zshrc
  echo "✅ ~/.zshrc の環境変数を更新しました"
fi

# 現在のシェルセッションで環境変数を有効化
export FIGMA_ACCESS_TOKEN="${FIGMA_TOKEN}"

echo ""

# ========================================
# Step 3: MCP設定ファイルの作成
# ========================================
echo "📝 Step 3: MCP設定ファイルを作成しています..."

# ~/.cursor ディレクトリを作成
mkdir -p ~/.cursor

# mcp.json の作成
cat > ~/.cursor/mcp.json << EOF
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-figma"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "\${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
EOF

echo "✅ ~/.cursor/mcp.json を作成しました"
echo ""

# ========================================
# Step 4: 設定の確認
# ========================================
echo "📝 Step 4: 設定を確認しています..."
echo ""
echo "作成されたファイル:"
echo "  - ~/.cursor/mcp.json"
echo "  - ~/.zshrc (FIGMA_ACCESS_TOKEN追加)"
echo ""
echo "環境変数:"
echo "  FIGMA_ACCESS_TOKEN=${FIGMA_ACCESS_TOKEN:0:10}... (最初の10文字のみ表示)"
echo ""

# ========================================
# 完了
# ========================================
echo "✅ セットアップが完了しました！"
echo ""
echo "📋 次のステップ:"
echo ""
echo "  1. 新しいターミナルを開くか、以下を実行:"
echo "     source ~/.zshrc"
echo ""
echo "  2. Cursorを完全に再起動:"
echo "     killall Cursor && open /Applications/Cursor.app"
echo ""
echo "  3. Cursorで動作確認:"
echo "     Settings > Features > MCP Servers"
echo "     'figma' サーバーが表示されているか確認"
echo ""
echo "  4. プロンプトで確認:"
echo "     「List available MCP tools」と入力"
echo "     Figma関連のツールが表示されるか確認"
echo ""
echo "🎉 準備完了です！"

