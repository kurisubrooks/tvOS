window.$ = window.jQuery = require("jquery")
window._ = window.lodash = require("lodash")
const moment = require("moment")

const config = require("../config.js")
const storage = {
    pos: {
              // [y, x]
        current: [0, 3]
    },
    alerts: 0,
    windows: 0
}

let getTime = function() {
    return moment().format("h:mm A")
}

// DOM Loaded
$(document).ready(function() {
    // Load Settings
    if (config.display.overscan) $("body").css("padding", config.display.overscan)
    if (config.display.dark_mode) $("body").addClass("dark")

    // Disable Image Dragging
    $(document).on("dragstart", (e) => e.preventDefault())

    // Clock
    $("#clock").text(getTime())

    setInterval(function() {
        $("#clock").text(getTime())
    }, 100)

    // Key Parsing
    $(document).keydown(function(e) {
        var key = e.which

        if (key === 37) {
            // move left
            e.preventDefault()
        } else if (key === 38) {
            // move up
            e.preventDefault()
        } else if (key === 39) {
            // move right
            e.preventDefault()
        } else if (key === 40) {
            // move down
            e.preventDefault()
        } else if (key === 192) {
            if (storage.windows > 0) {
                $("webview").fadeOut(500, $(".application")[0].remove())
            }
        }
    })
})

// DOM Content Loaded
$(window).on("load", function() {
    console.log("tvOS - Ready")

    setTimeout(function() {
        $("body").css("overflow-y", "scroll")
        $(".loading-container").fadeOut("fast", function() {
            $(".loading-container").remove()
        })
    }, 200)
})
