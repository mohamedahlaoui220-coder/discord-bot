const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    const commands = [];
    const commandsPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
      const folderPath = path.join(commandsPath, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;
      
      const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(path.join(folderPath, file));
        if (command.data) commands.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
      console.log(`🔄 Registering ${commands.length} slash commands...`);
      await rest.put(Routes.applicationCommands(config.clientId), { body: commands });
      console.log('✅ Slash commands registered successfully!\n');
    } catch (error) {
      console.error('❌ Error registering slash commands:', error);
    }
  },
};
