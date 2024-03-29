const fs = require("fs")
const path = require("path")

$(document).ready(function() {
    let home = $("#grid")
    let dir = path.join(__dirname, "apps")

    // Get Files of /apps
    fs.readdir(dir, (err, files) => {
        files.forEach((app) => {
            // Checks each file/folder in Directory
            fs.stat(path.join(dir, app), (err, stats) => {
                // Checks if Folder
                if (stats.isDirectory()) {
                    // Check for manifest.json
                    fs.stat(path.join(dir, app, "manifest.json"), (err, stats) => {
                        if (err) console.error(`${app}.app is invalid, missing manifest`)
                        // Manifest Exists, Read it, Create App
                        if (stats) fs.readFile(path.join(dir, app, "manifest.json"), (err, object) => {
                            // Parse Manifest
                            object = JSON.parse(object)

                            let id = `app_${app}`
                            let icon = path.join(dir, app, "icon.png")
                            let page = path.join(dir, app, "main.html")

                            let $container = $(`<div class="cell" id="${id}"></div>`)
                            let $item =         $(`<div class="item"></div>`)
                            let $icon =             $(`<img src="${icon}" height="125px" width="210px" />`)
                            let $title =            $(`<div class="title"></div>`)

                            // Do Math for Grid Positioning
                            $item.attr("data-pos", "0,1")
                            $title.text(object.title)

                            // Add Item to Grid
                            $item.append($icon)
                            $item.append($title)
                            $container.append($item)
                            home.append($container)

                            // Log for Debug
                            console.log(`Loaded \`${app}\``)

                            // Open App when Clicked
                            $(`#${id}`).click((e) => {
                                e.stopImmediatePropagation()
                                UI.Window(object)
                            })
                        })
                    })
                }
            })
        })
    })
})
