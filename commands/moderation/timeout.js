const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('⏱️ Timeout a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to timeout')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration in seconds')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for timeout')
        .setRequired(false)
    ),
  guildOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // Check permissions
    if (!interaction.member.permissions.has('ModerateMembers')) {
      return interaction.reply({ content: '❌ You do not have permission to timeout members!', ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      await member.timeout(duration * 1000, reason);
      await interaction.reply(`⏱️ **${user.username}** has been timed out for **${duration}** seconds!\n**Reason:** ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Could not timeout this user!', ephemeral: true });
    }
  },
};
