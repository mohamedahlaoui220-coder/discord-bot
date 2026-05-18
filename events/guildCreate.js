const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'guildCreate',
  async execute(guild, client) {
    console.log(`\n✅ Bot joined guild: ${guild.name} (${guild.id})`);
    console.log(`📊 Now in ${client.guilds.cache.size} guilds\n`);

    // Initialize guild settings
    if (!client.serverSettings.has(guild.id)) {
      client.serverSettings.set(guild.id, {
        guildId: guild.id,
        ticketCategory: null,
        logsChannel: null,
        welcomeChannel: null,
        securityEnabled: false,
      });
    }

    // Send welcome message
    const owner = await guild.fetchOwner();
    const embed = new EmbedBuilder()
      .setTitle('🎉 Thanks for adding me!')
      .setDescription('Thanks for inviting me to your server! Use `/help` to see all available commands.')
      .setColor(config.successColor)
      .addFields(
        { name: '📖 Getting Started', value: 'Use `/help` to see all commands' },
        { name: '🎫 Ticket System', value: 'Use `/ticket setup` to configure tickets' },
        { name: '📋 Applications', value: 'Use `/apply setup` to configure applications' },
        { name: '🔒 Security', value: 'Use `/security enable` to enable anti-nuke' }
      )
      .setFooter({ text: `Prefix: ${config.prefix}` })
      .setTimestamp();

    try {
      await owner.send({ embeds: [embed] });
    } catch (error) {
      console.log('Could not send DM to guild owner');
    }
  },
};
