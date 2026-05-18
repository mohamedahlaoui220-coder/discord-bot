const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('🗑️ Clear messages')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),
  guildOnly: true,
  async execute(interaction, client) {
    const amount = interaction.options.getInteger('amount');

    // Check permissions
    if (!interaction.member.permissions.has('ManageMessages')) {
      return interaction.reply({ content: '❌ You do not have permission to delete messages!', ephemeral: true });
    }

    try {
      await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({ content: `🗑️ Deleted **${amount}** messages!`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Could not delete messages!', ephemeral: true });
    }
  },
};
