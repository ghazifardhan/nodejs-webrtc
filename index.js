/*
 * Filename: /Users/ghazifadil/Documents/web_app/pusher-webrtc/index.js
 * Path: /Users/ghazifadil/Documents/web_app/pusher-webrtc
 * Created Date: Friday, November 15th 2019, 5:13:42 pm
 * Author: ghazifadil
 * 
 * Copyright (c) 2019 Your Company
 */

 const express = require('express')
 const bodyParser = require('body-parser')
 const Pusher = require('pusher')
 const app = express()

 // Body Parser Middleware
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true }))
 // Session Middleware

 // Create an instance of Pusher
 const pusher = new Pusher({
    appId: '900324',
    key: '8ed8bf0b5ddcdacd537b',
    secret: '078ea541c533ae6449b6',
    cluster: 'ap1',
    encrypted: true
})

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

// get authentictation for the channel;
app.post("/pusher/auth", (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    var presenceData = {
      user_id:
        Math.random()
          .toString(36)
          .slice(2) + Date.now()
    };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

//listen on the app
app.listen(3000, () => {
    return console.log('Server is up on 3000')
});

 