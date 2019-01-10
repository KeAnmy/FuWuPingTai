<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="App_Web_view_mapLibrary_index" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>地质图库</title>
    <!--#include file="../common/config.html"--> 
    <link href="../../css/mapLibrary/index.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript"> 
        var ss = Smge.MenuManage.url;
    </script>
</head>
<body>
    <!--#include file="../common/headerMap.html"--> 
    <!-- content beigin -->
    <div id="container" class="wrapper" style="margin: 0 auto;">
        <div class="side">
            <div class="side-nav" id="searchTimeSpan">
                <div class="nav-item">
                    <h3><b></b><a href="#">全部</a>
                    </h3>
                </div>
                <div class="nav-item">
                    <h3><b></b><a href="#" class="active">基础地质图</a>
                    </h3>
                </div>
                <div class="nav-item">
                    <h3><b></b><a href="#">工程地质图</a>
                    </h3>
                </div>
                <div class="nav-item">
                    <h3><b></b><a href="#">水文地质图</a>
                    </h3>
                </div>

            </div>
        </div>
        <div class="content">
      
                <div class="sortbar">
                    <dl class="sort" id="orderTypes">
                        <dt>排序：</dt>
                        <dd class="curr down"><a id="suggest" href="javascript:;">默认</a><i></i></dd>
                        <dd class="up"><a id="applyTimes" href="javascript:;">服务名称</a><i></i></dd>
                        <dd class="reg"><a id="regTimes" href="javascript:;">发布时间</a><i></i></dd>
                        <dd class="reg"><a id="A1" href="javascript:;">浏览次数</a><i></i></dd>
                    </dl>
                    <div class="sort-style">
                        <input class="filter-input" type="text" id="txtKeyWord" autocomplete="off" placeholder="请输入关键词" value="">
                        <button class="filter-btn" id="btnSeach" type="button">搜索</button>
                    </div>
                </div>


                <div class="servicelist" id="resultList">
                    <ul>
                        <li>
                            <div class="img-item">
                                <img src="../../images/sltDefault.png" />
                            </div>
                            <div class="info-item">
                                <h3><a href="#" target="_blank" title="基础地质图">基础地质图测试</a></h3>
                                <p>基础地质图测试</p>
                                <div class="info">服务类型：<span>WMS</span>　　                    服务发布时间：<span>2015-10-21</span>　　                    服务提供者：<span>中国地质调查局</span></div>
                            </div>
                        </li>
                                                <li>
                            <div class="img-item">
                                <img src="../../images/sltDefault.png" />
                            </div>
                            <div class="info-item">
                                <h3><a href="#" target="_blank" title="基础地质图">基础地质图测试</a></h3>
                                <p>基础地质图测试</p>
                                <div class="info">服务类型：<span>WMS</span>　　                    服务发布时间：<span>2015-10-21</span>　　                    服务提供者：<span>中国地质调查局</span></div>
                            </div>
                        </li>
                                                <li>
                            <div class="img-item">
                                <img src="../../images/sltDefault.png" />
                            </div>
                            <div class="info-item">
                                <h3><a href="#" target="_blank" title="基础地质图">基础地质图测试</a></h3>
                                <p>基础地质图测试</p>
                                <div class="info">服务类型：<span>WMS</span>　　                    服务发布时间：<span>2015-10-21</span>　　                    服务提供者：<span>中国地质调查局</span></div>
                            </div>
                        </li>
                                                <li>
                            <div class="img-item">
                                <img src="../../images/sltDefault.png" />
                            </div>
                            <div class="info-item">
                                <h3><a href="#" target="_blank" title="基础地质图">基础地质图测试</a></h3>
                                <p>基础地质图测试</p>
                                <div class="info">服务类型：<span>WMS</span>　　                    服务发布时间：<span>2015-10-21</span>　　                    服务提供者：<span>中国地质调查局</span></div>
                            </div>
                        </li>

                      
           
                    </ul>
                </div>

                <div class="clear"></div>

                <div id="f_pager" class="pagination">
                </div>

                <div id="noResults" style="text-align: center; display: none;">
                    <span style="color: red;">未能找到满足条件的服务数据</span>
                </div>
          
        </div>
        <div class="clear"></div>
    </div>


    <!-- content end -->

 <!--#include file="../common/footer.html"-->
</body>
</html>
