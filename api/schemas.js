const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

/*
USER
id
username
password
datetime
*/

const User = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        maxLength: 60
    },
    datetime : {
        type : Date,
        default: Date.now 
    }
});



const Chat = new Schema({
    roomName: {
        type: String,
        required: true,
        maxLength: 100
    },
    ownerID: {
        type: ObjectId,
        required: true,
        maxLength: 60
    },
    targetID: {
        type: ObjectId,
        required: true,
        maxLength: 60
    },
    lastMessage: {
        type: String,
        required: false,
        maxLength: 5000
    },
    lastMessageDatetime: {
        type: Date
    }
});


const Message = new Schema({
    chatID: {
        type: ObjectId,
        required: true,
        maxLength: 60
    },
    ownerID: {
        type: ObjectId,
        required: true,
        maxLength: 60
    },
    targetID: {
        type: ObjectId,
        required: true,
        maxLength: 60
    },
    roomName: {
        type: String,
        required: true,
        maxLength: 100
    },
    message: {
        type: String,
        required: true,
        maxLength: 5000
    },
    datetime: {
        type : Date,
        default: Date.now 
    }
});


module.exports = {User, Chat, Message};


