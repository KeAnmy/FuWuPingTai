/*资料库*/

Smge.DatumLibrary = {
    //初始化
    init: function () {
        this.bindFormEvent();
    },
    //绑定窗体控件事件
    bindFormEvent: function () {
        
        $(".side-nav").find("h3").click(function () {
           
            $(".side-nav").find("h3 a").removeClass("active");
            $(this).children("a").addClass("active");
            $(".side-nav").find("ul").addClass("hide");
            $(this).parent().find("ul").removeClass("hide");
            //$(".side-nav").find("ul").hide();
            //$(this).parent().find("ul").show();
           
        });
    }
};