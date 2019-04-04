<%@ Page Language="C#" AutoEventWireup="true" CodeFile="GeoMap3D.aspx.cs" Inherits="webapp_view_map3d_GeoMap3D" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>倾斜模型预览</title>
    <!--#include file="../common/config.html"-->
    <script type="text/javascript" src="../../lib/cesium/Cesium.js"></script>
    <style>
        @import url(../../lib/cesium/Widgets/widgets.css);
        @import url(../../lib/cesium/Widgets/lighter.css);
        @import url(../../lib/cesium/templates/bucket.css);

        html, body, #cesiumContainer {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        #toolbar {
            position: absolute;
            left: 10px;
            top: 10px;
            background: rgba(42, 42, 42, 0.8);
            padding: 4px;
            border-radius: 4px;
        }

        .cesium-toolbar-button-width {
            width: 64px;
        }
    </style>
    <script type="text/javascript">
        $(function () {
            $("#tool-orign").click(function () {
                viewer.zoomTo(tileNeu);
                //viewer.camera.flyTo({
                //    destination: Cesium.Cartesian3.fromDegrees(123.405679, 41.762246, 200),
                //    orientation: {
                //        heading: Cesium.Math.toRadians(0.0),
                //        pitch: Cesium.Math.toRadians(-30.0), //俯仰角
                //        roll: 0.0,
                //        yaw: Cesium.Math.toRadians(30.0),
                //    }
                //});
            });
            $("#tool_hideshow").click(function () {
                if (tileNeu.show) {
                    tileNeu.show = false;
                    tileYY.show = false;
                    $(this).text("显示模型");
                }
                else {
                    tileNeu.show = true;
                    tileYY.show = true;
                    $(this).text("隐藏模型");
                }

            });
            $("#tool_changeSelectedModel").change(function () {
                if ($(this).val() == "tileNeu")
                {
                    viewer.zoomTo(tileNeu);
                }
                if ($(this).val() == "tileYY") {
                    viewer.zoomTo(tileYY);
                }
            });
        });

    


    </script>

</head>
<body>
    <div id="cesiumContainer"></div>
    <div id="toolbar">
        <button id="tool-orign" class="cesium-button cesium-toolbar-button cesium-toolbar-button-width">中心点</button>
        <button id="tool_hideshow" class="cesium-button cesium-toolbar-button cesium-toolbar-button-width">隐藏模型</button>
        <select id="tool_changeSelectedModel" class="cesium-button">
            <option value="tileNeu">东北大学</option>
            <option value="tileYY">榆阴小区</option>
        </select>
    </div>

    <script>
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMWVlYTVlYi02YjMzLTQxN2QtYjBkYy1iM2JiZmYyNWIwNGQiLCJpZCI6ODQ3Niwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjAxOTU2M30.qZ7ZEC-Sk9nuyrBV0wdRsDgHFhe_gW2ZIgv9m50LsU0';

        var position = Cesium.Cartesian3.fromDegrees(123.6841836, 41.215885);

        //谷歌地图影像服务
        var googleImagerLayerProvider = new Cesium.UrlTemplateImageryProvider({
            url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
        })

        //天地图影像服务
        var tdtImagerLayerProvider = new Cesium.WebMapTileServiceImageryProvider({
            url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=f70d5997f2d1d164df19b61182afd1eb",
            layer: "tiandituImg",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "tiandituImg",
            show: true,
            maximumLevel: 18
        });

        //天地图注记服务
        var tdtNoteLayerProvider = new Cesium.WebMapTileServiceImageryProvider({
            url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=f70d5997f2d1d164df19b61182afd1eb",
            layer: "tiandituImgMarker",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "tiandituImgMarker",
            show: true,
            maximumLevel: 18
        });

        var viewer = new Cesium.Viewer('cesiumContainer', {
            contextOptions: {
                webgl: {
                    alpha: true
                }
            },
            baseLayerPicker: false,//地图选择器
            animation: false,//动画控制器
            timeline: false,//时间轴
            fullscreenButton: true,//全屏按钮
            geocoder: true,//地名查找
            //infoBox:true,
            sceneModePicker: false,//投影方式
            navigationHelpButton: false, //导航帮助按钮
            imageryProvider: googleImagerLayerProvider,

        });
        var imageryLayers = viewer.imageryLayers;
        var tdtNoteLayer = imageryLayers.addImageryProvider(tdtNoteLayerProvider);//添加注记图层
        imageryLayers.raiseToTop(tdtNoteLayer);//将注记图层置顶
        imageryLayers.alpha = 0.3;//改变透明度
        imageryLayers.brightness = 3;//改变亮度


        viewer._cesiumWidget._creditContainer.style.display = "none" // 去除左下角的logo

        var terrainProvider = new Cesium.CesiumTerrainProvider({
            url: "./../../datas/cesiumDatas/terrain_default",
        });
        viewer.terrainProvider = terrainProvider;

        var tileNeu = new Cesium.Cesium3DTileset({
            url: "./../../datas/cesiumDatas/neu2/tileset.json"
        });
        viewer.scene.primitives.add(tileNeu);

        var tileYY = new Cesium.Cesium3DTileset({
            url: "./../../datas/cesiumDatas/yuyin/tileset.json"
        });
        viewer.scene.primitives.add(tileYY);

        viewer.zoomTo(tileYY);



    </script>
</body>
</html>

