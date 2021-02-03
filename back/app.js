require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Twitter = require('node-tweet-stream');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const io = require('socket.io')(process.env.SOCKET_PORT, {
    cors: {
        origin: process.env.FRONT_HOST,
        methods: ["GET", "POST"]
    }
});

const twitterClient = new Twitter({
    consumer_key: process.env.TW_CONSUMER_KEY,
    consumer_secret: process.env.TW_CONSUMER_SECRET,
    token: process.env.TW_TOKEN,
    token_secret: process.env.TW_TOKEN_SECRET
});

require('./routes/auth')(app);
require('./routes/twitter')(app, twitterClient);

io.on('connection', (socket) => {
    socket.on("set-tweet", (arg) => {
        io.emit('tweet-change', arg);
    });
});

twitterClient.on('tweet', (tweet) => {
    io.emit('tweet', tweet);
});

module.exports = app;