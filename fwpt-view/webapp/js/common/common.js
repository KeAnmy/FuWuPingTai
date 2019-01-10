$(document).ready(function () {

    var h = $(window).height();
    var wh = $(".wrapper").height();
    var hh = $(".zt-header").height();
    var fh = $(".footer").height();
    if (h - hh-fh >= wh) {
        $(".wrapper").css("min-height", (h - hh-fh) + "px");
    }
    $("#map").css("height", (h - hh) + "px")
});