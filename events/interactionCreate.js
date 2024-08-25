const { Events } = require("discord.js");
const { log } = require("../log");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        // send error to log channel
        log(
          logLevel.error,
          `Erreur sur la commande ${interaction.commandName}`
        );

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content:
              "Une erreur s'est produite lors de l'exécution de cette commande !",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content:
              "Une erreur s'est produite lors de l'exécution de cette commande !",
            ephemeral: true,
          });
        }
      }
    } else if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;

      try {
        await button.execute(interaction);
      } catch (error) {
        console.error(error);
        // send error to log channel
        log(logLevel.error, `Erreur sur le bouton ${interaction.customId}`);

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content:
              "Une erreur s'est produite lors de l'exécution de ce bouton !",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content:
              "Une erreur s'est produite lors de l'exécution de ce bouton !",
            ephemeral: true,
          });
        }
      }
    }
  },
};
