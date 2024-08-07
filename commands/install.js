const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
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

  async execute(interaction) {},
};
