import { app } from '../Bolt';

export const testMessage = () =>
  app.message('test', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(
      `Test Event Subscriptions <@${message.user}>! \n 
    message:
    ${JSON.stringify(message, null, 4)}`
    );
  });
