<%@ WebHandler Language="C#" Class="Export2Access" %>

using System;
using System.Web;
using System.IO;

public class Export2Access : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        string responseString = "";
        string zkNos = context.Request.Form["data"].ToString();
        string[] zknoArr = zkNos.Split(',');
        //要导出Access数据库的模板
        string strTemplPath = HttpContext.Current.Server.MapPath(@"~/resources/templete.mdb");
        //要导出的Access数据库文件
        string strExportPath = HttpContext.Current.Server.MapPath(@"~/resources/ExportedProject.mdb");
        string strExportPath2 = HttpContext.Current.Server.MapPath(@"~/resources/ExportedProject2.mdb");
        File.Copy(strTemplPath, strExportPath, true);        
        bool result = ExportAccessUtil.Insert2Access(zknoArr, strExportPath);
        if (result)
        {
            File.Copy(strExportPath, strExportPath2, true);
            responseString = context.Request.Url.Authority + @"/resources/ExportedProject2.mdb";
        }
        else
        {
            responseString = ExportAccessUtil.ErrorMessage;
           
        }
        context.Response.Write(responseString);
    }

    public void OutFile(string filename)
    {


    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}