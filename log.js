const { logChannelId } = require("./config.json");

export const logLevel = {
  error,
  warn,
  info,
  debug,
};

export const log = (level, content, components = []) => {
  const logChannel = client.channels.cache.get(logChannelId);
  if (level === logLevel.error) levelColor = 0xff0000;
  else if (level === logLevel.warn) levelColor = 0xffff00;
  else if (level === logLevel.info) levelColor = 0x00ff00;
  else if (level === logLevel.debug) levelColor = 0x0000ff;

  logChannel.send({
    content: content,
    embeds: [
      {
        title: level,
        description: args.join(" "),
        color: levelColor,
      },
    ],
    components: components,
  });
};

// exports.log = (...args) => {
//   const logChannel = client.channels.cache.get(logChannelId);
//   logChannel.send({
//     content: args.join(" "),
//     embeds: [
//       {
//         title: "Log",
//         description: args.join(" "),
//         color: 0x00ff00,
//       },
//     ],
//   });
// };
