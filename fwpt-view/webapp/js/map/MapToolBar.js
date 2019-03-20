
//地图工具条
define(function (require, exports, module) {
    'use strict';
    require("./../../css/map/tools.css");
    require("./RightMenu");
    var toolBarTmpl = require("./../../template/map/ToolBarTmpl.html");

    Smge.MapToolBar = {
        /*地图对象*/
        map: null,
        /*工具栏显示容器---#id*/
        el: null,
        zklayer: null,
        drawLayer: null,
        featureOverlay: null,
        pointermoveKey: null,
        singleclickKey: null,
        selectedZKFeatures: null,
        init: function (options) {
            this.map = options.map;
            this.el = options.el;
            this.zklayer = options.zklayer;
            this.initRightMenu();
            this.initDrawLayer();
            this.initFeatureOverlay();
        },
        //初始化右键菜单
        initRightMenu: function () {
            var that = this;
            Smge.RightMenu.init({
                map: that.map,
                el: "#map-rightKey"
            });
            Smge.RightMenu.render();
        },
        //初始化feature绘制层
        initDrawLayer: function () {
            var that = this;
            var source = new ol.source.Vector({
                wrapX: false
            });
            that.drawLayer = new ol.layer.Vector({
                source: source,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(246, 247, 253, 0.9)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#64a5fd',
                        width: 4
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#64a5fd'
                        })
                    })
                })
            });
            that.map.addLayer(that.drawLayer);
        },
        //初始化feature覆盖层
        initFeatureOverlay: function () {
            var that = this;
            that.featureOverlay = new ol.layer.Vector({
                source: new ol.source.Vector(),
                map: that.map,
                style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#f00',
                        width: 1
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255,255,0,0.1)'
                    }),
                    image: new ol.style.Circle({
                        radius: 8,
                        fill: new ol.style.Fill({
                            color: '#64a5fd'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#fff',
                            width: 3
                        }),
                    })

                })
            });

            that.map.addLayer(that.featureOverlay);
        },
        render: function () {
            $(this.el).html(toolBarTmpl.replace(/^\s*|\s*$/g, ''));
            this.bindUIEvent();
        },
        /*工具栏事件绑定*/
        bindUIEvent: function () {
            var that = this;
            //在点击工具条上的任何一个工具时，先取消map事件的监听
            $(".user-toolbar li").click(function () {
                that.cancelIdentify();
            });
            //弹出工具箱
            $('.fix-btn-a').click(function () {
                $('.fix-bar-box').toggle();
            });
            //生成初堪报告
            $('.exp-report-a').click(function () {
                that.clearScreen();
                var source = that.drawLayer.getSource();
                var draw = new ol.interaction.Draw({
                    source: source,
                    type: 'Polygon',//'Polygon'

                });

                draw.on('drawend', function (event) {

                    var pointxy = event.feature.getGeometry().flatCoordinates;
                    var pypoints = event.feature.getGeometry().getCoordinates()[0];  //组成多边形的点集合
                    var extent = event.feature.getGeometry().getExtent();
                    var features = that.zklayer.getSource().getFeaturesInExtent(extent);
                    var insideFeatures = [];
                    var point;
                    for(var i=0;i<features.length;i++)
                    {
                        point = features[i].getGeometry().getCoordinates();
                        if (that.insidePolygon(pypoints, point))
                        {
                            insideFeatures.push(features[i]);
                        }
                    } 
                    that.highlightFeatures(insideFeatures);
                    that.selectedZKFeatures = insideFeatures;
                    var ptPixel = that.map.getPixelFromCoordinate(pypoints[pypoints.length-2]);
                    Smge.RightMenu.setPosition(ptPixel);
                    Smge.RightMenu.show();
                    Smge.RightMenu.getSelectedZKFeatures(insideFeatures);
                    that.map.removeInteraction(draw);
                });

                that.map.addInteraction(draw);

            });

            //清屏
            $("#tool-clearAll").click(function () {
                that.clearScreen();
            });

            //属性信息查询
            $("#tool-indentify").click(function () {
                $("#map").css("cursor", "help");
                that.pointermoveKey = that.map.on('pointermove', function (evt) {
                    if (evt.dragging) {
                        return;
                    }
                    var pixel = that.map.getEventPixel(evt.originalEvent);
                    that.highlightFeature(pixel);
                });
                that.singleclickKey = that.map.on('singleclick', function (evt) {
                    if (evt.dragging) {
                        return;
                    }
                    var pixel = that.map.getEventPixel(evt.originalEvent);
                    var feature = that.map.forEachFeatureAtPixel(pixel, function (feature) {
                        return feature;
                    });
                    that.displayFeatureInfo(feature);
                });
            });

        },
        //清除DrawLaye中的所有feature
        clearDrawLayer: function () {
            var that = this;
            var source = that.drawLayer.getSource();
            source.clear();
        },
        //清除featureOverlay中的所有feature
        clearFeatureOverlay: function () {
            var that = this;
            that.featureOverlay.getSource().clear(true);
        },
        //根据像素坐标高亮feature
        highlightFeature: function (pixel) {
            var that = this;
            that.featureOverlay.getSource().clear(true);
            var feature = that.map.forEachFeatureAtPixel(pixel, function (feature) {
                return feature;
            });
            if (feature) {
                that.featureOverlay.getSource().addFeature(feature);
            }
        },
        //根据像素坐标高亮feature
        highlightFeatures: function (features) {
            var that = this;
            that.featureOverlay.getSource().clear();
            for (var i = 0; i < features.length; i++) {
                that.featureOverlay.getSource().addFeature(features[i]);
            }
        },
        //显示该feature的信息
        displayFeatureInfo: function (feature) {
            var that = this;
            var id = feature.getId();
            var data = feature.getProperties();
            var keys = feature.getKeys();
            var attrData = [];
            var key;
            var value;
            for (var i = 1; i < keys.length; i++) {
                var obj = {};
                key = keys[i];
                value = feature.get(key);
                obj.key = key;
                obj.value = value;
                attrData.push(obj);
            }
            Smge.PopupIdentify.show({ map: that.map, coordinate: feature.getGeometry(), attrData: attrData });
        },
        //取消Indentify命令
        cancelIdentify: function () {
            var that = this;
            $("#map").css("cursor", "default");
            ol.Observable.unByKey(that.pointermoveKey);
            ol.Observable.unByKey(that.singleclickKey);
        },
        //获取范围内的features
        getFeaturesInExtend: function () {

        },
        //判断点是否在多边形内
        insidePolygon: function (points, testPoint) {
            var x = testPoint[0], y = testPoint[1];
            var inside = false;
            for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
                var xi = points[i][0], yi = points[i][1];
                var xj = points[j][0], yj = points[j][1];

                var intersect = ((yi > y) != (yj > y))
                        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
            return inside;
        },
        clearScreen: function () {
            var that = this;
            that.clearFeatureOverlay();
            that.clearDrawLayer();
            Smge.RightMenu.hide();
        }
    },
    module.exports = Smge.MapToolBar; 
})