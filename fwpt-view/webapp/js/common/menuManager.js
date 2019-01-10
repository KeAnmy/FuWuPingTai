
/*菜单管理*/

Smge.MenuManage = {

    menuDatas: [{ "id": "memuId_home", "path": "home/HomePage.aspx", "name": "门户首页" }, { "id": "memuId_geodata", "path": "geologicalDatabase/thematicMap.aspx", "name": "地质数据" }, { "id": "memuId_3DGeo", "path": "Geo3D/index.aspx", "name": "三维地质" }, { "id": "memuId_maplibrary", "path": "mapLibrary/index.aspx", "name": "地质图库" }, { "id": "memuId_datumLibrary", "path": "datumLibrary/index.aspx", "name": "资料库" }, { "id": "memuId_download", "path": "downloadCenter/index.aspx", "name": "下载中心" }, { "id": "memuId_guide", "path": "serviceGuide/index.aspx", "name": "服务指南" }],

    getParamByUrl: function (param) {
        var local = document.location.search.substring(1);
        var splits = local.split("&");
        for (var i = 0; i < splits.length; i++) {
            var sp = splits[i];
            if (sp.indexOf(param + "=") == 0) {
                var val = sp.substring(param.length + 1);
                return decodeURIComponent(val);
            }
        }
    },

    createHeaderMenu: function () {
        var menuid = this.getParamByUrl('pageId');
        var html = '<ul>';
        var url = "";
        var identity = "";
        var name="";
        for (var i = 0; i < this.menuDatas.length;i++)
        {
            url = Smge.Config.root + this.menuDatas[i].path;
            identity = this.menuDatas[i].id;
            name = this.menuDatas[i].name;
            if (menuid == identity)
            {
                html += '<li class="current"><a href="' + url + '?pageId=' + identity + '" id="' + identity + '">' + name + '</a></li>';
            }
            else
            {
                html += '<li><a href="' + url + '?pageId=' + identity + '" id="' + identity + '">' + name + '</a></li>';
            }
           
        }
        html += '</ul>';
        $("#headerMap-nav").html(html);
    }
}