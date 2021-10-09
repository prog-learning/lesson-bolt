# Lesson Bolt

Slack の API のためのアプリを Node.js のフレームワークである Bolt を使って作成します。

https://slack.dev/bolt-js/ja-jp/tutorial/getting-started

## 使用方法

### 初期設定

```sh
mkdir lesson-bolt && cd lesson-bolt
yarn init -y
```

`bolt`と`dotenv`（環境変数を使うため）をインストール

```sh
yarn add @slack/bolt dotenv
```

### Slack での準備

[slack api](https://api.slack.com/) より新規 App を作成し適当なワークスペースにインストールします

`.env`ファイルを作成し,
Basic Information にある Signing Secret と
OAuth & Permissions にある Bot User OAuth Token を環境変数に設定します

```
SLACK_SIGNING_SECRET=<Signing Secret in Basic Information>
SLACK_BOT_TOKEN=<Bot User OAuth Token in OAuth & Permissions>
```

OAuth & Permissions で権限のスコープを必要なものを Add し,Reinstall し,ワークスペースの方で承認します

## 各機能

### Event Subscriptions

ユーザの投稿を監視
Request URL と Subscribe to bot events を追加

###

## 参考

https://qiita.com/turmericN/items/a7d3582cab2abb1d645a
