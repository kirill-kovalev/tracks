const toGeoJson = require('@mapbox/togeojson');
const {DOMParser} = require('xmldom');
const path = require('path');
const fs = require('fs')
const Downloader = require("nodejs-file-downloader");

const { v4: uuidv4 } = require('uuid');

const bind = (bot, token) => {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        if (!msg.from.username.toLowerCase().includes(process.env["OWNER"].toLowerCase())) { return }
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

    bot.onText(/\/rm (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        if (!msg.from.username.toLowerCase().includes(process.env["OWNER"].toLowerCase())) { return }

        fs.rmSync(`${process.cwd()}/tracks/${match[1]}`)

        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, "removed file with id "+match[1] );
    });

}

const downloadTgFile = (url) => {

    const savedFileName = `${ uuidv4() }`
    const savedFileDir = `${process.cwd()}/tracks`
    const savedFilePath = `${ savedFileDir }/${savedFileName}`

    // if(!fs.existsSync(savedFileDir)) {
    //     fs.mkdirSync(savedFileDir)
    // }

    if (url.includes("gpx")) {
        const tmpFileName = `${ uuidv4() }.gpx`
        const tmpFileDir = `${process.cwd()}/tmp`
        const tmpFilePath = `${ tmpFileDir }/${tmpFileName}`

        const parser = new DOMParser()

        return new Downloader({
            url: url,
            directory: tmpFileDir,
            fileName: tmpFileName,
        }).download()
            .then(_ => fs.readFileSync(tmpFilePath, 'utf8'))
            .then(str => parser.parseFromString(str))
            .then(gpx => toGeoJson.gpx(gpx))
            .then(JSON.stringify)
            .then(conv => fs.writeFileSync(savedFilePath, conv))
            .then(_ => savedFilePath)
    } else {
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