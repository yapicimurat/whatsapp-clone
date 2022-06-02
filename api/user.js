const mongoose = require("mongoose");
const ModelUser = require("./model/user");
const ModelChat = require("./model/chat");
const ModelMessage = require("./model/message");
const Helper = require("./helper");
const ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = class User {
    constructor(username, password) {
        this.id = null;
        this.username = username;
        this.password = password;
        this.datetime = null;
    }

    static async login(username, password, res, token) {
        const result = Helper.DefaultResponse;
        try {
            const user = await ModelUser.findOne({
                $and: [
                    {
                        username: username
                    },
                    {
                        password: password
                    }
                ]
            });
            if (user) {
                //user bulundu, simdi user'in gerekli verilerini al
                const chat = await ModelChat.aggregate(
                    [
                        {
                            $match: {
                                $or: [
                                    {
                                        ownerID: user._id,
                                    },
                                    {
                                        targetID: user._id
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "targetID",
                                foreignField: "_id",
                                as: "targetUser"
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "ownerID",
                                foreignField: "_id",
                                as: "ownerUser",
                            }
                        },
                        {
                            $lookup: {
                                from: "messages",
                                localField: "_id",
                                foreignField: "chatID",
                                as: "messages",
                            }
                        }
                    ]
                );

                result.message.login = "Login is successful.";
                result.result.login = user;
                result.result.token = token;
                if (chat) {
                    result.result.chats = chat;
                    result.message.chats = `${chat.length} chat(s) is founded.`;
                    res.json(result);
                } else {
                    result.message.chats = `No chat is founded.`;
                    result.result.chats = null;
                    res.json(result);
                }
            } else {
                result.message.login = "Username or password is incorrect.";
                result.result.login = null;
                res.json(result);
            }
        } catch (err) {
            result.error = true;
            result.message = err;
            result.result = null;
            res.json(result);
        }

    }

    static async getUser(username, res){
        const result = Helper.DefaultResponse;
        try {
            const user = await ModelUser.findOne({
                $match: [
                    {
                        username: username
                    }
                ]
            });
            if (user) {
                
                const chat = await ModelChat.aggregate(
                    [
                        {
                            $match: {
                                $or: [
                                    {
                                        ownerID: user._id,
                                    },
                                    {
                                        targetID: user._id
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "targetID",
                                foreignField: "_id",
                                as: "targetUser"
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "ownerID",
                                foreignField: "_id",
                                as: "ownerUser",
                            }
                        },
                        {
                            $lookup: {
                                from: "messages",
                                localField: "_id",
                                foreignField: "chatID",
                                as: "messages",
                            }
                        }
                    ]
                );
                result.result.login = user;
                if (chat) {
                    result.result.chats = chat;
                    res.json(result);
                } else {
                    result.result.chats = null;
                    res.json(result);
                }
            } else {
                res.sendStatus(403);
            }
        } catch (err) {
            res.sendStatus(403);
        }
    }

    static async register(username, password, res) {
        const result = Helper.DefaultResponse;
        try {
            const user = await ModelUser.findOne({ username: username });
            if (user) {
                result.result = null;
                result.message = "Username is already registered.";
            } else {
                const save = await ModelUser({
                    username: username,
                    password: password
                }).save();

                result.result = save;
                result.message = "User registration successful.";
            }
            res.json(result);
        } catch (err) {
            result.error = true;
            result.result = null;
            result.message = err.message;
            res.json(result);
        }
    }

    static async createChat(userId, tUsername, res) {
        const result = Helper.DefaultResponse;
        try {
            const user = await ModelUser.findOne({
                username: tUsername
            });

            if (user) {
                const targetId = user._id;
                if (targetId.valueOf() === userId) {
                    result.message = "You can not chat with yourself.";
                    result.result = null;
                    res.json(result);
                } else {
                    const chat = await ModelChat.findOne({
                        $or: [
                            {
                                $and: [
                                    { ownerID: mongoose.Types.ObjectId(userId) },
                                    { targetID: targetId }
                                ]
                            },
                            {
                                $and: [
                                    { ownerID: targetId },
                                    { targetID: mongoose.Types.ObjectId(userId) }
                                ]
                            }
                        ]
                    });

                    if (chat) {
                        result.message = "You have already chat with this user.";
                        result.result = null;
                        res.json(result);
                    } else {
                        const roomName = userId + targetId;
                        const newChat = await ModelChat({
                            roomName: roomName,
                            ownerID: userId,
                            targetID: targetId
                        }).save();

                        const chat = await ModelChat.aggregate([
                            {
                                "$match":{
                                    _id: mongoose.Types.ObjectId(newChat._id)
                                }
                            },
                            {
                                "$lookup": {
                                    from: "messages",
                                    localField: "_id",
                                    foreignField: "chatID",
                                    as: "messages"
                                }
                            },
                            {
                                "$lookup": {
                                    from: "users",
                                    localField: "ownerID",
                                    foreignField: "_id",
                                    as: "ownerUser"
                                }
                            },
                            {
                                "$lookup": {
                                    from: "users",
                                    localField: "targetID",
                                    foreignField: "_id",
                                    as: "targetUser"
                                }
                            }
                        ]);
                        result.result = chat[0];
                        result.message = "New chat is created.";
                        res.json(result);
                    }
                }

            } else {
                result.error = false;
                result.message = "User not found.";
                result.result = null;
                res.json(result);
            }
        }
        catch (err) {
            result.error = true;
            result.message = err.message;
            result.result = null;
            res.json(result);
        }

    }

    // static async getChatList(userID, res) {
    //     let result = Helper.DefaultResponse;
    //     (async () => {
    //         return await ModelChat.aggregate([
    //             {
    //                 $match: {
    //                     $or:
    //                         [
    //                             { ownerID: mongoose.Types.ObjectId(userID) },
    //                             { targetID: mongoose.Types.ObjectId(userID) }
    //                         ]
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: "users",
    //                     localField: "targetID",
    //                     foreignField: "_id",
    //                     as: "targetUser"
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: "users",
    //                     localField: "ownerID",
    //                     foreignField: "_id",
    //                     as: "ownerUser",
    //                 }
    //             }
    //         ]
    //         )
    //     })()
    //         .then(data => {
    //             result.message = `${data.length} chat(s) is founded.`;
    //             result.value = {
    //                 chats: data
    //             }
    //             res.json(result);
    //         })
    //         .catch(err => {
    //             result.error = true;
    //             result.message = err.message;
    //             res.json(result);
    //         });
    // }

    static async sendMessage(chatID, roomName, ownerID, targetID, message, res) {
        const result = Helper.DefaultResponse;
        try {
            const newMessage = await ModelMessage({
                chatID: chatID,
                ownerID: ownerID,
                targetID: targetID,
                roomName: roomName,
                message: message
            }).save();
            if (newMessage) {
                result.message = "Message has been saved";
                result.result = newMessage;
                res.json(result);
            }
        }
        catch (err) {
            result.error = true;
            result.message = err.message;
            res.json(result);
        }

    }

}