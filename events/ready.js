module.exports = {
    name: "ready",
    async execute(client) {
        console.log(`Hi, ${client.user.username} is now online!`);
        setInterval(() => {
       const statuses = [
         `a!help || ${client.guilds.cache.size} servers.`,
         `a!help || ${client.channels.cache.size} channels`,
         `a!help || ${client.users.cache.size} users`,
       ]
       const status = statuses[Math.floor(Math.random() * statuses.length)]
       client.user.setActivity(status, { type: "WATCHING"})
     }, 60000)

     const w = await client.guilds.cache.get("740295580886106233").fetchWebhooks()
     const webhook = w.find(w => w.name === "Dev logs");
     webhook.send("Im online")
     

}
}
