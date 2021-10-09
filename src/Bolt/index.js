import bolt from '@slack/bolt';
import dotenv from 'dotenv';

const { App, ExpressReceiver } = bolt;
dotenv.config();

const express = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: express,
});

export { app, express };
