const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('👢 Kick a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for kick')
        .setRequired(false)
    ),
  guildOnly: true,
  async execute(interaction, client) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    // Check permissions
    if (!interaction.member.permissions.has('KickMembers')) {
      return interaction.reply({ content: '❌ You do not have permission to kick members!', ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      await member.kick(reason);
      await interaction.reply(`👢 **${user.username}** has been kicked!\n**Reason:** ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Could not kick this user!', ephemeral: true });
    }
  },
};
