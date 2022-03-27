const mongoose = require("mongoose");
const schemas = require("../schemas");

const Chat = mongoose.model('chats', schemas.Chat);

module.exports = Chat;