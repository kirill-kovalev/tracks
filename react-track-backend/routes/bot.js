const toGeoJson = require('@mapbox/togeojson');
const DOMParser = require('xmldom').DOMParser;
const path = require('path');
const fs = require('fs')
const Downloader = require("nodejs-file-downloader");

const { v4: uuidv4 } = require('uuid');

const bind = (bot, token) => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        if (!msg.from.username.includes("property")) { return }
        const fileID = msg?.document?.file_id
        if (fileID) {
            const file = await bot.getFile(fileID)
            const url = "https://api.telegram.org/file/bot"+token+"/" + file.file_path

            // bot.sendMessage(chatId, JSON.stringify(file))


            downloadTgFile(url)
                .then(obj => JSON.stringify(obj))
                .then(str => bot.sendMessage(chatId, str))


        } else {
            bot.sendMessage(chatId, "wrong message type");
        }
    });
}

const downloadTgFile = (url) => {
    const savedFileUrl = `./tracks/${uuidv4()}.json`

    const savedFileName = `${ uuidv4() }`
    const savedFileDir = "./tracks"
    const savedFilePath = `${ savedFileDir }/${savedFileName}`

    if (url.includes("gpx")) {
        const tmpFileName = `${ uuidv4() }.gpx`
        const tmpFileDir = "./tmp"
        const tmpFilePath = `${ tmpFileDir }/${tmpFileName}`

        return new Downloader({
            url: url,
            directory: tmpFileDir,
            fileName: tmpFileName,
        }).download()
            .then(_ => fs.readFileSync(tmpFilePath, 'utf8'))
            // .then(new DOMParser().parseFromString)
            .then(gpx => toGeoJson.gpx(gpx))
            .then(JSON.stringify)
            .then(conv => fs.writeFileSync(savedFilePath, conv))
            .then(_ => savedFilePath)
    } else if (url.includes("json")) {
        return new Downloader({
            url: url,
            directory: savedFileDir,
            fileName: savedFileName,
        })
            .download()
            .then(_ => savedFilePath)
    }
}

module.exports = bind;