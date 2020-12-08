const ReactionModel = require('../models/reactionrole')
module.exports = {
    name: "messageReactionAdd",
    async execute(client, reaction, user) {
        let member = reaction.message.guild.members.cache.get(user.id);
        ReactionModel.findOne(
          {
            Guild: reaction.message.guild.id,
            Reaction: reaction.emoji.toString(),
            MessageID: reaction.message.id,
          },
          async (err, data) => {
            if (err) throw err;
            if (data) {
              if (!member.roles.cache.has(data.Role)) {
                member.roles.add(data.Role);
        
              } else {
                  return
              }
            

      }
    
      })
    }
}