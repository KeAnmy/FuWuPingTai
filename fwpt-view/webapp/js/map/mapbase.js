/*地图基础类*/

define(function (require, exports, module) {

    Smge.MapBase = {
        map: null,  //地图对象        
        baseLayers: ["vec_w", "img_w", "ter_w", "cva_w"],  //天地图图层
        vecLayer: null,  //矢量地图图层
        imgLayer: null,  //影像图层
        terLayer: null,   //地形图层
        vecAnno: null,  //矢量注记图层
        zkLayer: null,    //地质钻孔图层
        gcLayer: null,    //工程区域图层
        //封装底图函数
        getBaseLayer: function (layername, type, index) {
            return new ol.layer.Tile({
                zIndex: index,
                title: layername,
                source: new ol.source.XYZ({
                    url: "http://t{0-7}.tianditu.com/DataServer?T=" + type + "&x={x}&y={y}&l={z}"
                })
            });
        },
        getBaseLayer_key: function (layername, type, index) {
            var layer = type.substr(0, 3);
            return new ol.layer.Tile({
                zIndex: index,
                title: layername,
                source: new ol.source.XYZ({
                    url: "https://t{0-7}.tianditu.gov.cn/" + type + "/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + layer + "&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=f70d5997f2d1d164df19b61182afd1eb"
                })
            });
        },

        //地图基础类初始化
        int: function () {
            this.initBaseLayers();
            this.initDZZKLayer();
            this.initMap('map');


        },

        //初始化底图
        initMap: function (id) {
            var that = this;
            var element = document.getElementsByClassName("indentify-box")[0];
            var overlay = new ol.Overlay({
                id: "indetifyOverlay",
                element: element,
                //autoPan: true,
                autoPanAnimation: {
                    duration: 250   //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）
                }
            });
            var mousePositionControl = new ol.control.MousePosition({
                coordinateFormat: ol.coordinate.createStringXY(6), //坐标格式 
                projection: 'EPSG:4326', //地图投影坐标系 
                className: 'custom-mouse-position', //坐标信息显示样式 
                target: document.getElementById('mouse-position'),// 显示鼠标位置信息的目标容器 
                undefinedHTML: ' ' //未定义坐标的标记
            });
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
                target: id,
                controls: ol.control.defaults().extend([mousePositionControl]),
                overlays: [overlay]

            });
            return this.map;
        },

        //初始化基础图层
        initBaseLayers: function () {

            //this.vecLayer = this.getBaseLayer("地图", this.baseLayers[0], 0);
            //this.imgLayer = this.getBaseLayer("影像", this.baseLayers[1], 1);
            //this.terLayer = this.getBaseLayer("地形", this.baseLayers[2], 2);
            //this.vecAnno = this.getBaseLayer("标注", this.baseLayers[3], 3);

            //this.vecLayer = this.getVecLayer("地图", "", 0);
            //this.imgLayer = this.getImgLayer("影像", "", 1);
            //this.terLayer = this.getTerLayer("地形","", 2);
            //this.vecAnno = this.getCvaLayer("标注", "", 3);

            this.vecLayer = this.getBaseLayer_key("地图", this.baseLayers[0], 0);
            this.imgLayer = this.getBaseLayer_key("影像", this.baseLayers[1], 1);
            this.terLayer = this.getBaseLayer_key("地形", this.baseLayers[2], 2);
            this.vecAnno = this.getBaseLayer_key("标注", this.baseLayers[3], 3);


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
                    fill: new ol.style.Fill({               //多边形填充样式
                        color: 'rgba(255, 255, 255, 1)'
                    }),
                    stroke: new ol.style.Stroke({           //线样式
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({            //点样式
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 0, 0, 0.7)'
                        }),
                    }),

                })
            });
        }
    };
    module.exports = Smge.MapBase;
});