using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using ZYSK.DZPT.Base;
using ZYSK.DZPT.Base.DbBase;
using ZYSK.DZPT.Base.DbBase.Oracle;
/// <summary>
/// RequestUtil：客户端请求通用类
/// 作用：处理客户端Request请求
/// </summary>
public class RequestUtil
{

    #region public const

    #endregion

    #region private 字段
    private static IDBHelper _db = null;

    #endregion

    #region static 属性
   
    /// <summary>
    /// Logs文件夹所在路径
    /// </summary>
    public static string LogsFolderPath
    {
        get
        {
            return @"C:/";
        }
    }

 /*
    /// <summary>
    /// config配置文件的路径
    /// </summary>
    public static string ConfigFolderPath
    {
        get
        {
            return HttpContext.Current.Server.MapPath("~/App_Resource/config/");
        }
    }
     
     */

    /// <summary>
    /// 全局数据库帮助类
    /// </summary>
    public static IDBHelper GlobalDBHelper
    {
        get
        {
            return _db;
        }
        set
        {
            _db = value;
        }
    }

    #endregion

}