using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using ZYSK.DZPT.Base.DbBase;
using ZYSK.DZPT.Base.Utility;

/// <summary>
/// GeoZkPointsDataRepository 的摘要说明
/// </summary>
public class GeoZkPointsDataRepository
{
    #region 私有变量

    private IDBHelper _db = null;

    #endregion

    #region 初始化
    public GeoZkPointsDataRepository()
    {
        _db = RequestUtil.GlobalDBHelper;
    }

    #endregion

    #region 公有方法

    public List<GeoZkPointsData> GetAllRecords()
    {
        DataTable dtzk = this.GetAllRecordsToDT();
        List<GeoZkPointsData> lstzk = new List<GeoZkPointsData>();
        lstzk = MappingUtil.GetEntityFromDataTable<GeoZkPointsData>(dtzk);
        return lstzk;
    }

    public List<GeoZkPointsData> GetZKDataTest()
    {
        DataTable dtzk = this.GetZKDataTableTest();
        List<GeoZkPointsData> lstzk = new List<GeoZkPointsData>();
        lstzk = MappingUtil.GetEntityFromDataTable<GeoZkPointsData>(dtzk);
        return lstzk;
    }

    /// <summary>
    /// 获取多级钻孔数据，
    /// </summary>
    /// <returns></returns>
    public List<MultilevelZKData> GetAll()
    {
        List<MultilevelZKData> lstmultilev = new List<MultilevelZKData>();
        Dictionary<string, string> dic = new Dictionary<string, string>();
        DataTable dtzk = this.GetAllRecordsToDT();
        if (dtzk == null)
        {
            return lstmultilev;
        }
        List<GeoZkPointsData> lstzk = new List<GeoZkPointsData>();
        lstzk = MappingUtil.GetEntityFromDataTable<GeoZkPointsData>(dtzk);
        var query = from t in dtzk.AsEnumerable()
                    group t by new { prjno = t.Field<string>(GeoZkPointsData.FIELD_F_PROJECTNO), prjname = t.Field<string>(GeoZkPointsData.FIELD_F_PROJECTNAME) } into m
                    select new
                    {
                        prjno = m.Key.prjno,
                        prjname = m.Key.prjname
                    };

        if (query.ToList().Count > 0)
        {
            query.ToList().ForEach(q => dic.Add(q.prjno, q.prjname));
        }

        foreach (var item in dic)
        {
            IEnumerable<GeoZkPointsData> lst = lstzk.Where((zkpoint) => { return zkpoint.ProjectNo.Equals(item.Key); });
            lstmultilev.Add(new MultilevelZKData(item.Key, item.Value, lst.ToList()));
        }
        return lstmultilev;
    }

    /// <summary>
    /// 通过ID数组检索数据记录
    /// </summary>
    /// <param name="arrID">ID数组集合</param>
    /// <returns></returns>
    public DataRow[] GetDataWhereInArrId(string[] arrID)
    {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < arrID.Length; i++)  //arrzknos.Length
        {
            sb.Append("'" + arrID[i] + "',");
        };

        sb = sb.Remove(sb.Length - 1, 1);
        string strzknos = sb.ToString();
        string sql = "select * from " + GeoZkPointsData.TABLE_NAME;
        DataTable dtAllzkdatas = _db.DoQueryEx(sql);
        DataRow[] drs = dtAllzkdatas.Select(GeoZkPointsData.FIELD_F_ID + " in (" + strzknos + ")");
        return drs;
    }

    #endregion


    #region 私有方法
    private DataTable GetAllRecordsToDT()
    {

        string sql = "select * from " + GeoZkPointsData.TABLE_NAME + " order by " + GeoZkPointsData.FIELD_F_PROJECTNO + " , " + GeoZkPointsData.FIELD_F_ZKBH;
        try
        {
            DataTable dt = _db.DoQueryEx(sql);
            LogManager.WriteToDebug("钻孔数据DataTable获取成功", RequestUtil.LogsFolderPath);
            return dt;
        }
        catch (Exception ex)
        {
            LogManager.WriteToError(ex.Message, RequestUtil.LogsFolderPath);
            LogManager.WriteToError("钻孔数据DataTable获取失败", RequestUtil.LogsFolderPath);
            return null;
        }

    }

    private DataTable GetZKDataTableTest()
    {

        string sql = "select  * from V_GEO_ZKPOINTS_DATA t where rownum<=3";

        DataTable dt = _db.DoQueryEx(sql);
        LogManager.WriteToDebug("钻孔数据DataTable获取成功", RequestUtil.LogsFolderPath);
        return dt;


    }




    #endregion
}
