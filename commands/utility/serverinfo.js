const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('🏰 Get information about the server'),
  async execute(interaction, client) {
    const guild = interaction.guild;
    const owner = await guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setTitle(`🏰 ${guild.name}'s Information`)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .addFields(
        { name: '🆔 Guild ID', value: guild.id, inline: true },
        { name: '👑 Owner', value: owner.user.username, inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '👥 Members', value: guild.memberCount.toString(), inline: true },
        { name: '📁 Channels', value: guild.channels.cache.size.toString(), inline: true },
        { name: '🎭 Roles', value: guild.roles.cache.size.toString(), inline: true },
        { name: '🔐 Verification Level', value: guild.verificationLevel, inline: true },
        { name: '📍 Region', value: guild.preferredLocale || 'Unknown', inline: true },
      )
      .setColor(config.defaultColor)
      .setFooter({ text: `Requested by ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
