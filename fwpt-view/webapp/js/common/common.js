$(document).ready(function () {

    var h = $(window).height();
    var wh = $(".wrapper").height();
    var hh = $(".zt-header").height();
    var fh = $(".footer").height();
    if (h - hh - fh >= wh) {
        $(".wrapper").css("min-height", (h - hh - fh) + "px");
    }
    $("#map").css("height", (h - hh) + "px");

    var h = $(window).height();
    var w = $(window).width();
    $(".waiting").css("top", (h / 2 - 8) + "px");
    $(".waiting").css("left", (w / 2 - 62) + "px");

    window.onresize = function () {
        if (w < 1320) {
            //$("body").
        }

    };

});