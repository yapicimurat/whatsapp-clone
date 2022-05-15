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

    static async login(username, password, res) {
        (async () => {
            return await ModelUser.find(
                {
                    $and: [
                        {
                            username: username
                        },
                        {
                            password: password
                        }
                    ]
                })
        })()
            .then(data => {
                let result = Helper.DefaultResponse;
                result.value = {};
                result.message = {};
                if (data.length > 0) {
                    result.value.login = data;
                    result.message.login = "Login successfull.";
                    let userID = result.value.login[0]._id;
                    (async () => {
                        return await ModelChat.aggregate(
                            [
                                {
                                    $match: {
                                        $or: [
                                            {
                                                ownerID: userID,
                                            },
                                            {
                                                targetID: userID
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
                        )
                    })()
                        .then(data => {
                            result.message.chat = `${data.length} chat(s) is founded.`;
                            result.value.chats = data;
                            res.json(result);
                        })
                        .catch(err => {
                            result.error = true;
                            result.message = err.message;
                            res.json(result);
                        });
                }
                else {
                    result.error = true;
                    result.message.login = "Username or password is incorrect.";
                    res.json(result);
                }
            }).catch(error => {
                let result = Helper.DefaultResponse;
                result.error = true;
                result.message = error.message;
                res.json(result);
            });
    }

    static async register(username, password, res) {
        let result = Helper.DefaultResponse;
        (async () => {
            return await ModelUser.find({ username: username });
        })()
            .then(data => {
                if (data.length > 0) {
                    return Promise.reject("Username is already registered.");
                }
                else if (data.length == 0) {
                    return Promise.resolve();
                }
            })
            .then(() => {
                (async () => {
                    return await ModelUser({
                        username: username,
                        password: password
                    }).save();
                })()
                    .then(data => {
                        result.message = "User registration successful.";
                        result.value = {
                            userID: data._id
                        };
                        res.json(result);
                    }).catch(err => {
                        result.error = true;
                        result.message = err.message;
                        res.json(result);
                    });

            }).catch(err => {
                result.error = true;
                result.message = err;
                res.json(result);
            })
    }

    static async createChat(ownerID, targetUsername, res) {

        let result = Helper.DefaultResponse;
        let targetID = null;
        (async () => {
            return await ModelUser.find({
                username: targetUsername
            });
        })()
        .then(user => {
            if(user.length > 0)
            {

                /*
                    [
                {
                    $match: {
                        $or:
                            [
                                { ownerID: mongoose.Types.ObjectId(userID) },
                                { targetID: mongoose.Types.ObjectId(userID) }
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
                }
            ]
                */
                targetID = user[0]._id;
                (async () => {
                    return await ModelChat.find({
                        $or: [
                            { 
                                $and:[
                                    {ownerID: mongoose.Types.ObjectId(ownerID)},
                                    {targetID: user[0]._id}
                                ]
                            },
                            { 
                                $and:[
                                    {ownerID: user[0]._id},
                                    {targetID: mongoose.Types.ObjectId(ownerID)}
                                ]
                            }
                        ]
                    })
                })()
                .then(chat => {
                    if(chat.length > 0){
                        return Promise.reject("You have already chat with this user.");
                    }
                    else{
                        (async () => {
                            const createdRoomName = ownerID + targetID;
                            return await ModelChat({
                                 roomName: createdRoomName,
                                 ownerID: ownerID,
                                 targetID: targetID
                            }).save();
                        })()
                        .then(data => {
                            (async () => {
                                return await ModelChat.aggregate(
                                    [
                                        {
                                            $match: {
                                                ownerID: data.ownerID
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
                                ])
                            })()
                            .then(data => {
                                result.error = false;
                                result.message = "New chat created.";
                                result.value = {
                                    chats: data
                                }
                                res.json(result);
                            })
                            .catch(error => {
                                result.error = true;
                                result.message = error;
                                res.json(result);
                            });

                        })
                        .catch(error => {
                            result.error = true;
                            result.message = error;
                            res.json(result);
                        });
                    }
                })
                .catch(error => {
                    result.error = true;
                    result.message = error;
                    res.json(result);
                })
            }else{
                return Promise.reject("User not found.")
            }
        })
        .catch(error => {
            result.error = true;
            result.message = error;
            res.json(result);
        });

    }

    static async getChatList(userID, res) {
        let result = Helper.DefaultResponse;
        (async () => {
            return await ModelChat.aggregate([
                {
                    $match: {
                        $or:
                            [
                                { ownerID: mongoose.Types.ObjectId(userID) },
                                { targetID: mongoose.Types.ObjectId(userID) }
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
                }
            ]
            )
        })()
            .then(data => {
                result.message = `${data.length} chat(s) is founded.`;
                result.value = {
                    chats: data
                }
                res.json(result);
            })
            .catch(err => {
                result.error = true;
                result.message = err.message;
                res.json(result);
            });
    }

    static async sendMessage(chatID, roomName, ownerID, targetID, message, res) {
        let result = Helper.DefaultResponse;
        (async () => {
            return await ModelMessage({
                chatID: chatID,
                ownerID: ownerID,
                targetID: targetID,
                roomName: roomName,
                message: message
            }).save()
        })()
        .then(data => {
            result.message = "Message has been saved.";
            result.value = data;
            res.json(result);
        })
        .catch(error => {
            result.error = true;
            result.message = error;
            res.json(result);
        });
    }

}