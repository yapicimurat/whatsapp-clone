const mongoose = require("mongoose");
const schemas = require("../schemas");

const Message = mongoose.model('messages', schemas.Message);

module.exports = Message;