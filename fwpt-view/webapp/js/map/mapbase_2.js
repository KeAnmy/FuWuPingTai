
/*地图核心对象*/

define(function (require, exports, module) {

    var MaoBase_2 = function () {
        this.map = null; //地图对象        
        this.baseLayers = ["vec_w", "img_w", "ter_w", "cva_w"];  //天地图图层
        var vecLayer = null;  //矢量地图图层
        var imgLayer = null;  //影像图层
        var terLayer = null;   //地形图层
        var vecAnno = null;  //矢量注记图层
        //封装底图函数
        this.getBaseLayer = function (layername, layer) {
            return new ol.layer.Tile({
                title: layername,
                source: new ol.source.XYZ({
                    url: "http://t4.tianditu.com/DataServer?T=" + layer + "&x={x}&y={y}&l={z}"
                })
            });
        };
        //地图基础类初始化
        this.initialize = function () {
            this.initBaseLayers();
            this.initMap('map');
        };
        //初始化底图
        this.initMap = function (id) {
            this.map = new ol.Map({
                // 设置地图控件，默认的三个控件都不显示
                controls: ol.control.defaults({
                    attribution: false,
                    rotate: false,
                    zoom: false
                }),
                view: new ol.View({
                    // 设置成都为地图中心
                    center: [123.42, 41.80],
                    // 指定投影使用EPSG:4326
                    projection: 'EPSG:4326',
                    zoom: 10
                }),
                layers: [vecLayer, vecAnno],
                target: id

            });
        };
        //初始化基础图层
        this.initBaseLayers = function () {

            vecLayer = this.getBaseLayer("地图", this.baseLayers[0]);
            imgLayer = this.getBaseLayer("影像", this.baseLayers[1]);
            terLayer = this.getBaseLayer("地形", this.baseLayers[2]);
            vecAnno = this.getBaseLayer("标注", this.baseLayers[3]);
        };

        this.constructor = this.initBaseLayers();
    };



    module.exports = MaoBase_2;
});