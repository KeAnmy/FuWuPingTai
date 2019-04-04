//3D地图基础类
    Smge.ThreeMapBase = {
        init: function () {
            this.bindUIEvent();
        },
        //绑定前端UI事件
        bindUIEvent: function () {
            var that = this;
            $(".el-card_body").find("a").click(function () {
                window.open("./../../view/map3d/GeoMap3D.aspx");
            });
        },
    };