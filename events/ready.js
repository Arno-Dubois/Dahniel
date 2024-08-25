const { Events, ActivityType } = require("discord.js");
const { log, logLevel } = require("../log.js");

module.exports = {
  name: Events.ClientReady,
  execute(client) {
    client.user.setActivity("V3 near", {
      type: ActivityType.Custom,
    });

    log(logLevel.info, `Logged in as ${client.user.tag}!`);
  },
};
