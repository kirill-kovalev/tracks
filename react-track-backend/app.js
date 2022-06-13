const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./tracks"));
app.use('/', indexRouter);


const toGeoJson = require('@mapbox/togeojson');
var Client = require('node-rest-client').Client;
const DOMParser = require('xmldom').DOMParser;
const TelegramBot = require('node-telegram-bot-api');
const token = '5542549275:AAGjzqv7WVl4O2cqFIv5db1v4D7EiGLa7s0';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const httpClient = new Client();

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (!msg.from.username.includes("property")) { return }
    const fileID = msg?.document?.file_id
    if (fileID) {
        const file = await bot.getFile(fileID)
        const url = "https://api.telegram.org/file/bot"+token+"/" + file.file_path
        // bot.sendMessage(chatId, JSON.stringify(url));

        httpClient.get(url, (response) => {
            // bot.sendMessage(chatId, JSON.stringify(data));
            bot.sendMessage(chatId, JSON.stringify(response));
        })

        // if(file.file_path.includes("gpx")) {
        //     toGeoJson.gpx()
        // } else if (file.file_path.includes("json")) {
        //
        // }


    } else {
        bot.sendMessage(chatId, "wrong message type");
    }
});


module.exports = app;

