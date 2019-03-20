<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="webapp_view_Test_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>测试</title>
    <!--#include file="../common/config.html"-->
</head>

<body>
    <div>
        <object id="cellWeb" height="100%" width="100%"
            classid="clsid:3F166327-8030-4881-8BD2-EA25350E574A"
            codebase="cellweb5.cab">
            <param name="_Version" value="53916">
            <param name="_ExtentX" value="18124">
            <param name="_ExtentY" value="5265">
            <param name="_StockProps" value="0">
        </object>
    </div>

</body>

<script type="text/javascript">
    function LoginRegister()//注册CELL
    {
        document.all['cellWeb'].Login("运输生产信息平台", "", "13040352", "1460-1706-0167-6005");
    }

    var RegisterCell = new LoginRegister();
    PrintTitle();
</script>
</html>
