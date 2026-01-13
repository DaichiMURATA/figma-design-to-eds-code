#!/bin/bash

# MCP Figma Server 起動テスト
# MCPサーバーが正しくインストールされ、起動できるか確認

echo "🔍 MCP Figma Server の動作確認を開始します..."
echo ""

# 環境変数確認
echo "📝 Step 1: 環境変数確認"
if [ -z "$FIGMA_ACCESS_TOKEN" ]; then
  echo "❌ FIGMA_ACCESS_TOKEN が設定されていません"
  echo "   実行してください: source ~/.zshrc"
  exit 1
else
  echo "✅ FIGMA_ACCESS_TOKEN: ${FIGMA_ACCESS_TOKEN:0:10}..."
fi
echo ""

# MCPサーバーパッケージの存在確認
echo "📝 Step 2: MCP Figma Server パッケージ確認"
echo "   npx で @modelcontextprotocol/server-figma をダウンロード..."

# タイムアウト付きでMCPサーバーを起動（10秒後に自動終了）
echo ""
echo "📝 Step 3: MCP Server 起動テスト（10秒間）"
echo "   正常に起動すれば、Cursorから利用可能です"
echo ""

timeout 10s npx -y @modelcontextprotocol/server-figma || {
  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 124 ]; then
    echo ""
    echo "✅ MCPサーバーは正常に起動しました（タイムアウトで終了）"
    echo "   Cursorから利用可能な状態です"
    exit 0
  else
    echo ""
    echo "❌ MCPサーバーの起動に失敗しました（Exit code: $EXIT_CODE）"
    exit 1
  fi
}
