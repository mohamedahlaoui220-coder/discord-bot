const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 Check bot latency'),
  async execute(interaction, client) {
    const ping = client.ws.ping;
    await interaction.reply(`🏓 Pong! Bot latency: **${ping}ms**`);
  },
};
