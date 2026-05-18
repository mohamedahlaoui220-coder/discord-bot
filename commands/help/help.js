const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('📚 Get help with bot commands'),
  async execute(interaction, client) {
    const categories = {
      tickets: '🎟️ Ticket System',
      applications: '📋 Application System',
      security: '🔐 Security System',
      moderation: '⚔️ Moderation',
      utility: '🛠️ Utility',
      fun: '🎮 Fun Commands',
      info: 'ℹ️ Bot Info',
    };

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('helpselect')
      .setPlaceholder('Select a category...')
      .addOptions([
        { label: 'Tickets', value: 'tickets', emoji: '🎟️' },
        { label: 'Applications', value: 'applications', emoji: '📋' },
        { label: 'Security', value: 'security', emoji: '🔐' },
        { label: 'Moderation', value: 'moderation', emoji: '⚔️' },
        { label: 'Utility', value: 'utility', emoji: '🛠️' },
        { label: 'Fun', value: 'fun', emoji: '🎮' },
        { label: 'Bot Info', value: 'info', emoji: 'ℹ️' },
      ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setTitle('📚 Bot Help Menu')
      .setDescription('Select a category from the menu below to see commands')
      .setColor(config.defaultColor)
      .setFooter({ text: 'All commands are Slash Commands (/)' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
