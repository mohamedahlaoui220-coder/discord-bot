const { InteractionType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    // Check blacklist
    if (client.blacklist.has(interaction.user.id)) {
      return interaction.reply({ content: '❌ You are blacklisted!', ephemeral: true });
    }

    // Handle Slash Commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      // Owner only check
      if (command.ownerOnly && interaction.user.id !== config.ownerId) {
        return interaction.reply({ content: '❌ This command is for bot owner only!', ephemeral: true });
      }

      // Guild only check
      if (command.guildOnly && !interaction.guild) {
        return interaction.reply({ content: '❌ This command can only be used in servers!', ephemeral: true });
      }

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: '❌ An error occurred while executing this command!', ephemeral: true });
        } else {
          await interaction.reply({ content: '❌ An error occurred while executing this command!', ephemeral: true });
        }
      }
    }

    // Handle Button Interactions
    if (interaction.isButton()) {
      const [action, ...args] = interaction.customId.split('_');

      try {
        if (action === 'ticket') {
          await handleTicketButton(interaction, client, args);
        } else if (action === 'apply') {
          await handleApplicationButton(interaction, client, args);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Handle Select Menus
    if (interaction.isStringSelectMenu()) {
      const [action, ...args] = interaction.customId.split('_');

      try {
        if (action === 'tickettype') {
          await handleTicketTypeSelect(interaction, client, interaction.values[0]);
        } else if (action === 'helpselect') {
          await handleHelpSelect(interaction, client, interaction.values[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // Handle Modal Submissions
    if (interaction.type === InteractionType.ModalSubmit) {
      const { customId } = interaction;
      if (customId.startsWith('apply_modal')) {
        await handleApplicationModal(interaction, client);
      }
    }
  },
};

async function handleTicketButton(interaction, client, args) {
  const action = args[0];
  const ticketId = args.slice(1).join('_');

  // Add later in ticket.js
  await interaction.reply({ content: 'Ticket action placeholder', ephemeral: true });
}

async function handleApplicationButton(interaction, client, args) {
  const action = args[0];
  // Add later in application.js
  await interaction.reply({ content: 'Application action placeholder', ephemeral: true });
}

async function handleTicketTypeSelect(interaction, client, type) {
  // Add later in ticket panel
  await interaction.reply({ content: `Creating ticket of type: ${type}`, ephemeral: true });
}

async function handleHelpSelect(interaction, client, category) {
  // Add later in help command
  await interaction.reply({ content: `Help category: ${category}`, ephemeral: true });
}

async function handleApplicationModal(interaction, client) {
  // Add later in application setup
  await interaction.reply({ content: 'Application received!', ephemeral: true });
}
