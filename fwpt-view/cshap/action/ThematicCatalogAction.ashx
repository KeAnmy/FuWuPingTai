<%@ WebHandler Language="C#" Class="ThematicCatalogAction" %>

using System;
using System.Web;
using System.Collections.Generic;

public class ThematicCatalogAction : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string responseString = "";

        string queryType = context.Request.Form["queryType"].ToString();
        switch (queryType)
        {
            case "zkdata":
                responseString = this.GetZKPointsData();
                break; 
            case "gcdata":
                responseString = this.GetGcqyData();
                break;
            default:
                responseString = "[]";
                break;
        }
        context.Response.Write(responseString);
    }


    #region 私有方法

    //获取钻孔点数据
    private string GetZKPointsData()
    {
        GeoZkPointsDataRepository gepzkdatasRepository = new GeoZkPointsDataRepository();
        List<MultilevelZKData> lstZKPoints = gepzkdatasRepository.GetAll();
        string datas = MappingUtil.Convert2JSON<MultilevelZKData>(lstZKPoints);
        return datas;
    }

    //获取工程区域数据
    private string GetGcqyData()
    {
        GeoGcqyDataRepository gcqyRy = new GeoGcqyDataRepository();
        List<GeoGcqyData> lstgc = gcqyRy.GetAllRecords();
        string data = MappingUtil.Convert2JSON<GeoGcqyData>(lstgc);
        return data;
    }
    
    #endregion

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}