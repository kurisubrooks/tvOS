let guid = function() {
    function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}

// OS API
window.UI = {
    self: this,

    // Alerts
    Alert: function(object) {
        let id =        guid()
        let body =      $("body")
        let rest =      $("body > .container")
        let overlay =   $(`<div class="alert-overlay" style="display:none"></div>`)
        let alert =         $(`<div class="alert" id="${id}"></div>`)
        let container =         $(`<div class="container"></div>`)
        let title =                 $(`<div class="title"></div>`)
        let message =               $(`<div class="message"></div>`)
        let button =                $(`<div class="button" id=${id}></div>`)

        // Build Element
        title.text(object.title)
        message.html(object.message)
        button.text(object.action ? object.action : "Dismiss")
        rest.css("-webkit-filter", "blur(20px)")

        // Close Alert on Click
        button.click(function(e) {
            // Prevent Double Trigger
            e.stopImmediatePropagation()

            storage.alerts--

            if (!storage.alerts) {
                overlay.fadeOut(200, function() {
                    alert.remove()
                    overlay.remove()
                    rest.css("-webkit-filter", "blur(0)")
                })
            } else {
                alert.fadeOut(200, alert.remove())
            }
        })

        // Add to Screen
        container.append(title)
        container.append(message)
        container.append(button)
        alert.append(container)
        overlay.append(alert)
        body.prepend(overlay)
        overlay.fadeIn("fast")

        // Add to Storage
        storage.alerts++
    },

    // Application API
    Window: (object) => {
        let id =        guid()
        let body =      $("body")
        let rest =      $("body > .container")
        let application =   $(`<div class="application" id="${id}" style="display:none"></div>`)
        let browser =           $(`<webview></webview>`)
        let url = object.type === "browser" ? object.url : path.join(__dirname, apps, object.app, main.html)

        // Build Element
        browser.attr("src", url)

        // Open Window
        application.append(browser)
        body.append(application)
        application.fadeIn("fast")

        // Log for Debug
        console.log("Starting \`" + object.app + '`')

        // Add to Storage
        storage.windows++
    }
}
