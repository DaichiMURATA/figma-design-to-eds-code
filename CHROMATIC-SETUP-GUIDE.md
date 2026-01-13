# Chromatic セットアップガイド

このプロジェクトでは、Chromaticを使用したTwo-Layer Visual Regression Testingを実装しています。

## 📋 必要な設定

### 1. Chromaticプロジェクトの作成

1. [Chromatic](https://www.chromatic.com/)にサインアップ
2. 新しいプロジェクトを作成
3. GitHubリポジトリと連携
4. **Project Token**と**App ID**を取得

---

### 2. GitHub Secretsの設定

リポジトリの設定で以下のSecretsを追加してください：

#### 設定手順:
1. GitHub リポジトリ → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** をクリック
3. 以下の2つを追加:

| Secret名 | 値 | 説明 |
|---------|-----|------|
| `CHROMATIC_PROJECT_TOKEN` | `chpt_XXXXXXXXXXXX` | ChromaticプロジェクトのToken |
| `CHROMATIC_APP_ID` | `69606830af12af0596be2ea1` | ChromaticのApp ID |

#### Tokenの取得方法:
- Chromatic Dashboard → **Manage** → **Configure** → **Project token**をコピー

#### App IDの取得方法:
- Chromatic DashboardのURLから取得: `https://www.chromatic.com/builds?appId=XXXXX`

---

### 3. ローカルでの動作確認（オプション）

GitHub Secretsを設定する前に、ローカルでテストすることもできます：

```bash
# 環境変数を設定
export CHROMATIC_PROJECT_TOKEN="chpt_XXXXXXXXXXXX"

# Storybookをビルド（Layer 1）
npm run build-storybook
npm run chromatic

# Playwright E2Eテスト（Layer 2）
SOURCE_URL=https://main--figma-design-to-eds-code--daichimurata.aem.live npm run test:chromatic
npm run chromatic:upload
```

---

## 🎯 ワークフローの動作

### トリガー

1. **PRが作成された時**: 自動的に両方のレイヤーをテスト
2. **手動実行**: GitHub Actions → **Chromatic Two-Layer Visual Testing** → **Run workflow**

### Two-Layer Testing

#### **Layer 1: Storybook Component Testing**
- Storybookで定義された全てのコンポーネントをテスト
- ブロック単位での細かいビジュアル確認
- 変更のあったブロックのみをテスト（`onlyChanged: true`）

#### **Layer 2: Playwright E2E Page Testing**
- 実際のEDS URLにアクセスしてページ全体をテスト
- デスクトップ（1200x800）とモバイル（375x667）の両方をテスト
- ヘッダー、フッター、セクション間の統合確認

---

## 📊 結果の確認

### PRコメント

PR作成後、GitHub Actionsが自動的に以下のコメントを追加します：

```
## 🎨 Chromatic Two-Layer Visual Testing Results

### Layer 1: Storybook Component Testing
✅ **Passed** - Component stories tested
- 🔗 [View Chromatic Build #XX →](https://www.chromatic.com/build?appId=XXX&number=XX)
- Stories tested: 42

### Layer 2: Playwright E2E Page Testing
✅ **Passed** - E2E pages tested
- 🔗 [View Chromatic Build #YY →](https://www.chromatic.com/build?appId=XXX&number=YY)
- Source: `feature-branch`
- Target: `main`
```

### Chromaticダッシュボード

1. PRコメント内のリンクをクリック
2. ビジュアル差分を確認
3. **Accept** または **Deny** で承認/却下

---

## 🔧 トラブルシューティング

### ❌ `CHROMATIC_PROJECT_TOKEN` が見つからない

**原因**: GitHub Secretsが未設定  
**解決**: 上記の「GitHub Secretsの設定」を実施

### ❌ Storybookのビルドが失敗

**原因**: Storybook依存関係の不足  
**解決**:
```bash
npm ci
npm run build-storybook
```

### ❌ Playwright E2Eテストがタイムアウト

**原因**: EDS URLがまだデプロイされていない  
**解決**: ブランチをプッシュしてから5-10分待つ

### ❌ Chromatic Buildが表示されない

**原因**: App IDが未設定  
**解決**: `CHROMATIC_APP_ID` Secretを追加

---

## 📚 参考リンク

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Chromatic + Storybook](https://www.chromatic.com/docs/storybook)
- [Chromatic + Playwright](https://www.chromatic.com/docs/playwright)
- [GitHub Actions](https://docs.github.com/en/actions)
- [AEM Edge Delivery Services](https://www.aem.live/docs/)

---

## ✅ セットアップ完了チェックリスト

- [ ] Chromaticプロジェクトを作成
- [ ] `CHROMATIC_PROJECT_TOKEN` Secretを設定
- [ ] `CHROMATIC_APP_ID` Secretを設定
- [ ] テストPRを作成して動作確認
- [ ] Chromaticダッシュボードでビジュアル差分を確認
- [ ] Baselineを承認

セットアップが完了したら、このチェックリストを完了し、Visual Regression Testingを運用に乗せましょう！🎉
