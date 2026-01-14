# Figma MCP 動作検証

## 検証実施日時
2026-01-13

## 検証目的
Cursor再起動後、MCP経由でFigmaデザインを取得できるか確認する

## セットアップ状況
✅ `~/.cursor/mcp.json` 作成済み
✅ `FIGMA_ACCESS_TOKEN` 環境変数設定済み（`figd_5Ht7D...`）
✅ Cursor再起動完了

## テスト対象Figma URL
実際のプロジェクトから抽出:
```
https://figma.com/design/Izj4fUkuPANQ52w7teSyUo/Components?node-id=123-456
```

## 検証方法

### 方法1: AIプロンプトで直接アクセス

**テストプロンプト例**:
```
以下のFigmaファイルから情報を取得してください：
https://figma.com/design/Izj4fUkuPANQ52w7teSyUo/Components?node-id=123-456

取得したい情報:
- ファイル名
- 指定ノードのコンポーネント名
- 使用されているカラー
- テキストスタイル
```

### 方法2: ローカルでFigma API直接テスト

```bash
# 環境変数確認
echo $FIGMA_ACCESS_TOKEN

# Figma API テスト（RESTful API）
FILE_KEY="Izj4fUkuPANQ52w7teSyUo"
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/${FILE_KEY}" | jq '.name'
```

### 方法3: MCP Serverを直接起動してテスト

```bash
# MCPサーバーを直接起動
FIGMA_ACCESS_TOKEN=$FIGMA_ACCESS_TOKEN \
  npx -y @modelcontextprotocol/server-figma
```

## 期待される結果

### 成功時:
- Figmaファイル名が取得できる
- コンポーネント情報が表示される
- デザイントークン（カラー、タイポグラフィ）が取得できる

### 失敗時の考えられる原因:
1. **トークンの権限不足**
   - Scopeに `File content` と `Variables` が含まれているか確認
   
2. **MCP設定の問題**
   - `~/.cursor/mcp.json` の記述ミス
   - 環境変数の参照方法が間違っている

3. **Figma URLのアクセス権限**
   - トークンの所有者がそのFigmaファイルにアクセス権を持っているか

4. **Cursorの再起動不足**
   - プロセスが完全に終了していない可能性

## トラブルシューティング

### Case 1: "Figma tool not found"
```bash
# 完全にCursorを終了
killall Cursor

# MCP設定を確認
cat ~/.cursor/mcp.json

# 再起動
open /Applications/Cursor.app
```

### Case 2: "Unauthorized" or "403"
```bash
# トークンの再生成
# 1. https://www.figma.com/settings
# 2. 既存トークンを削除
# 3. 新しいトークンを生成（正しいscopeで）
# 4. セットアップスクリプト再実行
cd /Users/dmurata/Documents/Dev/d2c/.mcp-setup
./setup-figma-mcp.sh
```

### Case 3: "File not found"
- Figma URLが正しいか確認
- ブラウザで直接URLにアクセスできるか確認
- トークン所有者がファイルにアクセス権を持っているか確認

## 検証結果

### ✅ Figma API 直接アクセス（成功）

**実施日時**: 2026-01-13

**テストURL**: 
```
https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework?node-id=2-1446
```

**ファイルID**: `MJTwyRbE5EVdlci3UIwsut`

**実施内容**:
```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/MJTwyRbE5EVdlci3UIwsut"
```

**結果**: ✅ 成功

**取得できた情報**:
- ファイル名: `SandBox 0108-AEM Figma Design Framework`
- 最終更新: `2026-01-13T02:43:16Z`
- バージョン: `2308358348222725081`
- ページ数: `29`

**エラーメッセージ**: なし

---

### 次: Cursor MCP経由でのアクセステスト

**テストプロンプト**:
```
以下のFigmaファイルから情報を取得してください：
https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/SandBox-0108-AEM-Figma-Design-Framework?node-id=2-1446

取得したい情報:
- ノードID 2-1446 のコンポーネント名
- 使用されているカラー変数
- テキストスタイル
```


## 次のステップ

### 成功した場合:
1. `figma-urls.json` にプロジェクトのFigma URLを登録
2. User Storyドキュメント作成
3. Block生成プロンプトのテスト実行

### 失敗した場合:
1. エラー内容を分析
2. トラブルシューティングを実施
3. 必要に応じてセットアップスクリプト修正
4. 再検証

## 参考情報

### Figma API ドキュメント
- https://www.figma.com/developers/api

### MCP Figma Server
- https://github.com/modelcontextprotocol/servers/tree/main/src/figma

### Token Scopes
- `File content - Read only`: ファイルの内容を読む
- `Variables`: デザイントークン（変数）を読む
