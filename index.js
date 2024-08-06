const fs = require("fs");
const path = require("path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const { token, logChannelId } = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  presence: {
    activities: [{ name: "V3 :eyes: near", type: ActivityType.Custom }],
  },
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(foldersPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(foldersPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, () => {
  client.user.setActivity("V3 near", {
    type: ActivityType.Custom,
  });
  console.log("Ready!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    // send error to log channel
    const logChannel = client.channels.cache.get(logChannelId);
    await logChannel.send({
      content: `[ERROR] Une erreur s'est produite lors de l'exécution de la commande \`${interaction.commandName}\`.`,
      embeds: [
        {
          title: "Erreur",
          description: error.message,
          color: 0xff0000,
        },
      ],
    });

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
});

client.login(token);
