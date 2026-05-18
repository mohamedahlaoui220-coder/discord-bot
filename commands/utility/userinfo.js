const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('👤 Get information about a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to get info about')
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setTitle(`👤 ${user.username}'s Information`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addFields(
        { name: '🆔 User ID', value: user.id, inline: true },
        { name: '👤 Username', value: user.username, inline: true },
        { name: '🏷️ Discriminator', value: user.discriminator, inline: true },
        { name: '📅 Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '📅 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: '🤖 Is Bot', value: user.bot ? 'Yes' : 'No', inline: true },
        { name: '🎭 Roles', value: member.roles.cache.map(r => r).join(', ') || 'No roles', inline: false },
      )
      .setColor(config.defaultColor)
      .setFooter({ text: `Requested by ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
