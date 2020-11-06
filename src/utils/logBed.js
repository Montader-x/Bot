const { MessageEmbed } = require("discord.js");

async function logBed(client) {
  return new MessageEmbed().setFooter("Andoi logs");
}
module.exports = {
  logBed,
};
