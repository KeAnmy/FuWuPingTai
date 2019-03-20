/*
 * 通用浮云框 主要包含编辑、收藏、设为起点、终点以及周边查询功能
 */
define(function (require, exports, module) {

    'use strict';
    require("./../../css/common/popup.css");
    var popupTmpl = require("./../../template/map/PopupIdentifyTmpl.html");
    var popupContentTmpl = require("./../../template/map/PopupIdentifyContentTmpl.html");
     Smge.PopupIdentify = {
        map: null,
        show: function (option) {
            var that = this;
            that.map = option.map;
            var coordinate = option.coordinate;
            var attrdata = option.attrData;
            $(".indentify-box").html("");
            $(".indentify-box").html(popupTmpl.replace(/^\s*|\s*$/g, ''));
            var attrHtml = that.getAttrHtml(attrdata);
            $("#identify-popupAttr-table").html(attrHtml);
            var overlay = that.map.getOverlayById("indetifyOverlay");
            overlay.setPosition(coordinate.flatCoordinates);
            //var view = that.map.getView();
            //view.setCenter(coordinate.flatCoordinates);
            //view.setZoom(17);
            that.bindUIEvents();
            $(".indentify-box").show();
        },

        bindUIEvents: function () {
            $("#btnIndentifyClose").click(function () {
                $(".indentify-box").hide();
                return false;
            });
        },
        getAttrHtml: function (attrdts) {
            var render = template.compile(popupContentTmpl);
            var renderData = {};
            renderData.data = attrdts;
            var htmlstr = render(renderData);
            return htmlstr;
        },

        clearDrawFeature: function () {

        },
        clearAll: function () {

        },
        /* 缺省的关闭浮云函数 */
        closePopup: function (feature) {
            $("#indentify-popup-closer").trigger("click");
        }

    };

     module.exports = Smge.PopupIdentify;
});
