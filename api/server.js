

const {createServer} = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});
httpServer.listen(3005, () => {
    console.log("HTTP server is listening on port 3005...");

});

const User = require("./user");
const Helper = require("./helper");
const { Console } = require("console");
const url = "mongodb://localhost:27017/whatsapp-clone";

mongoose.connect(url)
.then(() => {
    console.log("Connected to the database...");
    
    
})
.catch((error) => {
    console.log(error);
});

const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.get("/login", (req, res) => {
    const parameters = req.query;
    
    if(!Helper.ParameterChecker(req.query, ["username", "password"]))
    {
        User.login(parameters.username, parameters.password, res);
    }
    else
    {
        res.json({
            error: true,
            message: "Gerekli parametreler verilmedi."
        });
    }
});

app.get("/register", (req, res) => {
    const parameters = req.query;
    if(!Helper.ParameterChecker(req.query, ["username", "password"]))
    {
        User.register(parameters.username, parameters.password, res);
    }
    else
    {
        res.json({
            error: true,
            message: "Gerekli parametreler verilmedi."
        });
    }
});

app.get("/chat-list", (req, res) => {
    const parameters = req.query;
    if(!Helper.ParameterChecker(req.query, ["userID"]))
    {
        User.getChatList(parameters.userID, res);
    }
    else
    {
        res.json({
            error: true,
            message: "Gerekli parametreler verilmedi."
        });
    }
});

app.get("/create-chat", (req, res) => {
    const parameters = req.query;
    if(!Helper.ParameterChecker(req.query, ["ownerID", "targetUsername"]))
    {
        User.createChat(parameters.ownerID, parameters.targetUsername, res);
    }
    else
    {
        res.json({
            error: true,
            message: "Gerekli parametreler verilmedi."
        });
    }
    
});

app.get("/send-message", (req,res) => {
    const parameters = req.query;
    if(!Helper.ParameterChecker(req.query, ["ownerID", "targetID", "chatID", "roomName", "message"]))
    {
        User.sendMessage(parameters.chatID, parameters.roomName, parameters.ownerID, parameters.targetID, parameters.message, res);
    }
    else
    {
        res.json({
            error: true,
            message: "Gerekli parametreler verilmedi."
        });
    }
});


app.get("/get-messages", (req, res) => {
    const parameters = req.query;

    if(!Helper.ParameterChecker(req.query, ["chatID"]))
    {
        User.getMessages(parameters.chatID, res);
        
    }
    else
    {
        res.json({
            error: true,
            message: "Gerekli parametreler verilmedi."
        });
    }
});


io.on("connection", (socket) => {
    console.log(socket.id);


    socket.on("SERVER-CONNECT_ALL_OF-ROOMS",(data) => {
        data.roomNames.forEach(roomName => {
            socket.join(roomName);
        });
    });

    socket.on("SERVER-MESSAGE_TO_ROOM",(data) => {
        socket.join(data.roomName);
        io.to(data.roomName).emit("CLIENT-ROOM_MESSAGE",data);
    });


    socket.on("SERVER-NEW_CHAT", data => {
        socket.broadcast.emit("CLIENT-NEW_CHAT",data)
    });

});



