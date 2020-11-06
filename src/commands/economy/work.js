require("moment-duration-format");
const {
  addUserMoney,
  getUserWork,
  setUserWork,
  getUserJob,
} = require("../../utils/economy");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "work",
  description: "work",
  category: "economy",
  run: async (client, message) => {
    const user = message.author;
    const timeout = 3600000;
    const amount = Math.floor(Math.random() * 500); // i dont have a brain so yeh
    const work = await getUserWork(message.guild.id, user.id);
    const job = await getUserJob(user.id);

    if (work !== null && timeout - (Date.now() - work) > 0) {
      const timeUntillWork = moment(timeout - (Date.now() - work)).format(
        "H [hrs], m [mins], s [secs]"
      );
      message.channel.send(
        `You have already worked recently, ${timeUntillWork} remaining`
      );
    } else {
      //i know how to make it affect your payment, but its such bother, simple yet a bother

      if (!job.job) {
        return message.channel.send(
          "Hey there you dont have a job use the job command to get a job!"
        );
      } else {
        const embed = new MessageEmbed()
          .setTitle("Work!")
          .setDescription(
            `${user.username} worked as a **${job.job}** and earned **${amount}**! 💰`
          )
          .setColor("BLUE");

        message.channel.send(embed);

        addUserMoney(message.guild.id, user.id, amount);
        setUserWork(message.guild.id, user.id, Date.now());
      }
    }
  },
};
