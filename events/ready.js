const { ActivityType } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`\n✅ Bot logged in as ${client.user.tag}`);
    console.log(`📊 Serving ${client.guilds.cache.size} guilds\n`);
    
    const activities = [
      { name: '/help - Get Help', type: ActivityType.Listening },
      { name: `${client.guilds.cache.size} servers`, type: ActivityType.Watching },
      { name: 'Discord.js v14', type: ActivityType.Playing },
    ];
    
    let activityIndex = 0;
    setInterval(() => {
      const activity = activities[activityIndex];
      client.user.setActivity(activity.name, { type: activity.type });
      activityIndex = (activityIndex + 1) % activities.length;
    }, 15000);
  },
};
