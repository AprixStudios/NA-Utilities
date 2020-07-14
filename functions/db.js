const mongoose = require('mongoose');

// don't question it
const Schema = new mongoose.Schema({
    userID: String,
    db: String,
    punishments: {bans: [Object], mutes: [Object], kicks: [Object], warns: [Object]}
});

const userID = mongoose.model("userID", Schema);
const DB = mongoose.model("id", Schema);

module.exports = { name: "db", userID, DB }