const jsonFile = require("jsonfile");
const {MessageEmbed} = require("discord.js");
module.exports = {
  name: "updates",
    description: "Get info about future planned updates.",
    category: "info",
    usage: "updates",
    run: async (client, message, args) => {
    
        let updatesInfo = jsonFile.readFileSync("./updates.json");
        
        let updatesEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Updates")
        .setDescription("Check future updates.")
        .addField("\u200B", "\u200B");
       
            /*Format for adding a update to the this command:
            
            "TypeWhateverYouWant":{"name": "NameInsideHere", "description": "DescriptionInsideHere"}
            
             Note: To add a new update to this command go to updates.json.
            */

        Object.entries(updatesInfo).forEach(update => {
        
                let name = update[1].name;
                let description = update[1].description;
          
                updatesEmbed.addField(name, description);
        });
           
        message.channel.send(updatesEmbed);

      

      


    }
}