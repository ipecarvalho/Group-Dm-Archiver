require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

const client = new Client();
const SAVE_DIR = './archives';
const TXT_FILE = path.join(SAVE_DIR, 'archive.txt');

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  ensureDirSync(SAVE_DIR);

  // Check if GROUP_ID is provided in .env
  if (!process.env.GROUP_ID) {
    console.error('GROUP_ID not found in .env file. Please add GROUP_ID=your_group_dm_id');
    process.exit(1);
  }

  // Get the specific group DM by ID
  const channel = client.channels.cache.get(process.env.GROUP_ID);
  if (!channel) {
    console.error(`Group DM with ID ${process.env.GROUP_ID} not found or not accessible.`);
    process.exit(1);
  }

  if (channel.type !== 'GROUP_DM') {
    console.error(`Channel ${process.env.GROUP_ID} is not a Group DM.`);
    process.exit(1);
  }

  console.log(`Using Group DM with ID: ${channel.id}`);

  let allMessages = [];
  let lastId = null;

  // Fetch all messages in the group DM
  while (true) {
    const options = { limit: 100 };
    if (lastId) options.before = lastId;
    const messages = await channel.messages.fetch(options);
    if (!messages.size) break;
    allMessages = allMessages.concat(Array.from(messages.values()));
    lastId = messages.last().id;
    if (messages.size < 100) break;
  }

  allMessages.reverse();
  fs.writeFileSync(TXT_FILE, '');

  for (const msg of allMessages) {
    const line = `[${msg.createdAt.toISOString()}] ${msg.author.username}: ${msg.content}\n`;
    fs.appendFileSync(TXT_FILE, line);

    for (const [, attachment] of msg.attachments) {
      // Clean filename
      let filename = path.basename(attachment.url.split('?')[0]);
      let base = filename;
      let ext = '';
      const dot = filename.lastIndexOf('.');
      if (dot !== -1) {
        base = filename.substring(0, dot);
        ext = filename.substring(dot);
      }
      let uniqueFilename = filename;
      let counter = 1;
      let filePath = path.join(SAVE_DIR, uniqueFilename);
      while (fs.existsSync(filePath)) {
        uniqueFilename = `${base}(${counter})${ext}`;
        filePath = path.join(SAVE_DIR, uniqueFilename);
        counter++;
      }

      const res = await fetch(attachment.url);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
      console.log(`Saved: ${uniqueFilename}`);
    }
  }

  console.log(`Saved ${allMessages.length} messages to ${TXT_FILE}`);
  process.exit();
});

client.login(process.env.DISCORD_TOKEN);