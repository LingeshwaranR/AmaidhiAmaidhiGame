position = 0;
var interval = setInterval(function () {
    position -= 1;
    $(".platform").css({ "background-position": + position + "px 0px" })
}, 0);