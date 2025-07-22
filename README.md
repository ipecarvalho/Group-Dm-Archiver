# Group-Dm-Archiver
Archives a Group DM of your choice, haven't tested it with proper discord servers.

## WARNING !
This will save ALL videos, gifs, images and messages from everyone.
Make sure that:
- Everyone consents to this
- You have enough storage for all of that
- I have no responsibility for what happens to YOUR account.

## How to set it up:

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd group-dm-archiver
   ```

2. **Install required dependencies**
   ```bash
   npm install discord.js-selfbot-v13 dotenv
   ```

3. **Configure your .env file**
   Edit the included `.env` file and fill in your information:
   ```env
   DISCORD_TOKEN=your_discord_token_here
   GROUP_ID=your_group_dm_id_here
   ```

4. **Get your Discord token**
   - Open Discord in your web browser
   - Press F12 to open Developer Tools
   - Go to the Network tab
   - Send a message or perform any action
   - Look for requests to `discord.com/api`
   - In the request headers, find `authorization` - this is your token

5. **Get your Group DM ID**
   - Enable Developer Mode in Discord (Settings > Advanced > Developer Mode)
   - Right-click on the group DM in your Discord client
   - Select "Copy ID"
   - Paste this ID as the GROUP_ID in your .env file

6. **Run the archiver**
   ```bash
   node Main.js
   ```

## What it does:
- Creates an `archives` folder in the project directory
- Saves all messages to `archive.txt` with timestamps and usernames
- Downloads all attachments (images, videos, gifs, files) with unique filenames
- Preserves chronological order of messages
- Handles filename conflicts by adding numbered suffixes

## Output Structure:
```
archives/
├── archive.txt          # All messages with timestamps
├── image1.png           # Downloaded attachments
├── video1.mp4
├── document1.pdf
└── ...
```

## Legal and Ethical Considerations:
- **Always get consent** from all group members before archiving
- Respect privacy and confidentiality
- Be aware of local privacy laws (GDPR, CCPA, etc.)
- Use archived data responsibly
- Do not share archived content without permission

## Troubleshooting:
- **"GROUP_ID not found"**: Make sure your .env file is in the correct location and formatted properly
- **"Channel not found"**: Verify the GROUP_ID is correct and you have access to that group DM
- **"Not a Group DM"**: The provided ID might be for a different type of channel
- **Rate limiting**: The script includes automatic rate limiting, but very large groups may take time

## Technical Notes:
- Uses discord.js-selfbot-v13 for selfbot functionality
- Fetches messages in batches of 100 to handle large message histories
- Automatically handles duplicate filenames
- Creates directory structure as needed

## Disclaimer:
This tool is for educational and personal archival purposes only. Users are responsible for complying with Discord's Terms of Service, applicable laws, and respecting others' privacy rights.