position = 0;
var intervalBackground = setInterval(function() {
    position -= .15;
    $(".background-move").css({ "background-position": +position + "px 0px" })
}, 0);