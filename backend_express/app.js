require('dotenv').config();

const express = require("express");

const WebSocket = require("ws");

const axios = require("axios");

const blog = require("./models/user");

const jwt = require("jsonwebtoken");

require("./database/connect");

const app = express();

const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, (error) => {
    (error) ? console.log("error"): console.log("listening");
});

const wss = new WebSocket.Server({
    server,
    verifyClient: async (info) => {
        const token = info.req.headers["sec-websocket-protocol"];
        console.log("helloo")
        console.log(info.req.headers)
        // console.log(token);
        if (!token) {
            return false
        } else {
            try {
                const data = await axios({
                    method: "post",
                    url: "http://localhost:8000/verifytoken/",
                    responseType: "json",
                    data: {
                        token,
                        type: "any"
                    }
                })
                console.log(data.data.username);
                // info.req.user = data.data["username"];
                // cb(true);
                return true;
            } catch {
                console.log("error");
            }
        }
    }
});

wss.on("connection", async (ws, request, client) => {
    try {
        // const user = request.headers["sec-websocket-protocol"]
        // // const value = jwt.verify(user, process.env.secret_key);
        // try {
        //     const result = await chat.find({});
        //     ws.send(JSON.stringify(result.reverse()));
        //     } catch {
        //     console.log("error");
        // }
        ws.on("message", async (msg) => {
            const data = JSON.parse(msg);
            try {
                try{
                    const result = blog({
                        title:data.title,
                        posted_by: data.posted_by,
                        message: data.message
                    })
                    // console.log(result);
                    await result.save();
                }
                catch{
                    console.log("error");
                }
                wss.clients.forEach(async (ws) => {
                    if (ws.readyState == WebSocket.OPEN) {
                        try {
                            const result = await blog.find({title:data.title});
                            console.log(result);
                            ws.send(JSON.stringify(result.reverse()));
                        } catch {
                            console.log("error");
                        }
                    }
                })
            } catch {
                console.log("error");
            }
        })
    } catch (err) {
        console.log(err)
    }
})