const db = require('quick.db')
module.exports = {
 name: "levelMessages",
 category: "config",
 description: "Toggle the level messages",
 usage: "on || off",
run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply("Sorry, you dont have the correct permissions")
const option = args[0];
if(!option) return message.channel.send("Please provide a option on or off")

    if(option === "on") {
       await db.set(`LevelMessage_${message.guild.id}`, true)
        return message.channel.send("I have turned on level messages!")
    }
    if(option === "off") {
        await db.set(`LevelMessage_${message.guild.id}`, false)
        return message.channel.send("I have now turned off level messages!")
    }
  
}
}