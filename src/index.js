const dotenv = require('dotenv'); // .env ファイルの変数を使えるようにする
dotenv.config();
const { App, ExpressReceiver } = require('@slack/bolt');

const express = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: express,
});

/* Express */
express.router.get('/api/get-test', (req, res) => {
  res.send('get-test!!');
});

/* 投稿されたメッセージを監視 */
app.message('test', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(
    `Test Event Subscriptions <@${message.user}>! \n 
    message:
    ${JSON.stringify(message, null, 4)}`
  );
});

const emojis = [
  'sparkles',
  'confetti_ball',
  'tada',
  'thumbsup',
  'fire',
  'hotdog',
  'blush',
  'rainbow',
  'rocket',
];

// チャンネルにメッセージが投稿されたとき
app.message('', async ({ message, client }) => {
  const dice = Math.floor(Math.random() * 6);
  console.log(dice);
  await client.reactions.add({
    channel: message.channel,
    name: emojis[dice],
    timestamp: message.ts,
  });
  const dice2 = Math.floor(Math.random() * 6);
  console.log(dice2);
  await client.reactions.add({
    channel: message.channel,
    name: emojis[dice2],
    timestamp: message.ts,
  });
});

app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click', // このボタンを押すと`button_click`というactionが実行される
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

/* eventの監視 */
app.event('team_join', async ({ event, client }) => {
  // ワークスペースに参加したとき
  // 他 https://api.slack.com/events
  console.log(event);
});

/* actionの監視 */
app.action('button_click', async ({ ack, say }) => {
  // 登録した`button_click`が実行されたときに実行
  await ack(); // 確認の処理で必ず必要

  say('ボタンが押されました！'); // メッセージを同チャンネルに投稿
});

/* shortcutの監視 */
app.shortcut(
  'test_shortcut',
  async ({ shortcut, event, action, message, ack, client }) => {
    await ack();

    console.log('event: ', `${JSON.stringify(event, null, 4)}`);
    console.log('action: ', `${JSON.stringify(action, null, 4)}`);
    console.log('message: ', `${JSON.stringify(message, null, 4)}`);
    console.log('shortcut: ', `${JSON.stringify(shortcut, null, 4)}`);

    client.chat.postMessage({
      channel: '#lesson-bolt',
      icon_emoji: 'pleading_face',
      text: `<@${shortcut.user.id}>によってtest_shortcutが実行されました`,
    });
  }
);

/* command */
// slashコマンドの入力を監視
app.command('/test_command', async ({ command, ack, say }) => {
  // `/test_command`が実行されたとき
  await ack();
  console.log('command: ', `${JSON.stringify(command, null, 4)}`);

  await say(`<@${command.user_id}>によって\`/test_command\`が実行されました`);
});

(async () => {
  await app.start(process.env.PORT || 8000);
  console.log('⚡️ Bolt app is running!');
})();
