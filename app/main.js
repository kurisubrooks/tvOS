window.$ = window.jQuery = require("jquery")

const config = require("../config.js")

// DOM Loaded
$(document).ready(function() {
    console.log("ready")

    if (config.display.overscan) $("body").css("padding", config.display.overscan)
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
