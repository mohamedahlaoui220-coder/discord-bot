const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('💕 Ship two people together')
    .addUserOption(option =>
      option.setName('user1')
        .setDescription('First person')
        .setRequired(true)
    )
    .addUserOption(option =>
      option.setName('user2')
        .setDescription('Second person')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');

    const percentage = Math.floor(Math.random() * 101);
    const hearts = Math.floor(percentage / 10);
    const empty = 10 - hearts;

    const bar = '❤️'.repeat(hearts) + '🤍'.repeat(empty);

    let response = '';
    if (percentage === 100) {
      response = `💯 Perfect match!`;
    } else if (percentage >= 80) {
      response = `😍 Amazing chemistry!`;
    } else if (percentage >= 60) {
      response = `😊 Could work!`;
    } else if (percentage >= 40) {
      response = `🤔 Maybe not...`;
    } else if (percentage >= 20) {
      response = `😬 Probably not...`;
    } else {
      response = `😭 Yikes!`;
    }

    await interaction.reply(`💕 **${user1.username}** ❤️ **${user2.username}**\n\n${bar}\n\n**${percentage}%** - ${response}`);
  },
};
