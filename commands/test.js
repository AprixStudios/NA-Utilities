module.exports = {
    name: "test",
    description: "Test a command.",
    usage: "<command>",
    aliases: [],
    category: "developer",

    async code(client, message, args, isTest) {
        if (message.author.id !== "266162824529707008") return;
        var msg = message;
        msg.content = message.content.slice(`na-test `.length);
        let newArgs = msg.content.split(/ +/);
        let commandName = newArgs.shift();
        let command = client.commands.get(commandName.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName.toLowerCase()));
        if (!command) return;
        try {
            command.code(client, msg, newArgs, true);
        } catch (error) {
            console.error(error);
        }
    }
}