<%@ Page Language="C#" AutoEventWireup="true" CodeFile="thematicMap.aspx.cs" Inherits="App_Web_view_geologicalDatabase_thematicMap" %>

<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
    <title>地质数据</title>
    <!--#include file="../common/config.html"-->
    <link href="../../css/geologicalDatabase/thematic.css" rel="stylesheet" type="text/css" />
    <link href="../../lib/openlayer/ol.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../lib/openlayer/ol.js" charset="utf-8"></script>

</head>
<body>
    <!--#include file="../common/headerMap.html"-->
    <!-- content beigin -->
    <div id="container">
        <div id="map-main">
            <!-- 地图容器 -->
            <div id="map">
            </div>
            <!--左侧数据目录-->
            <div class="left-box">
                <div class="left-tool ">
                    <header class="clearfix title">

                        <span>数据目录</span>
                        <i class="index-icon icon-hide"></i>

                    </header>
                    <div class="left-down" id="thematic-list">
                        <nav class="classify-box">
                            <ul class="classify">
                                <li class="classify-list special active">
                                    <div class="specialNav active" title="专题"></div>
                                </li>
                                <li class="classify-list place ">
                                    <div class="placeNav" title="地名搜索"></div>
                                </li>
                                <!-- <li class="classify-list collection"><div class="collectionNav"></div></li> -->
                            </ul>
                        </nav>

                        <div class="classify-content" style="display: block;">
                            <div class="classify-tool clearfix">
                                <h3 class="classify-title">类目</h3>
                                <a href="javascript:void(0);" class="clear-all"><span></span>重置</a>
                            </div>
                            <div id="subjectTree" class="ps-container">
                                <ul class="classify-children">
                                </ul>
                            </div>
                        </div>

                        <div class="search-content searched" style="display: none;">
                            <div class="classify-tool clearfix">
                                <h3 class="classify-title">地名搜索</h3>
                                <a href="javascript:void(0);" class="clear-search"><span></span>清除搜索结果</a>
                            </div>
                            <div class="s-box">
                                <!--搜索框-->
                                <div class="s-input-box">
                                    <div class="s-input-out clearfix">
                                        <input id="place_search" type="text" class="search-input s-input" placeholder="请输入地名">
                                        <div class="s-btn s-btn-search"><span class="s-btn-icon"></span></div>
                                    </div>
                                    <div class="senior clearfix">
                                        <a href="javascript:void(0);" class="btn-color senior-btn ">高级</a>
                                    </div>
                                </div>
                                <!--高级-->
                                <div class="senior-s-box" style="display: none">
                                    <div class="senior-s clearfix">
                                        <div class="senior-s-input clearfix">
                                            <label for="on-here">在：</label>
                                            <div class="s-input-out clearfix">
                                                <input id="on-here" type="text" class="search-input s-input" readonly="readonly" placeholder="请选择">
                                                <div class="s-btn s-btn-down"><span class="s-btn-select"></span></div>
                                                <div class="place-box">
                                                    <ul id="city_list_box"></ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="senior-s-input clearfix">
                                            <label for="on-h">搜：</label>
                                            <div class="s-input-out clearfix">
                                                <input id="on-h" type="text" disabled="disabled" class="search-input s-input ss-input" placeholder="请输入地名">
                                                <div class="s-btn s-btn-search"><span class="s-btn-icon"></span></div>
                                            </div>
                                        </div>
                                        <a class="btn-color back-common" href="javascript:;">返回</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <div class="hide-btn">
                    <i class="index-icon icon-show"></i>
                    <i class="hide-tab">数据目录</i>
                </div>
            </div>

            <!--右侧工具条-->
            <div class="toolbar-box">
                <div id="city-tools" style="display: none;">
                    <ul class="user-toolbar">
                        <li id="city-change">
                            <a href="#">
                                <i class="region"></i>
                                <span id="city-name"></span>
                                <!-- <b></b> -->
                            </a>
                            <!-- 行政区定位弹框  -->
                            <div id="city-change-box" class="popup hide"></div>
                        </li>
                    </ul>
                </div>
                <div id="map-tools"></div>
            </div>
            <!--属性信息框-->
            <div class="indentify-box">
            </div>

            <!--右键菜单-->
            <div id="map-rightKey"></div>

            <!--地图位置控件-->
            <div id="mouse-position">
            </div>

        </div>

        <!--遮罩面板-->
        <div id="mask">
        </div>
        <div class="waiting">
            <img src="../../images/common/waiting5.gif" />
        </div>
    </div>

    <script type="text/javascript">
       
    </script>

    <!-- content end -->
    <script type="text/javascript">
        seajs.use("../../js/common/main");

    </script>

</body>
</html>
