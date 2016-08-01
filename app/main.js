window.$ = window.jQuery = require("jquery")

const config = require("../config.js")
const storage = {
    pos: {
              // [y, x]
        current: [0, 3]
    }
}

// DOM Loaded
$(document).ready(function() {
    // Load Settings
    if (config.display.overscan) $("body").css("padding", config.display.overscan)
    if (config.display.dark_mode) $("body").addClass("dark")

    // Position Parser
    $(document).keydown(function(e) {
        var key = e.which

        if (key === 37) {
            // left
            e.preventDefault()
        } else if (key === 38) {
            // up
            e.preventDefault()
        } else if (key === 39) {
            // right
            e.preventDefault()
        } else if (key === 40) {
            // down
            e.preventDefault()
        }
    })
})

// DOM Content Loaded
$(window).on("load", function() {
    console.log("loaded")

    setTimeout(function() {
        $("body").css("overflow-y", "scroll")
        $(".loading-container").fadeOut("fast", function() {
            $(".loading-container").remove()
        })
    }, 1000)
})
