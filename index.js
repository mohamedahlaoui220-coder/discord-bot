const { Client, Collection, GatewayIntentBits, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildModeration,
  ],
});

client.commands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.tickets = new Collection();
client.applications = new Collection();
client.security = new Collection();
client.serverSettings = new Collection();
client.blacklist = new Set();

// Load Commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => fs.statSync(path.join(commandsPath, file)).isDirectory());

for (const folder of commandFiles) {
  const folderPath = path.join(commandsPath, folder);
  const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    }
  }
}

console.log(`✅ Loaded ${client.commands.size} commands`);

// Load Events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  
  if (event.name && event.execute) {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
}

console.log(`✅ Loaded ${eventFiles.length} events`);

client.login(config.token);
