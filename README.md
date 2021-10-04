# Lesson Bolt

Slack の API のためのアプリを Node.js のフレームワークである Bolt を使って作成します。

https://slack.dev/bolt-js/ja-jp/tutorial/getting-started

## 使用方法

初期

```sh
mkdir lesson-bolt && cd lesson-bolt
yarn init -y
```

`bolt`と環境変数を使うため`dotenv`をインストール

```sh
yarn add @slack/bolt dotenv
```

[slack api](https://api.slack.com/) より新規 App を作成

Basic Information にある Signing Secret と
OAuth & Permissions にある Bot User OAuth Token を環境変数に設定します

## 各機能

### Event Subscriptions
