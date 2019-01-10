<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="App_Web_view_home_HomePage" %>

<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>首页</title>
    <link href="../../css/home/index.css" rel="stylesheet" type="text/css" />

</head>
<body>
    <!--header begin -->
    <div class="version-header">
        <div class="header-wrap fb-header-wrap">
            <a class="fb-logo" href="${pageContext.request.contextPath}/main.do"></a>
            <div class="fb-user-bar">
                <div class="input-box fb-input-box">
                    <input type="text" placeholder="搜索" id="fts_keyword">
                    <div class="btn-box">
                        <button id="q_fts_keyword"></button>
                    </div>
                </div>
                <div class="fb-login-box">
                    <a class="name-pass" href="javascript:void(0);" onclick="Geoway.LoginReg.showLoginWin()">登录</a>
                    <em></em>
                    <a class="name-pass" href="${pageContext.request.contextPath}/view/login/userReg.jsp">注册</a>
                </div>
            </div>
            <div class="fb-nav">
                <ul>
                    <li ><a class="act" href="/webapp/view/home/HomePage.aspx?pageId=memuId_home">门户首页</a></li>
                    <li><a href="/webapp/view/geologicalDatabase/thematicMap.aspx?pageId=memuId_geodata" >地质数据</a></li>
                    <li><a href="/webapp/view/Geo3D/index.aspx?pageId=memuId_3DGeo" >三维地质</a></li>
                    <li><a href="/webapp/view/mapLibrary/index.aspx?pageId=memuId_maplibrary" >地质图库</a></li>
                    <li><a href="/webapp/view/datumLibrary/index.aspx?pageId=memuId_datumLibrary" >资料库</a></li>
                    <li><a href="/webapp/view/downloadCenter/index.aspx?pageId=memuId_download">下载中心</a></li>
                    <li><a href="/webapp/view/serviceGuide/index.aspx?pageId=memuId_guide" >服务指南</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!--header end -->
    <!-- content beigin -->
    <div class="fb-cont">
        <div class="jq22-container">
            <div class="flexslider">
                <ul class="slides">
                    <li style="background: url(../../images/home/img2.jpg) 50% 0 repeat;"></li>
                    <li style="background: url(../../images/home/fb-xg-pic.png) 50% 0 no-repeat;"></li>
                </ul>
            </div>
        </div>

        <div class="fb-pic-box">
            <div class="center-box">
                <a id="mpdb" href="#" class="single-box">
                    <span>
                        <!--无 <i class="electronics"></i> -->
                        <img src="../../images/home/2.png" width="90%" alt="">
                    </span>
                    <em>数据处理与管理</em>
                </a>
                <a href="#" class="single-box">
                    <span>
                        <img src="../../images/home/3.png" width="90%" alt="">
                    </span>
                    <em>共享分发服务</em>
                </a>
                <a href="#" class="single-box">
                    <span>
                        <!-- <i class="show"></i> -->
                        <img src="../../images/home/4.png" width="90%" alt="">
                    </span>
                    <em>集成定制服务</em>
                </a>
                <a href="#" class="single-box" onclick="window.open('localhost:8068/subject-view/')">
                    <span>
                        <!-- <i class="resources"></i> -->
                        <img src="../../images/home/5.png" width="90%" alt="">
                    </span>
                    <em>专题应用服务</em>
                </a>
                <a href="#" class="single-box">
                    <span>
                        <!-- <i class="on-line"></i> -->
                        <img src="../../images/home/11.png" width="90%" alt="">
                    </span>
                    <em>数据同步更新</em>
                </a>
            </div>
        </div>
        <!-- 热门服务 -->
        <div class="server-hot-box">
            <div class="out-in-box">
                <div class="server-hot-title">
                    <i></i>
                    热门服务
				<button></button>
                </div>
                <div class="server-hot-cont">
                    <a class="point" href="#">
                        <span class="cont-pic cont-pic-gq1"></span>
                        <span class="cont-text">北京市2016年土地利用现状</span>
                    </a>
                    <a class="point" href="#">
                        <span class="cont-pic cont-pic-gq2"></span>
                        <span class="cont-text">北京2016年土地利用规划</span>
                    </a>
                    <a class="point" href="#">
                        <span class="cont-pic cont-pic-gq3"></span>
                        <span class="cont-text">全国主体功能区规划</span>
                    </a>
                    <a class="point point-last" href="#">
                        <span class="cont-pic cont-pic-gq4"></span>
                        <span class="cont-text">全国2016年高分影像数据服务</span>
                    </a>
                </div>
                <div class="clear-out"></div>
            </div>
        </div>
        <!-- 共享数据 -->
        <div class="server-hot-box">
            <div class="out-in-box">
                <div class="server-hot-title">
                    <i class="data"></i>
                    共享数据
                </div>
                <div class="switch-box">
                    <div class="left-switch">
                        <span class="active">空间现状数据集</span>
                        <span>空间规划数据集</span>
                        <span>社会经济数据集</span>
                        <span>空间管理数据集</span>
                        <span>产品数据集</span>
                        <span class="last">更多 &gt;&gt;&gt;</span>
                    </div>
                    <div class="right-switch accr">
                        <div>
                            空间现状数据集：
					十二五以来，通过国土资源大调查、第二次全国土地调查、矿产资源“三查”、第一次地理国情普查、天地图和数字国土工程、金土工程等工作积累了大量的数据和应用
					服务系统，基本建成全国国土资源“一张图”核心数据库和行政审批、综合监管、公共服务平台，为履行国土资源管理职责、提升国土资源管理服务水平提供了有力的支
					撑和保障。国土空间相关的数据，形成覆盖全国范围、涵盖地上地下、能够及时更新的以基础地理信息、高分辨率遥感影像、土地利用现状、矿产资源现状、地理国情普
					查、基础地质、地质灾害与地质环境等现时状况为主的空间现状数据集。
					<span class="careful-btn-box">
                        <button>更多详情</button>
                    </span>
                        </div>
                        <div class="switch-pic1"></div>
                    </div>
                    <div class="right-switch">
                        <div>
                            空间规划数据集：
					为实现优化空间布局、有效配置土地资源、提高政府空间管控水平和治理能力的目标，我国形成了主要以基本农田保护红线、生态保护红线、城市扩展边界、国土规划、土地
					利用总体规划、矿产资源规划、地质灾害防治规划等基础性管控性规划为主的空间规划数据集。
					<span class="careful-btn-box">
                        <button>更多详情</button>
                    </span>
                        </div>
                        <div class="switch-pic2"></div>
                    </div>
                    <div class="right-switch">
                        <div>
                            社会经济数据集：
					社会经济数据为动态获取数据，包含人口、宏观经济等，通过结合时事、舆情等信息进行综合分析与决策。
					<span class="careful-btn-box">
                        <button>更多详情</button>
                    </span>
                        </div>
                        <div class="switch-pic3"></div>
                    </div>
                    <div class="right-switch">
                        <div>
                            空间管理数据集：
					主要包括不动产登记、土地审批、土地供应、矿业权审批等空间开发管理和利用信息等国土空间管理信息。
					<span class="careful-btn-box">
                        <button>更多详情</button>
                    </span>
                        </div>
                        <div class="switch-pic4"></div>
                    </div>
                    <div class="right-switch">
                        <div>
                            产品数据集：
					通过各类数据的整合定制形成国土资源承载力评价、矿产资源分布等产品数据集。
					<span class="careful-btn-box">
                        <button>更多详情</button>
                    </span>
                        </div>
                        <div class="switch-pic5"></div>
                    </div>
                    <div class="right-switch">
                        <div>
                            <span class="careful-btn-box">
                                <button>更多详情</button>
                            </span>
                        </div>
                        <div class="switch-pic6"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 案例 -->
        <div class="server-hot-box" style="border-bottom: none;">
            <div class="out-in-box">
                <div class="server-hot-title">
                    <i class="case"></i>
                    应用案例
				<button onclick="window.location.href='${pageContext.request.contextPath}/cases/index.do?pageId=applicationPage'"></button>
                </div>
                <div class="case-pic-box">
                    <div class="case-single-pic">
                        <a href="#" class="case-single-first">
                            <span class="case-pic">浙江省空间地理大数据应用示范工程建设</span>
                        </a>
                        <div class="black-mask">
                        </div>
                        <div class="mask-text" id="zjdsj">
                            <p>浙江省空间地理大数据应用示范工程建设</p>
                            <button>更多详情</button>
                        </div>
                    </div>
                    <div class="case-single-pic">
                        <a href="#" class="case-single-second">
                            <span class="case-pic">云南省土地与矿业权网上交易监测监管系统</span>
                        </a>
                        <div class="black-mask">
                        </div>
                        <div class="mask-text">
                            <p>云南省土地与矿业权网上交易监测监管系统</p>
                            <button>更多详情</button>
                        </div>
                    </div>
                    <div class="case-single-pic last-single">
                        <a href="#" class="case-single-third">
                            <span class="case-pic">济源市土地交易信息查询系统</span>
                        </a>
                        <div class="black-mask">
                        </div>
                        <div class="mask-text">
                            <p>济源市土地交易信息查询系统</p>
                            <button>更多详情</button>
                        </div>
                    </div>
                </div>
                <div class="clear-out"></div>
            </div>
        </div>
        <!-- 专题图层 -->
        <div class="server-hot-box">
            <div class="out-in-box">
                <div class="server-hot-title">
                    <i class="pic-gether"></i>
                    专题图集
                </div>
                <div class="right-switch accr">
                    <div class="book-pic">
                        <span></span>
                    </div>
                    <div class="book-text">
                        <a href="#">集合各类出版地图</a>
                        <a href="#">在线超高清预览</a>
                        <a href="#">方便公共出行</a>
                        <a href="#">展示历史变迁轨迹</a>
                        <button>了解更多</button>
                    </div>
                </div>
                <div class="clear-out"></div>
            </div>
        </div>
    </div>
    <!-- content end -->
    <!-- foot begin-->
    <div class="foot-box fb-foot-box">
        <div class="about-us">
            <a href="${pageContext.request.contextPath}/help/aboutus.do?pageId=helpPage">意见反馈</a>
            <a href="${pageContext.request.contextPath}/help/feedback.do?pageId=helpPage&menuId=df548bcf-863c-4111-bcbc-4333b4d03bdb">关于我们</a>
        </div>
        <div class="us-compran">
            <a href="#">CopyRight&copy; 中冶沈勘工程技术有限公司（辽ICP备********号）</a>
        </div>
    </div>
    <!-- foot end-->
    <script>

    </script>

    <script type="text/javascript">
        //$(document).ready(function () {
        //    $('.flexslider').flexslider({
        //        directionNav: true,
        //        pauseOnAction: false,
        //        slideshowSpeed: 6000
        //    });
        //});

    </script>

</body>
</html>
