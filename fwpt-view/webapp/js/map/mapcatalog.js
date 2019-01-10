/*地图数据目录*/
define(function (require, exports, module) {
    'use strict';
    var SubTreeChildrenLev1Data = [{ "nodeNo": "1", "id": "subject_zk", "name": "地质钻孔" }, { "nodeNo": "2", "id": "subject_gc", "name": "工程区域" }, { "nodeNo": "3", "id": "subject_zj", "name": "资料目录" }];
    var ThematicCatalogLev1Tmpl = require("../../template/map/ThematicCatalogLev1Tmpl.html");
    var ThematicCatalogLev1Tmp2 = require("../../template/map/ThematicCatalogLev2Tmpl.html");

    Smge.MapCatalog = {
        map: null,
        el: "#subjectTree",
        zkPointsData: null,
        zkLayer: null,
        //初始化
        init: function (option) {
            var that = this;
            that.map = option.map;
            that.zkLayer = option.zkLayer;
            that.initThematicCatalog();
            that.queryZKPointsList();
            that.bindFormEvent();
        },
        //绑定窗体控件事件
        bindFormEvent: function () {
            var that = this;
            //数据目录面板“分类选项”
            $(".classify-list ").click(function () {
                $(this).siblings().removeClass("active");
                $(this).siblings().children("div").removeClass("active");
                $(this).addClass("active");
                $(this).children("div").addClass("active");
                if ($(this).hasClass("special")) {
                    $(".classify-content").show();
                    $(".search-content").hide();
                }
                if ($(this).hasClass("place")) {
                    $(".classify-content").hide();
                    $(".search-content").show();
                }
            });

            //数据目录面板隐藏
            $(".icon-hide").click(function () {
                $(".left-tool").animate({ left: -310 }, 100);
                $(".hide-btn").animate({ left: 0 }, 100);
                $(".hide-btn").show();
            });
            $(".hide-btn").click(function () {
                $(".left-tool").animate({ left: 10 }, 100);
                $(this).hide();
            });

            //点击目录树下的一级节点，显示该节点下的子节点
            $("#subjectTree .lv1-title").click(function () {
                if ($(this).parent().hasClass("active")) {
                    $(this).parent().removeClass("active");
                    $(this).find(".triangle-down").css("transform", "");
                    $(this).parent().find(".ul-leaf").hide();
                }
                else {
                    $(this).parent().addClass("active");
                    $(this).find(".triangle-down").css("transform", "rotate(180deg)");
                    $(this).parent().find(".ul-leaf").show();
                    
                }

            });

            //点击目录树下的二级节点，显示该节点下的子节点
            $("#subjectTree .lv2-title").click(function () {
                if ($(this).parent().hasClass("active")) {
                    $(this).parent().removeClass("active");
                    $(this).parent().find(".ul-leaf-2").hide();
                } else {
                    $(this).parent().addClass("active");
                    $(this).parent().find(".ul-leaf-2").show();
                }

            });

            //一级子节点checkbox点击事件
            $(".classify-children .lv1checkbox").click(function (event) {
                event.stopPropagation();
                if ($(this).parent().parent().hasClass("ischecked")) {
                    $(this).parent().parent().removeClass("ischecked");
                    $(this).parent().parent().find(".children-lv2").removeClass("ischecked");
                    $(this).parent().parent().find(".children-lv3").removeClass("ischecked");
                }
                else {
                    $(this).parent().parent().addClass("ischecked");
                    $(this).parent().parent().find(".children-lv2").addClass("ischecked");
                    $(this).parent().parent().find(".children-lv3").addClass("ischecked");
                    that.drawAllGCPoints();
                }
            });

            //二级子节点checkbox点击事件
            $(".classify-children .lv2checkbox").click(function () {
                event.stopPropagation();
                if ($(this).parent().parent().hasClass("ischecked")) {
                    $(this).parent().parent().removeClass("ischecked");
                    $(this).parent().parent().find(".children-lv3").removeClass("ischecked");

                }
                else {
                    $(this).parent().parent().addClass("ischecked");
                    $(this).parent().parent().find(".children-lv3").addClass("ischecked");
                    var gcid = $(this).parent().parent().attr("id");
                    that.drawGCPoints(gcid);
                }
            });

            //三级子节点checkbox点击事件
            $(".classify-children  .lv3checkbox").click(function () {
                if ($(this).parent().parent().hasClass("ischecked")) {
                    $(this).parent().parent().removeClass("ischecked");
                }
                else {
                    $(this).parent().parent().addClass("ischecked");
                    var nodeID = $(this).parent().parent().attr("id");
                    var nodePID = $(this).parent().parent().attr("data-pid");
                    var strwkt = that.getPointCoordByID(nodePID, nodeID);
                    //that.drawPoint(strwkt, nodeID);
                }
            });



        },
        //初始化数据目录
        initThematicCatalog: function () {
            var that = this;
            var render = template.compile(ThematicCatalogLev1Tmpl);
            var renderData = {};
            renderData.data = SubTreeChildrenLev1Data;
            var htmlstr = render(renderData);
            $(that.el).find(".classify-children").html(htmlstr);
        },

        //获取Oracle数据库中钻孔数据
        queryZKPointsList: function () {
            var that = this;
            $.ajax({
                type: "POST",
                dataType: "text",
                async: false,
                data: {
                    "queryType": "zkdata"
                },
                url: "/cshap/action/ThematicCatalogAction.ashx",
                success: function (result) {
                    that.zkPointsData = JSON.parse(result);
                    that.renderList(that.zkPointsData, "#subject_zk");
                },
                error: function (result) {
                    alert(result.responseText);
                }
            });
        },

        //渲染目录二级子叶点
        renderList: function (datas, id) {
            $(id).find(".ul-leaf").html("");
            var that = this;
            template.helper("showValue", function (value) {
                if (!value) {
                    return value;
                }
                var len = value.length;
                if (len > 10) {
                    value = value.substr(0, 10);
                    value += "...";
                }
                return value;
            });
            var render = template.compile(ThematicCatalogLev1Tmp2);
            var renderData = {};
            renderData.data = datas;
            var htmlstr = render(renderData);
            $(id).find(".ul-leaf").html(htmlstr);
        },

        //根据wkt绘制点对象
        drawPoint: function (wkt, id) {
            var that = this;
            var source = that.zkLayer.getSource();

            var format = new ol.format.WKT();
            var featrue = format.readFeature(wkt, {
                //dataProjection: 'EPSG:4326',
                //featureProjection: 'EPSG:4326'
            });
            featrue.setId(id);
            source.addFeature(featrue);
        },

        //根据工程编号，绘制该工程的所有钻孔点
        drawGCPoints: function (id) {
            var that = this;
            var source = that.zkLayer.getSource();
            var format = new ol.format.WKT();
            var data = that.getGCDatasByID(id);
            var featrue = null;
            for (var i = 0; i < data.length; i++) {
                featrue = format.readFeature(data[i].WKT, {
                    //dataProjection: 'EPSG:4326',
                    //featureProjection: 'EPSG:4326'
                });
                featrue.setId(data[i].ID);
                source.addFeature(featrue);
            }
        },

        //绘制所有的工程的钻孔点
        drawAllGCPoints: function () {
            var that = this;
            var source = that.zkLayer.getSource();
            var format = new ol.format.WKT();
            var datas = that.zkPointsData;
            var data = null;
            var featrue = null;
            for (var i = 0; i < datas.length; i++) {
                data = datas[i].ListZKData;
                for (var j = 0; j < data.length; j++) {
                    featrue = format.readFeature(data[j].WKT, {
                        //dataProjection: 'EPSG:4326',
                        //featureProjection: 'EPSG:4326'
                    });
                    featrue.setId(data[j].ID);
                    source.addFeature(featrue);
                }
               
            }
        },

        //根据钻孔点ID获取点坐标
        getPointCoordByID: function (pid, id) {
            var that = this;
            var zkdata;
            var point = "";
            for (var i = 0; i < that.zkPointsData.length; i++) {
                if (that.zkPointsData[i].ProjectNo == pid) {
                    zkdata = that.zkPointsData[i].ListZKData;
                    for (var j = 0; j < zkdata.length; j++) {
                        if (zkdata[j].ID == id) {
                            point = zkdata[j].WKT;
                            break;
                        }
                    }
                }
            }
            return point;
        },

        //根据工程ID获取该工程的所有数据
        getGCDatasByID: function (id) {
            var that = this;
            var gcdatas;
            for (var i = 0; i < that.zkPointsData.length; i++) {
                if (that.zkPointsData[i].ProjectNo == id) {
                    gcdatas = that.zkPointsData[i].ListZKData;
                }
            }
            return gcdatas;
        },

    };

    module.exports = Smge.MapCatalog;
});

