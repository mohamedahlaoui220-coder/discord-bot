const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('🖼️ Get a user\'s avatar')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to get avatar from')
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user') || interaction.user;
    const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle(`🖼️ ${user.username}'s Avatar`)
      .setImage(avatarUrl)
      .setColor(config.defaultColor)
      .setFooter({ text: `Requested by ${interaction.user.username}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
