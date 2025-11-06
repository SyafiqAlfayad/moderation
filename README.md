# Discord Moderation Bot (With Auto-moderation)

Setup:
1. Copy files to a folder.
2. `npm install`.
3. Create `.env` from `.env.example` and fill `BOT_TOKEN`, `CLIENT_ID`.
4. Set `config.json` -> `modLogChannelId` to your mod-log channel ID.
5. `node deploy-commands.js` to register slash commands (set `GUILD_ID` for dev guild)
6. `npm start`

Notes:
- All bot replies use EmbedBuilder (Bahasa Indonesia).
- Prefix commands use `config.json` -> `prefix` (default `!`).
- Auto-moderation features configurable in `config.json`.
