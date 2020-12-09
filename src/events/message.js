const { MessageEmbed } = require("discord.js");
const { owners } = require("../config.json");
const Levels = require("discord-xp");
const configModel = require("../models/config");
const Discord = require("discord.js");
const games = new Map();
const botModel = require("../models/bot");
const Blacklist = require("../models/blacklistmodel");
module.exports = {
  name: "message",
  async execute(client, message) {
    const botDoc = await botModel.findOne({ name: "Andoi" });
    if (!botDoc) {
      let r = new botModel({ name: "Andoi", commandssincerestart: 0 });
      r.save();
    }
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    const mentions = message.mentions.members;
    //hey can u add me to the database
    const config = await configModel.findOne({ GuildID: message.guild.id });
    if (!config) {
      const aaa = new configModel({
        GuildID: message.guild.id,
      });
      aaa.save();
    }
    const disabled = config.disabled;
    const commands = config.commands;
    const blacklistedWords = config.badwords;
    if (
      !message.author.bot &&
      !message.content.startsWith(`${config.prefix}blacklistedwords`)
    ) {
      blacklistedWords !== null &&
        blacklistedWords.forEach((word) => {
          if (message.content.toLowerCase().includes(word.toLowerCase())) {
            message.delete();
            return message
              .reply(
                "You used a bad word the admin has set, therefore your message was deleted!"
              )
              .then((msg) => {
                setTimeout(() => {
                  msg.delete();
                }, 5000);
              });
          }
        });
    }
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomAmountOfXp
    );
    const ignoredChannels = config.ignored_channels;
    if (ignoredChannels.includes(message.channel.id)) return;
    if (config.levelMessage === true) {
      if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(
          `${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`
        );
      }
    }
    const prefix = config.prefix;
    if (
      message.content.startsWith("@someone") &&
      message.guild &&
      message.member.hasPermission("MANAGE_CHANNELS")
    ) {
      const members = message.guild.members.cache.random();

      message.channel.send(members.user.toString()).then((msg) => {
        msg.delete({ timeout: 1000 });
      });
    }
    if (!message.guild) return;
    if (
      message.content.startsWith(`<@!${client.user.id}>`) &&
      !message.mentions.everyone
    ) {
      let mentionEmbed = new MessageEmbed()
        .setColor("BLACK")
        .setTitle("Bot Info")
        .setDescription("Information about me")
        .addFields(
          { name: "Prefix: ", value: prefix },
          {
            name: "Need support?",
            value: "Join our [support server](https://discord.gg/cPD7ufj)",
          }
        );

      message.channel.send(mentionEmbed);
    }
    if (mentions && !message.content.startsWith(prefix)) {
      mentions.forEach((member) => {
        const user = client.afk.get(member.id);

        if (user) {
          const embed = new MessageEmbed()
            .setTitle("AFK!")
            .setDescription(
              `${member.user.tag} is AFK!\n **Reason:** ${user.reason}`
            );
          message.channel.send(embed);
        }
      });
    }
    const blacklistedUsers = await Blacklist.find();
    if (blacklistedUsers) {
      const isBlacklisted = blacklistedUsers.find(
        (u) => u.user === message.author.id
      );

      if (isBlacklisted) {
        return message.reply("You've been blacklisted from using this bot.");
      }
    }
    if (!message.content.startsWith(prefix)) return;

    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift();
    if (cmd.length === 0) return;
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    /**-----------------------[PERMISSIONS]--------------------- */
    if (command.botOwnersOnly) {
      const botOwnersOnly = command.botOwnersOnly;

      if (message.author.id !== owners[0] && message.author.id !== owners[1])
        return message.reply("Only the owner is allowed to run this command");
    }
    if (command.botPermission) {
      let neededPerms = [];

      command.botPermission.forEach((p) => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          `I need ${neededPerms.join(
            ", "
          )} permission(s) to execute the command!`
        );
    } else if (command.authorPermission) {
      let neededPerms = [];

      command.authorPermission.forEach((p) => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          `You need ${neededPerms.join(
            ", "
          )} permission(s) to execute the command!`
        );
    }
    /**------------------[COOLDOWN]-------------------------- */
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if (disabled.length > 0) {
      if (disabled.includes(command.category)) {
        return message.channel.send("That category is disabled for this guild");
      }
    }
    if (commands.length > 0) {
      if (commands.includes(command.name)) {
        return message.channel.send("That command was disabled for this guild");
      }
    }
    const ops = {
      games: games,
    };
    try {
      if (command) {
        command.run(client, message, args, ops);
        botDoc.commandssincerestart += 1;
        botDoc.total += 1;
        await botDoc.save();
      }
    } catch (err) {
      message.channel.send("An unexpected error has occured!");
    }
  },
};
