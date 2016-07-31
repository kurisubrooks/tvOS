const { app, BrowserWindow } = require("electron")
const os = require("os")

let window = null

let start = function() {
    let options = {
        width: 1280,
        height: 720,
        title: ""
    }

    if (os.platform === "linux" || os.platform === "win32") {
        options.fullscreen = true
    }

    window = new BrowserWindow(options)
    window.loadURL(`file://${__dirname}/app/index.html`)
    window.on("closed", () => {
        window = null
    })
}

app.on("ready", start)
