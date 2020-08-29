
module.exports = {
  name: "close",
  category: "ticket",
  description: "Close a ticket",
  aliases: ["c"],
  usage: "?close",
  run: (client, message, args) => {
        if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
        message.channel.delete();
  }
}