const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('😂 Get a random meme'),
  async execute(interaction, client) {
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      const data = await response.json();
      const meme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];

      await interaction.reply(`😂 **${meme.name}**\n${meme.url}`);
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ Could not fetch a meme. Try again later!');
    }
  },
};
