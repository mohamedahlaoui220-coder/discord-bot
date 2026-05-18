const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

const jokes = [
  'Why did the scarecrow win an award? Because he was outstanding in his field!',
  'I\'m reading a book on the history of glue - can\'t put it down.',
  'Why don\'t scientists trust atoms? Because they make up everything!',
  'Did you hear about the mathematician who is afraid of negative numbers? He\'ll stop at nothing to avoid them!',
  'Why did the coffee file a police report? It got mugged!',
  'I told my wife she was drawing her eyebrows too high. She looked surprised.',
  'What do you call a fake noodle? An impasta!',
  'Why don\'t eggs tell jokes? They\'d crack each other up.',
  'I used to hate facial hair, but then it grew on me.',
  'What do you call a bear with no teeth? A gummy bear!',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('🎱 Ask the magic 8ball a question')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Ask your question')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const question = interaction.options.getString('question');
    const responses = [
      'Yes',
      'No',
      'Maybe',
      'Definitely',
      'Absolutely',
      'Not likely',
      'Ask again later',
      'Without a doubt',
      'Don\'t count on it',
      'It is certain',
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    await interaction.reply(`🎱 **${question}**\n\n**${response}**`);
  },
};
