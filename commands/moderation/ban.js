const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('🔨 Ban a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for ban')
        .setRequired(false)
    ),
  guildOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // Check permissions
    if (!interaction.member.permissions.has('BanMembers')) {
      return interaction.reply({ content: '❌ You do not have permission to ban members!', ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      await interaction.guild.members.ban(user, { reason });
      await interaction.reply(`🔨 **${user.username}** has been banned!\n**Reason:** ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Could not ban this user!', ephemeral: true });
    }
  },
};
