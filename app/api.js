let guid = function() {
    function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

window.UI = {
    this: this,
    body: $("body"),
    container: $(".container"),
    display: $(".container .screen"),
    headview: $(".container .screen .widget_bar"),
    mainbar: $(".container .screen .main_bar"),
    appsbar: $(".container .screen .apps_bar"),

    Alert: function(object) {
        let id =        guid()
        let rest =      $("body > .container")
        let body =      $("body")
        let overlay =   $('<div class="alert-overlay" style="display:none;"></div>')
        let alert =     $('<div class="alert" id="' + id + '"></div>')
        let container = $('<div class="container"></div>')
        let title =     $('<div class="title"></div>')
        let message =   $('<div class="message"></div>')
        let button =    $('<div class="button" id="' + id + '"></div>').text("Dismiss")

        // Build Element
        title.text(object.title)
        message.html(object.message)
        rest.css("-webkit-filter", "blur(3px)")

        button.click(function(e) {
            // Prevent Double Trigger
            e.stopImmediatePropagation()

            storage.alerts--

            if (!storage.alerts) {
                overlay.fadeOut(100, function() {
                    alert.remove()
                    overlay.remove()
                    rest.css("-webkit-filter", "blur(0)")
                })
            } else {
                alert.fadeOut(100, function() {
                    alert.remove()
                })
            }
        });

        container.append(title)
        container.append(message)
        container.append(button)
        alert.append(container)
        overlay.append(alert)
        body.prepend(overlay)
        overlay.fadeIn(100)

        // Add to Alert Indicator
        storage.alerts++
    }
}
