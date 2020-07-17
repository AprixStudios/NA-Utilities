module.exports = {
    name: "ping",
    description: "Returns API and latency",
    
    async code(client, message, args, isTest) {
        const msg = await message.channel.send("Pinging... ")
        await msg.edit(`
        🏓 Pong! 🏓
       Ping is \`${client.ws.ping}ms\`
       Latency is \`${msg.createdTimestamp - message.createdTimestamp}ms\`
        `)
    }
}