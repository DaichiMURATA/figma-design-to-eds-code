# Configuration Files

このディレクトリには、d2cプロジェクトの各種設定ファイルが格納されています。

---

## 📁 ディレクトリ構成

```
config/
├── chromatic/          🎨 Visual Regression Testing設定
│   ├── chromatic-pages.config.json
│   ├── chromatic-pages.schema.json
│   └── chromatic.config.json
│
├── component/          📦 DarkAlley Component定義
│   ├── component-definition.json
│   ├── component-filters.json
│   └── component-models.json
│
└── figma/              🎨 Figma統合設定
    └── figma-urls.json
```

---

## 🎨 Chromatic (Visual Regression Testing)

### `chromatic-pages.config.json`

**用途**: Playwright E2Eテストの対象ページ定義

**構造**:
```json
{
  "$schema": "./chromatic-pages.schema.json",
  "baseUrl": "https://main--d2c--daichimurata.aem.live",
  "pages": [
    {
      "name": "homepage",
      "path": "/",
      "viewports": [
        { "name": "desktop", "width": 1200, "height": 800 },
        { "name": "mobile", "width": 375, "height": 667 }
      ],
      "waitForNetworkIdle": true,
      "additionalWaitTime": 2000
    }
  ]
}
```

**使用箇所**:
- `tests/chromatic.spec.js` - Playwright テスト定義
- `.github/workflows/chromatic-two-layer.yml` - GitHub Actions

**編集方法**:
1. `pages`配列に新しいページオブジェクトを追加
2. `name`, `path`, `viewports`を定義
3. オプションで`waitForNetworkIdle`, `additionalWaitTime`を設定

### `chromatic-pages.schema.json`

**用途**: `chromatic-pages.config.json`のJSON Schema定義

**機能**:
- IDEでの自動補完
- 設定値のバリデーション
- ドキュメント表示

### `chromatic.config.json`

**用途**: Chromatic CLIのプロジェクト設定

**構造**:
```json
{
  "projectId": "your-project-id",
  "buildScriptName": "build-storybook"
}
```

---

## 📦 Component (DarkAlley / Document Authoring)

### `component-definition.json`

**用途**: DarkAlleyでのBlock初期配置HTML定義

**構造**:
```json
{
  "title": "d2c",
  "groups": [
    {
      "title": "Blocks",
      "id": "blocks",
      "components": [
        {
          "title": "Hero",
          "id": "hero",
          "plugins": {
            "xwalk": {
              "page": {
                "resourceType": "core/franklin/components/block/v1/block",
                "name": "hero",
                "model": "hero"
              }
            }
          }
        }
      ]
    }
  ]
}
```

**使用箇所**:
- DarkAlley (Document Authoring UI)
- Sidekick Library

**編集方法**:
1. `components`配列に新しいBlockを追加
2. `title`, `id`, `model`を設定
3. DarkAlleyで再読み込み

### `component-filters.json`

**用途**: DarkAlleyでのBlock表示フィルタリング

**編集方法**:
- 特定のBlockをDarkAlleyから非表示にする場合に使用

### `component-models.json`

**用途**: DarkAlleyでのBlock初期HTMLテンプレート

**構造**:
```json
{
  "id": "hero",
  "fields": [
    {
      "component": "text",
      "name": "heading",
      "label": "Heading",
      "valueType": "string"
    }
  ]
}
```

**使用箇所**:
- DarkAlleyでのBlock挿入時の初期HTML生成

---

## 🎨 Figma

### `figma-urls.json`

**用途**: Figmaデザイン URLの一元管理

**構造**:
```json
{
  "fileId": "MJTwyRbE5EVdlci3UIwsut",
  "components": {
    "hero": {
      "url": "https://www.figma.com/design/MJTwyRbE5EVdlci3UIwsut/...?node-id=2-1446",
      "nodeId": "2-1446",
      "description": "Hero block with heading, image, and CTA"
    }
  }
}
```

**使用箇所**:
- Block生成時のFigma URL参照
- ドキュメント（User Story）からの参照

**編集方法**:
1. `components`オブジェクトに新しいBlockを追加
2. `url`, `nodeId`, `description`を設定
3. Block生成時に`@file config/figma/figma-urls.json`で参照

---

## 🔧 設定ファイルの使い方

### Chromatic Pages 追加

```bash
# config/chromatic/chromatic-pages.config.json を編集
{
  "pages": [
    {
      "name": "new-page",
      "path": "/new-page",
      "viewports": [
        { "name": "desktop", "width": 1200, "height": 800 }
      ]
    }
  ]
}

# テスト実行
npm run test:chromatic
```

### DarkAlley Block 追加

```bash
# config/component/component-definition.json を編集
{
  "components": [
    {
      "title": "New Block",
      "id": "new-block",
      "plugins": {
        "xwalk": {
          "page": {
            "name": "new-block",
            "model": "new-block"
          }
        }
      }
    }
  ]
}

# config/component/component-models.json を編集
{
  "id": "new-block",
  "fields": [...]
}

# DarkAlleyでリロード
```

### Figma URL 追加

```bash
# config/figma/figma-urls.json を編集
{
  "components": {
    "new-block": {
      "url": "https://www.figma.com/design/...",
      "nodeId": "xxx-xxx",
      "description": "New block description"
    }
  }
}

# Block生成時に参照
@file config/figma/figma-urls.json
Generate EDS Block for "new-block"
```

---

## 📚 参考リンク

- [README](../README.md) - プロジェクト全体像
- [ROADMAP](../ROADMAP.md) - ビジョン・ゴール
- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [DarkAlley Documentation](https://www.aem.live/docs/setup-authoring)
