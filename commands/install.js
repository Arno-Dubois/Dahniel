const { log } = require("../log");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("install")
    .setDescription("Installation le bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("classe")
        .setDescription("La classe à installer")
        .setRequired(true)
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("global")
        .setDescription("Installer le bot globalement sur le serveur")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("categorie")
        .setDescription("Installer le bot dans une catégorie spécifique")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("salon")
        .setDescription("Installer le bot dans un salon spécifique")
    ),

  async execute(interaction) {
    const embed_sending = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("Envoi d'une demande d'installation du bot...");

    interaction.reply({
      embeds: [embed_sending],
      ephemeral: true,
    });

    const logChannel = interaction.guild.channels.cache.get(logChannelId);

    const confirmButton = new ButtonBuilder()
      .setLabel("Confirmer")
      .setStyle(ButtonStyle.Success);

    const cancelButton = new ButtonBuilder()
      .setLabel("Annuler")
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(
      confirmButton,
      cancelButton
    );

    if (
      interaction.options.getSubcommand() !== "global" &&
      interaction.options.getSubcommand() !== "categorie" &&
      interaction.options.getSubcommand() !== "salon"
    ) {
      const embed_error = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle("Merci de choisir une option");
      interaction.ediReply({
        embeds: [embed_error],
      });
      return;
    }

    //check if the category or the salon exist
    if (interaction.options.getSubcommand() === "categorie") {
      const category = interaction.guild.channels.cache.find(
        (channel) => channel.name === interaction.options.getString("categorie")
      );
      if (!category) {
        const embed_error = new EmbedBuilder()
          .setColor("#5865F2")
          .setTitle("La catégorie n'existe pas");
        interaction.ediReply({
          embeds: [embed_error],
        });
        return;
      }
    }

    switch (interaction.options.getSubcommand()) {
      case "global":
        log(
          logLevel.info,
          `<@${interaction.user.id}> a demandé l'installation du bot dans le serveur ${interaction.guild.name}`,
          [row]
        );
        break;
      case "categorie":
        log(
          logLevel.info,
          `<@${
            interaction.user.id
          }> a demandé l'installation du bot dans la catégorie ${interaction.options.getString(
            "categorie"
          )} du serveur ${interaction.guild.name}`,
          [row]
        );

        break;
      case "salon":
        log(
          logLevel.info,
          `<@${
            interaction.user.id
          }> a demandé l'installation du bot dans le salon ${interaction.options.getString(
            "salon"
          )} du serveur ${interaction.guild.name}`,
          [row]
        );
        break;
      default:
        const embed_error = new EmbedBuilder()
          .setColor("#5865F2")
          .setTitle("Merci de choisir une option");
        interaction.ediReply({
          embeds: [embed_error],
        });
        return;
    }

    const embed_sended = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("Une demande d'installation du bot a été envoyée");

    interaction.ediReply({
      embeds: [embed_sended],
    });
  },
};
