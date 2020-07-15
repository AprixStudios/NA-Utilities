module.exports = {
    name: "8ball",
    description: "ask a question and get get a totally legit and real answer omg omg yes yes yes!!!",
    aliases: ['8b'],
    category: "fun",
    usage: "[question]",
    
    code(client, message, args, isTest) {
        var msg;
        switch (Math.round(Math.random()*(37-0))) {
            case 0:
                msg = "Impossibly not!";
                break;
            case 1:
                msg = "Yes!";
                break;
            case 2:
                msg = "Yes.";
                break;
            case 3:
                msg = "Yes";
                break;
            case 4:
                msg = "yes";
                break;
            case 5:
                msg = "yes!";
                break;
            case 6:
                msg = "Undoubtable!";
                break;
            case 7:
                msg = "Most likely.";
                break;
            case 8:
                msg = "Probably";
                break;
            case 9:
                msg = "Possibly";
                break;
            case 10:
                msg = "Plausible";
                break;
            case 11:
                msg = "Debatable";
                break;
            case 12:
                msg = "Arguably";
                break;
            case 13:
                msg = "Maybe";
                break;
            case 14:
                msg = "There is a chance.";
                break;
            case 15:
                msg = "There is another... Oh wait sorry. Yes.";
                break;
            case 16:
                msg = "There is another... Oh wait sorry. No.";
                break;
            case 17:
                msg = "I don't know";
                break;
            case 18:
                msg = "idk";
                break;
            case 19:
                msg = "/shrug";
                break;
            case 20:
                msg = "shrug";
                break;
            case 21:
                msg = "Ask the gods";
                break;
            case 22:
                msg = "Why are you asking me?";
                break;
            case 23:
                msg = "I don't know, you tell me.";
                break;
            case 24:
                msg = "I don't think so, to be honest.";
                break;
            case 25:
                msg = "I doubt.";
                break;
            case 26:
                msg = "I have my doubts.";
                break;
            case 27:
                msg = "Oh heck yeah!";
                break;
            case 28:
                msg = "Oh heck no!";
                break;
            case 29:
                msg = "yeah";
                break;
            case 30:
                msg = "nope";
                break;
            case 31:
                msg = "no!";
                break;
            case 32:
                msg = "no";
                break;
            case 33:
                msg = "No.";
                break;
            case 34:
                msg = "No!";
                break;
            case 35:
                msg = "Impossible!";
                break;
            case 36:
                msg = "Not possible";
                break;
            case 37:
                msg = "Not really.";
        }
        message.channel.send(msg);
    }
}