#!/bin/bash

# Figma MCP セットアップ検証スクリプト
# セットアップが正しく完了しているか確認します

echo "🔍 Figma MCP セットアップの検証を開始します..."
echo ""

# ========================================
# Check 1: 環境変数の確認
# ========================================
echo "📝 Check 1: 環境変数の確認"

if [ -z "$FIGMA_ACCESS_TOKEN" ]; then
  echo "❌ FIGMA_ACCESS_TOKEN が設定されていません"
  echo "   解決方法: source ~/.zshrc を実行してください"
  CHECK1=false
else
  echo "✅ FIGMA_ACCESS_TOKEN が設定されています"
  echo "   値: ${FIGMA_ACCESS_TOKEN:0:10}... (最初の10文字)"
  CHECK1=true
fi
echo ""

# ========================================
# Check 2: ~/.zshrc の確認
# ========================================
echo "📝 Check 2: ~/.zshrc の確認"

if grep -q "FIGMA_ACCESS_TOKEN" ~/.zshrc 2>/dev/null; then
  echo "✅ ~/.zshrc に FIGMA_ACCESS_TOKEN が記載されています"
  CHECK2=true
else
  echo "❌ ~/.zshrc に FIGMA_ACCESS_TOKEN が見つかりません"
  CHECK2=false
fi
echo ""

# ========================================
# Check 3: MCP設定ファイルの確認
# ========================================
echo "📝 Check 3: MCP設定ファイルの確認"

if [ -f ~/.cursor/mcp.json ]; then
  echo "✅ ~/.cursor/mcp.json が存在します"
  
  # Figmaサーバーが含まれているか確認
  if grep -q '"figma"' ~/.cursor/mcp.json; then
    echo "✅ figma サーバーの設定が含まれています"
    CHECK3=true
  else
    echo "❌ figma サーバーの設定が見つかりません"
    CHECK3=false
  fi
else
  echo "❌ ~/.cursor/mcp.json が見つかりません"
  CHECK3=false
fi
echo ""

# ========================================
# 総合結果
# ========================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 検証結果"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if $CHECK1 && $CHECK2 && $CHECK3; then
  echo "✅ 全てのチェックに合格しました！"
  echo ""
  echo "📋 次のステップ:"
  echo "  1. Cursorを再起動してください"
  echo "  2. Settings > Features > MCP Servers で 'figma' を確認"
  echo "  3. プロンプトで「List available MCP tools」と入力して確認"
  echo ""
  exit 0
else
  echo "⚠️  いくつかの問題が見つかりました"
  echo ""
  echo "📋 解決方法:"
  
  if ! $CHECK1; then
    echo "  - 環境変数: source ~/.zshrc を実行"
  fi
  
  if ! $CHECK2; then
    echo "  - ~/.zshrc: ./setup-figma-mcp.sh を再実行"
  fi
  
  if ! $CHECK3; then
    echo "  - MCP設定: ./setup-figma-mcp.sh を再実行"
  fi
  
  echo ""
  exit 1
fi

