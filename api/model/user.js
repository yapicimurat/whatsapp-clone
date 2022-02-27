const mongoose = require("mongoose");
const schemas = require("../schemas");

const User = mongoose.model('users', schemas.User);

module.exports = User;