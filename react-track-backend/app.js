const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(`${process.cwd()}/tracks/`));
app.use('/', indexRouter);



const botRouteBinder = require('./routes/bot');
const TelegramBot = require('node-telegram-bot-api');
const token = process.env["BOT_TOKEN"] || "5542549275:AAG0didypohIfWACvv6FwcpNEurvaE0BoAY";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
botRouteBinder(bot, token)
// Listen for any kind of message. There are different kinds of
// messages.

module.exports = app;

