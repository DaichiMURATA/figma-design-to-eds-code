# Chromatic Pages Configuration

このファイルは、Chromatic Two-Layer Visual Regression TestingのLayer 2（Playwright E2E）でテストするページを定義します。

## 📋 現在の設定

- **TOPページのみ**をテスト
- **Desktop**（1200x800）と **Mobile**（375x667）の2つのビューポート

## 🎯 使い方

### 1. テスト対象ページを追加する

`chromatic-pages.config.json` を編集して、`pages` 配列に新しいページを追加します：

```json
{
  "name": "about",
  "path": "/about",
  "viewports": [
    { "name": "desktop", "width": 1200, "height": 800 }
  ],
  "waitForNetworkIdle": true,
  "additionalWaitTime": 2000
}
```

### 2. ビューポートを追加する

既存のページに新しいビューポートを追加できます：

```json
{
  "name": "homepage",
  "path": "/",
  "viewports": [
    { "name": "desktop", "width": 1200, "height": 800 },
    { "name": "tablet", "width": 768, "height": 1024 },
    { "name": "mobile", "width": 375, "height": 667 }
  ]
}
```

### 3. 待機時間を調整する

ページの読み込みに時間がかかる場合、待機時間を調整できます：

```json
{
  "name": "products",
  "path": "/products",
  "viewports": [...],
  "waitForNetworkIdle": true,
  "additionalWaitTime": 5000
}
```

## 📊 設定項目の詳細

| 項目 | 型 | 説明 | デフォルト |
|------|-----|------|-----------|
| `baseUrl` | string | サイトのベースURL（環境変数 `SOURCE_URL` で上書き可能） | 必須 |
| `pages` | array | テスト対象ページのリスト | 必須 |
| `pages[].name` | string | ページの識別名（英数字推奨） | 必須 |
| `pages[].path` | string | URLパス（baseUrlからの相対パス） | 必須 |
| `pages[].viewports` | array | テストするビューポートのリスト | 必須 |
| `pages[].viewports[].name` | string | ビューポート名 | 必須 |
| `pages[].viewports[].width` | number | ビューポート幅（px） | 必須 |
| `pages[].viewports[].height` | number | ビューポート高さ（px） | 必須 |
| `pages[].waitForNetworkIdle` | boolean | ネットワークアイドル待機 | true |
| `pages[].additionalWaitTime` | number | 追加待機時間（ms） | 2000 |

## 🧪 ローカルでテストする

設定ファイルを変更したら、ローカルでテストできます：

```bash
# デフォルトURL（mainブランチ）でテスト
npm run test:chromatic

# 特定のブランチURLでテスト
SOURCE_URL=https://feature-branch--figma-design-to-eds-code--daichimurata.aem.live npm run test:chromatic
```

## ⚠️ 注意事項

1. **コスト管理**: ページとビューポートを増やすと、Chromaticのスナップショット数が増加します
2. **テスト時間**: 多くのページを追加すると、CI/CDの実行時間が長くなります
3. **URL形式**: EDS URL形式（`https://{branch}--{repo}--{owner}.aem.live`）を使用してください

## 💡 推奨設定

### 最小構成（コスト重視）
- TOPページのみ
- Desktop と Mobile の2ビューポート

### バランス構成
- TOPページ、主要ランディングページ（2-3ページ）
- Desktop、Tablet、Mobile の3ビューポート

### 完全構成（品質重視）
- 全ての主要ページ
- 複数のビューポート
- 特定のブロックを含むテストページ

## 🔗 関連ドキュメント

- [CHROMATIC-SETUP-GUIDE.md](./CHROMATIC-SETUP-GUIDE.md) - 完全なセットアップガイド
- [tests/chromatic.spec.js](./tests/chromatic.spec.js) - この設定を使用するテストファイル
- [.github/workflows/chromatic-two-layer.yml](./.github/workflows/chromatic-two-layer.yml) - GitHub Actions ワークフロー

## 📝 変更履歴

- 2026-01-13: 初期設定（TOPページのみ）
