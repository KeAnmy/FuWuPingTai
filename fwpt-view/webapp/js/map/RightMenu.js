/*生成地质报告右键菜单项*/
define(function (require, exports, module) {

    require("./../../css/common/rightmenu.css");
    var rightMenuTmpl = require("./../../template/map/RightMenuTmpl.html");

    Smge.RightMenu = {
        map: null,
        el: null,
        selectedZKFeatures: null,
        init: function (options) {
            this.map = options.map;
            this.el = options.el;
        },
        render: function () {
            var that = this;
            $(that.el).hide();
            $(that.el).html(rightMenuTmpl.replace(/^\s*|\s*$/g, ''));

            that.bindUIEvents();
        },
        bindUIEvents: function () {
            var that = this;
            //取消
            $("#btnCancel").click(function () {
                that.hide();
                Smge.MapToolBar.clearDrawLayer();
                Smge.MapToolBar.clearFeatureOverlay();
            });
            //导出咨询报告
            $("#btnExport").click(function () {
                that.hide();
                //$("#report-box").show();
                window.open("./../../view/Test/Test.aspx", "咨询报告", 'width=600,height=850,top=10,left=600,toolbar=0,menubar=0,scrollbars=0,resizable=0,location=0,status=0');
            });

            //导出Access数据里
            $("#btnAccess").click(function () {
                that.exportAccessDataBase();
            });

        },
        //右键菜单隐藏
        hide: function () {
            var that = this;
            $(that.el).hide();
        },
        //右键菜单弹出
        show: function () {
            var that = this;
            $(that.el).show();
        },
        //设置右键菜单弹出的位置
        setPosition: function (pixlarr) {
            $(".m-rk-menu").css("left", pixlarr[0]);
            $(".m-rk-menu").css("top", pixlarr[1] + 90);//$('.zt-header').height
        },
        //获取已选择的钻孔Feature
        getSelectedZKFeatures: function (fts) {
            this.selectedZKFeatures = fts;
        },
        //导出已选钻孔对应的Access数据
        exportAccessDataBase: function () {
            var that = this;
            var selectedFeatures = that.selectedZKFeatures;
            var zkid = [];
            var count = selectedFeatures.length;
            if (count < 1) {
                alert("请选有效钻孔数据！");
                return;
            }
            that.showMaskWaiting();
            var tempt = "";
            for (var i = 0; i < count; i++) {
                tempt = selectedFeatures[i].getId();
                zkid.push(tempt);
            }
            var postData = zkid.join(",");
            $.ajax({
                type: "POST",
                dataType: "text",
                async: true,
                data: {
                    "data": postData
                },
                url: "/cshap/action/Export2Access.ashx",
                success: function (result) {
                    Smge.RightMenu.hide();
                    that.hideMaskWaiting();
                    window.location.href = '/resources/ExportedProject2.mdb';
                 
                },
                error: function (result) {
                    alert("ERROR:");
                }
            });
        },
        showMaskWaiting: function () {
            $("#mask").show();
            $(".waiting").show();
        },
        hideMaskWaiting: function () {
            $("#mask").hide();
            $(".waiting").hide();
        }

    };
    module.exports = Smge.RightMenu;
})