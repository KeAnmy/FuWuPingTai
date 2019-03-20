/*地质数据主函数入口*/

define(function (require, exports, module) {
    var MapBase = require("./../map/mapbase");//地图基础类
    var MapCatalog = require("./../map/mapcatalog");//地图基础类
    Smge.MapBase.int();
    Smge.MapCatalog.int(MapBase);
})