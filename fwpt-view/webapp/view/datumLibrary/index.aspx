<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="App_Web_view_datumLibrary_index" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>资料库</title>
    <!--#include file="../common/config.html"-->
    <link href="../../css/datumLibrary/index.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../../js/portal/DatumLibrary.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            Smge.DatumLibrary.init();
        });
    </script>
</head>
<body>
    <!--#include file="../common/headerMap.html"-->
    <!-- content beigin -->
    <div id="container" class="wrapper">
        <div class="side">
            <div class="side-nav" id="Div1">
                <div class="nav-item">
                    <h3><b></b><a href="#" class="active">资料类别</a>
                    </h3>
                    <ul id="datumType">
                        <li><i class="base-all"></i><a href="javascript:;" data-code="-1" data-name="全部">全部</a></li>
                        <li><i class="base-all"></i><a href="javascript:;" data-code="-1" data-name="海洋地质调查">海洋地质调查</a></li>
                        <li><i class="base-vector"></i><a href="javascript:;" data-code="11" data-name="矿产勘查">矿产勘查</a></li>
                        <li><i class="base-image"></i><a href="javascript:;" data-code="12" data-name="水工环勘查">水工环勘查</a></li>
                        <li><i class="base-label"></i><a href="javascript:;" data-code="13" data-name="物化遥勘查">物化遥勘查</a></li>
                    </ul>
                </div>
                <div class="nav-item">
                    <h3><b></b><a href="#">行政区域</a>
                    </h3>
                    <ul id="regionName" class="hide">
                        <li><i class="base-all"></i><a href="javascript:;" data-code="-1" data-name="全市">全市</a></li>
                        <li><i class="base-vector"></i><a href="javascript:;" data-code="11" data-name="和平区">和平区</a></li>
                        <li><i class="base-image"></i><a href="javascript:;" data-code="12" data-name="皇姑区">皇姑区</a></li>
                        <li><i class="base-label"></i><a href="javascript:;" data-code="13" data-name="沈河区">沈河区</a></li>
                        <li><i class="base-vector"></i><a href="javascript:;" data-code="11" data-name="浑南区">浑南区</a></li>
                        <li><i class="base-image"></i><a href="javascript:;" data-code="12" data-name="大东">大东</a></li>
                        <li><i class="base-label"></i><a href="javascript:;" data-code="13" data-name="铁西区">铁西区</a></li>
                    </ul>
                </div>
                <div class="nav-item">
                    <h3><b></b><a href="#">比例尺</a>
                    </h3>
                    <ul id="Ul1" class="hide">
                        <li><i class="base-all"></i><a href="javascript:;" data-code="-1" data-name="全市">全部</a></li>
                        <li><i class="base-vector"></i><a href="javascript:;" data-code="11" data-name="1/100万">1/100万</a></li>
                        <li><i class="base-image"></i><a href="javascript:;" data-code="12" data-name="1/50万">1/50万</a></li>
                        <li><i class="base-label"></i><a href="javascript:;" data-code="13" data-name="1/25万">1/25万</a></li>
                        <li><i class="base-vector"></i><a href="javascript:;" data-code="11" data-name="1/20万">1/20万</a></li>
                        <li><i class="base-vector"></i><a href="javascript:;" data-code="11" data-name="1/10万">1/10万</a></li>
                        <li><i class="base-image"></i><a href="javascript:;" data-code="12" data-name="1/5万">1/5万</a></li>
                        <li><i class="base-label"></i><a href="javascript:;" data-code="13" data-name="铁西区">其他</a></li>
                    </ul>
                </div>

            </div>
        </div>

        <div class="content" style="background-color: #f1f1f1">
            <ul class="datumlist">
                <li>
                    <div class="el-card">
                        <div class="right_info">
                            <div class="right_info_item" style="font-size: 18px">
                                <span class="file-type-img pdf"></span><a href="#"><span class="material_head">沈阳市法库县水文地质调查报告</span></a>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colspan="2">资料类别：水工环勘探</td>
                                        <td>
                                            <font color="#ea4614">免费</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">文件大小：0.32M</td>
                                        <td colspan="2">行政区域：和平区</td>
                                    </tr>
                                    <tr>
                                        <td>发布人：沈勘SMGE</td>
                                        <td>发布时间：2018-10-31</td>
                                        <td>销量：2</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </li>
                <li>
                    <div class="el-card">
                        <div class="right_info">
                            <div class="right_info_item" style="font-size: 18px">
                                <span class="file-type-img pdf"></span><a href="#"><span class="material_head">沈阳市法库县水文地质调查报告</span></a>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colspan="2">资料类别：水工环勘探</td>
                                        <td>
                                            <font color="#ea4614">免费</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">文件大小：0.32M</td>
                                        <td colspan="2">行政区域：和平区</td>
                                    </tr>
                                    <tr>
                                        <td>发布人：沈勘SMGE</td>
                                        <td>发布时间：2018-10-31</td>
                                        <td>销量：2</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </li>
                <li>
                    <div class="el-card">
                        <div class="right_info">
                            <div class="right_info_item" style="font-size: 18px">
                                <span class="file-type-img pdf"></span><a href="#"><span class="material_head">沈阳市法库县水文地质调查报告</span></a>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colspan="2">资料类别：水工环勘探</td>
                                        <td>
                                            <font color="#ea4614">免费</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">文件大小：0.32M</td>
                                        <td colspan="2">行政区域：和平区</td>
                                    </tr>
                                    <tr>
                                        <td>发布人：沈勘SMGE</td>
                                        <td>发布时间：2018-10-31</td>
                                        <td>销量：2</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </li>
                <li>
                    <div class="el-card">
                        <div class="right_info">
                            <div class="right_info_item" style="font-size: 18px">
                                <span class="file-type-img pdf"></span><a href="#"><span class="material_head">沈阳市法库县水文地质调查报告</span></a>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colspan="2">资料类别：水工环勘探</td>
                                        <td>
                                            <font color="#ea4614">免费</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">文件大小：0.32M</td>
                                        <td colspan="2">行政区域：和平区</td>
                                    </tr>
                                    <tr>
                                        <td>发布人：沈勘SMGE</td>
                                        <td>发布时间：2018-10-31</td>
                                        <td>销量：2</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </li>
                <li>
                    <div class="el-card">
                        <div class="right_info">
                            <div class="right_info_item" style="font-size: 18px">
                                <span class="file-type-img pdf"></span><a href="#"><span class="material_head">沈阳市法库县水文地质调查报告</span></a>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colspan="2">资料类别：水工环勘探</td>
                                        <td>
                                            <font color="#ea4614">免费</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">文件大小：0.32M</td>
                                        <td colspan="2">行政区域：和平区</td>
                                    </tr>
                                    <tr>
                                        <td>发布人：沈勘SMGE</td>
                                        <td>发布时间：2018-10-31</td>
                                        <td>销量：2</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </li>
                <li>
                    <div class="el-card">
                        <div class="right_info">
                            <div class="right_info_item" style="font-size: 18px">
                                <span class="file-type-img pdf"></span><a href="#"><span class="material_head">沈阳市法库县水文地质调查报告</span></a>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colspan="2">资料类别：水工环勘探</td>
                                        <td>
                                            <font color="#ea4614">免费</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">文件大小：0.32M</td>
                                        <td colspan="2">行政区域：和平区</td>
                                    </tr>
                                    <tr>
                                        <td>发布人：沈勘SMGE</td>
                                        <td>发布时间：2018-10-31</td>
                                        <td>销量：2</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                </li>

            </ul>
        </div>

        <div class="clear"></div>
    </div>


    <!-- content end -->

    <!--#include file="../common/footer.html"-->
</body>
</html>
