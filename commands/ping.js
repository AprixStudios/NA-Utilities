module.exports = {
    name: "ping",
    description: "Returns API and latency",
    category: "information",
    usage: "",
    aliases: [],
    
    async code(client, message, args, isTest) {
        const msg = await message.channel.send("Pinging... ")
        await msg.edit(`
        🏓 Pong! 🏓
       Ping is 1\`${client.ws.ping}ms\`
       Latency is \`${msg.createdTimestamp - message.createdTimestamp}ms\`
        `)
    }
}