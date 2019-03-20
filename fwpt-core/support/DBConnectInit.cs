using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using ZYSK.DZPT.Base.DbBase;
using ZYSK.DZPT.Base.DbBase.Oracle;
using ZYSK.DZPT.Base.Utility;

/// <summary>
/// DataBaseInit：数据库连接初始化
/// 作用：读取数据库连接的配置文件，并初始化全局DBHelper类
/// 日期：2018-12-27
/// </summary>
public class DBConnectInit
{
    #region private static 字段
    private static IDBHelper _db = null;
    #endregion

    #region public static 方法

    /// <summary>
    /// 作用：初始化全局数据库帮助类
    /// 日期：2018-12-27
    /// </summary>
    public static void InitGlobalDBHelper(string dncfgPath)
    {
        try
        {
            if (RequestUtil.GlobalDBHelper == null)
            {
                Dictionary<string, string> dicDBConfig = XmlHelper.ReaderXML(dncfgPath);//RequestUtil.ConfigFolderPath + @"dbOracle.xml"
                LogManager.WriteToDebug("读取数据库配置文件成功！", RequestUtil.LogsFolderPath);
                _db = new OracleDBHelper();
                _db.DBServer = dicDBConfig.Where(q => q.Key.Equals("server")).First().Value;
                _db.DBPort = dicDBConfig.Where(q => q.Key.Equals("port")).First().Value;
                _db.DBServiceName = dicDBConfig.Where(q => q.Key.Equals("servicename")).First().Value;
                _db.DBName = dicDBConfig.Where(q => q.Key.Equals("name")).First().Value;
                _db.DBUser = dicDBConfig.Where(q => q.Key.Equals("user")).First().Value;
                _db.DBPwd = dicDBConfig.Where(q => q.Key.Equals("pwd")).First().Value;
            }
            else
            {
                _db = RequestUtil.GlobalDBHelper;
            }

            if (_db.TryConnect())
            {
                LogManager.WriteToDebug("数据库连接成功", RequestUtil.LogsFolderPath);
            }
            else
            {
                LogManager.WriteToDebug("数据库连接失败", RequestUtil.LogsFolderPath);
            }
            DataTable dt = _db.DoQueryEx("select SDE.ST_ASTEXT(t.shape) from SDEGCPOLYGONS t");
            string strTest = dt.Rows[0][0].ToString();
            LogManager.WriteToDebug("数据库读取空间数据测试成功", RequestUtil.LogsFolderPath);
            RequestUtil.GlobalDBHelper = _db;
        }
        catch (Exception ex)
        {
            LogManager.WriteToError(ex.Message);
            LogManager.WriteToError("数据库连接失败！", RequestUtil.LogsFolderPath);
        }

    }



    #endregion


}