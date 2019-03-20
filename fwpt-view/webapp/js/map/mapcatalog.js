/*地图数据目录*/
define(function (require, exports, module) {
    'use strict';
    var SubTreeChildrenLev1Data = [{ "nodeNo": "1", "id": "subject_zk", "name": "地质钻孔" }, { "nodeNo": "2", "id": "subject_gc", "name": "工程区域" }, { "nodeNo": "3", "id": "subject_zj", "name": "资料目录" }];
    var ThematicCatalogLev1Tmpl = require("../../template/map/ThematicCatalogLev1Tmpl.html");
    var ThematicCatalogLev1Tmp2 = require("../../template/map/ThematicCatalogLev2Tmpl.html");
    var MapToolBar = require("./MapToolBar");
    var PopupIdentify = require("./../common/PopupIdentify");

    Smge.MapCatalog = {
        map: null,
        el: "#subjectTree",
        zkPointsData: null,
        gcqysData: null,
        zkLayer: null,
        //初始化
        int: function (option) {
            var that = this;
            that.map = option.map;
            that.zkLayer = option.zkLayer;
            that.intThematicCatalog();
            that.queryZKPointsList();
            that.drawAllGCPoints();
            //that.queryGCQYList();
            that.bindFormEvent();
            that.bindTrigger();
            //that.hoverFeature();
            //that.displayFeatureInfo();
            that.intMapToolBar();

        },
        //初始化工具条
        intMapToolBar: function () {
            Smge.MapToolBar.init({
                el: "#map-tools",
                map: this.map,
                zklayer:this.zkLayer
            });
            Smge.MapToolBar.render();
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

            //点击目录树下的二级节点下的“help”图标，进行定位
            $("#subject_zk .lv2-title .help").click(function (event) {
                event.stopPropagation();
                var feature;
                var zkid = "";
                var zknodes = $(this).parent().parent().find(".children-lv3");
                for (var i = 0; i < zknodes.length; i++) {
                    zkid = $(zknodes[i]).attr("id");
                    feature = that.getZKFeatureByID(zkid);
                    //that.highlightFeature(feature);
                    if (i == parseInt(zknodes.length / 2)) {
                        that.locateFeature(feature);
                    }
                }

            });


            //一级子节点checkbox点击事件
            $(".classify-children .lv1checkbox").click(function (event) {
                event.stopPropagation();
                if ($(this).parent().parent().hasClass("ischecked")) {
                    $(this).parent().parent().removeClass("ischecked");
                    $(this).parent().parent().find(".children-lv2").removeClass("ischecked");
                    $(this).parent().parent().find(".children-lv3").removeClass("ischecked");
                    //that.hidezkFeatures($(this).parent().parent().find(".children-lv3"));
                }
                else {
                    $(this).parent().parent().addClass("ischecked");
                    $(this).parent().parent().find(".children-lv2").addClass("ischecked");
                    $(this).parent().parent().find(".children-lv3").addClass("ischecked");
                    //that.showzkFeatures($(this).parent().parent().find(".children-lv3"));
                }

            });

            //二级子节点checkbox点击事件
            $(".classify-children .lv2checkbox").click(function (event) {
                event.stopPropagation();
                var gcid = $(this).parent().parent().attr("id");
                if ($(this).parent().parent().hasClass("ischecked")) {
                    $(this).parent().parent().removeClass("ischecked");
                    $(this).parent().parent().find(".children-lv3").removeClass("ischecked");
                    //that.hidezkFeatures($(this).parent().parent().find(".children-lv3"));
                }
                else {
                    $(this).parent().parent().addClass("ischecked");
                    $(this).parent().parent().find(".children-lv3").addClass("ischecked");
                    //that.showzkFeatures($(this).parent().parent().find(".children-lv3"));
                }
            });

            //三级子节点checkbox点击事件
            $(".classify-children  .lv3checkbox").click(function () {
                var nodeID = $(this).parent().parent().attr("id");
                var nodePID = $(this).parent().parent().attr("data-pid");
                var strwkt = that.getPointCoordByID(nodePID, nodeID);
                var feature = that.getZKFeatureByID(nodeID);
                if ($(this).parent().parent().hasClass("ischecked")) {
                    $(this).parent().parent().removeClass("ischecked");
                    //隐藏钻孔点                 
                    //that.hideFeature(feature);
                }
                else {
                    $(this).parent().parent().addClass("ischecked");
                    //显示钻孔点
                    //that.showFeature(feature);

                }
            });
        },
        bindTrigger: function () {
            $(".classify-children .lv1checkbox").trigger("click");
            $(".checkbox").unbind("click");

        },
        //初始化数据目录
        intThematicCatalog: function () {
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
                    if (that.zkPointsData.length != 0) {
                        that.renderList(that.zkPointsData, "#subject_zk");
                    }
                },
                error: function (result) {
                    alert(result.responseText);
                }
            });
        },

        //获取Oracle数据库中工程区域数据
        queryGCQYList: function () {
            var that = this;
            $.ajax({
                type: "POST",
                dataType: "text",
                async: false,
                data: {
                    "queryType": "gcdata"
                },
                url: "/cshap/action/ThematicCatalogAction.ashx",
                success: function (result) {
                    that.gcqysData = JSON.parse(result);
                    if (that.gcqysData.length != 0) {
                        that.renderList(that.gcqysData, "#subject_gc");
                    }
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
                featrue.setId(data[i].Id);
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
                data = datas[i].ListChildren;
                for (var j = 0; j < data.length; j++) {
                    featrue = format.readFeature(data[j].WKT, {

                    });
                    featrue.setId(data[j].Id);
                    featrue.setProperties({ "项目名称": data[j].ProjectName }, true);
                    featrue.setProperties({ "钻孔编号": data[j].ZKBH }, true);
                    source.addFeature(featrue);
                    //that.hideFeature(featrue);
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
                    zkdata = that.zkPointsData[i].ListChildren;
                    for (var j = 0; j < zkdata.length; j++) {
                        if (zkdata[j].Id == id) {
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

        //根据id获取feature
        getZKFeatureByID: function (id) {
            var source = this.zkLayer.getSource();
            var features = source.getFeatures();
            var feature = source.getFeatureById(id);
            return feature;
        },
        //隐藏featrue
        hideFeature: function (feature) {
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0)'
                    })
                    //opacity: 0
                }),
            });
            feature.setStyle(style);
        },
        //显示feature
        showFeature: function (feature) {
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 0, 0, 1)'
                    })
                })
                // opacity:0.5
            });
            feature.setStyle(style);
        },
        //高亮featrue
        highlightFeature: function (feature) {
            var style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: 'rgba(106, 8, 241, 1)'  //#6004f3
                    })
                })
                //opacity: 1
            });
            feature.setStyle(style);
        },
        //定位feature
        locateFeature: function (feature) {
            var geometry = feature.getGeometry();
            var that = this;
            var view = that.map.getView();
            view.setCenter(geometry.flatCoordinates);
            view.setZoom(17);
        },
        //隐藏一组节点对应的钻孔特征--".children-lv3"
        hidezkFeatures: function (lstNodes) {
            if (lstNodes.length < 1) {
                return;
            }
            var that = this;
            for (var i = 0; i < lstNodes.length; i++) {
                var zkid = $(lstNodes[i]).attr("id");
                var feature = that.getZKFeatureByID(zkid);
                that.hideFeature(feature);
            }
        },
        //显示一组节点对应的钻孔特征--".children-lv3"
        showzkFeatures: function (lstNodes) {
            if (lstNodes.length < 1) {
                return;
            }
            var that = this;
            for (var i = 0; i < lstNodes.length; i++) {
                var zkid = $(lstNodes[i]).attr("id");
                var feature = that.getZKFeatureByID(zkid);
                that.showFeature(feature);
            }
        },
        //鼠标悬浮时，高亮特征样式
        hoverFeature: function () {
            var that = this;
            var hoverstyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffff00'  //#6004f3
                    }),
                    stroke: new ol.style.Stroke({           //线样式
                        color: '#ffcc33',
                        width: 2
                    }),
                }),
                //text: new ol.style.Text({ //文本样式
                //    font: '20px Verdana,sans-serif',
                //    text: 'aaa',
                //    fill: new ol.style.Fill({
                //        color: 'red'
                //    })
                //})
            });
            var selectPointerMove = new ol.interaction.Select({
                condition: ol.events.condition.pointerMove,
                style: hoverstyle
            });
            that.map.addInteraction(selectPointerMove);


        },
        //显示feature属性信息
        displayFeatureInfo: function () {
            var that = this;
            var select = new ol.interaction.Select({
                style:new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffff00'  //#6004f3
                        }),
                        stroke: new ol.style.Stroke({           //线样式
                            color: '#ffcc33',
                            width: 2
                        })
                    })
                })
            });
            that.map.addInteraction(select);
           
            select.on('select', function (e) {
                if (e.selected.length > 0) {
                  
                    var feature = e.selected[0];
                    var id = feature.getId();
                    var data = feature.getProperties();
                    var keys = feature.getKeys();
                    var attrData = [];
                    var key;
                    var value;
                    for (var i = 1; i < keys.length;i++)
                    {
                        var obj = {};
                        key = keys[i];
                        value = feature.get(key);
                        obj.key = key;
                        obj.value = value;
                        attrData.push(obj);
                    }

                    Smge.PopupIdentify.show({ map: that.map, coordinate: feature.getGeometry(), attrData: attrData });
                }
            });
        },

    }

    module.exports = Smge.MapCatalog;
});

