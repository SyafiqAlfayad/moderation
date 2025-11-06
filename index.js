require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();
client.prefixCommands = new Collection();
client.config = config;

// load prefix commands
const prefixPath = path.join(__dirname, 'commands', 'prefix');
if (fs.existsSync(prefixPath)) for (const file of fs.readdirSync(prefixPath).filter(f => f.endsWith('.js'))) {
  const cmd = require(`./commands/prefix/${file}`);
  client.prefixCommands.set(cmd.name, cmd);
}

// load slash commands
const slashPath = path.join(__dirname, 'commands', 'slash');
if (fs.existsSync(slashPath)) for (const file of fs.readdirSync(slashPath).filter(f => f.endsWith('.js'))) {
  const cmd = require(`./commands/slash/${file}`);
  client.commands.set(cmd.data.name, cmd);
}

// events
for (const file of fs.readdirSync('./events').filter(f => f.endsWith('.js'))) {
  const event = require(`./events/${file}`);
  if (event.once) client.once(event.name, (...args) => event.execute(client, ...args));
  else client.on(event.name, (...args) => event.execute(client, ...args));
}

client.login(process.env.BOT_TOKEN);
