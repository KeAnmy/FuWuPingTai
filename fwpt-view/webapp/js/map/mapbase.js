/*地图基础类*/

define(function (require, exports, module) {

    var MapBase = {
        map: null,  //地图对象        
        baseLayers: ["vec_w", "img_w", "ter_w", "cva_w"],  //天地图图层
        vecLayer: null,  //矢量地图图层
        imgLayer: null,  //影像图层
        terLayer: null,   //地形图层
        vecAnno: null,  //矢量注记图层
        zkLayer: null,    //地质钻孔图层
        //封装底图函数
        getBaseLayer: function (layername, layer, index) {
            return new ol.layer.Tile({
                zIndex: index,
                title: layername,
                source: new ol.source.XYZ({
                    url: "http://t4.tianditu.com/DataServer?T=" + layer + "&x={x}&y={y}&l={z}"
                })
            });
        },
        //地图基础类初始化
        init: function () {
            this.initBaseLayers();
            this.initDZZKLayer();
            this.initMap('map');
        },
        //初始化底图
        initMap: function (id) {
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
                layers: [this.vecLayer, this.vecAnno, this.zkLayer],
                target: id

            });
            return this.map;
        },
        //初始化基础图层
        initBaseLayers: function () {

            this.vecLayer = this.getBaseLayer("地图", this.baseLayers[0], 0);
            this.imgLayer = this.getBaseLayer("影像", this.baseLayers[1], 1);
            this.terLayer = this.getBaseLayer("地形", this.baseLayers[2], 2);
            this.vecAnno = this.getBaseLayer("标注", this.baseLayers[3], 3);
        },
        //初始化地址钻孔图层
        initDZZKLayer: function () {
            var that = this;
            var source = new ol.source.Vector({
                wrapX: false
            });
            that.zkLayer = new ol.layer.Vector({
                zIndex: 4,
                title: '地址钻孔',
                source: source,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({               //填充样式
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({           //线样式
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({            //点样式
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ff0000'
                        })
                    }),

                }),
                opacity: 0.5
            });
        }
    };
    module.exports = MapBase;
});