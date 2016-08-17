const { app, BrowserWindow } = require("electron")
const config = require("./config.js")
const os = require("os")
const io = require("socket.io")(config.app.port)

let window = null

let start = function() {
    let options = {
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        title: ""
    }

    window = new BrowserWindow(options)
    window.loadURL(`file://${__dirname}/app/index.html`)
    window.on("closed", () => {
        window = null
    })
}

app.on("ready", start)
