using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using ZYSK.DZPT.Base.DbBase;

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

    /// <summary>
    /// 获取多级钻孔数据，
    /// </summary>
    /// <returns></returns>
    public List<MultilevelZKData> GetAll()
    {
        List<MultilevelZKData> lstmultilev = new List<MultilevelZKData>();
        Dictionary<string, string> dic = new Dictionary<string, string>();
        DataTable dtzk = this.GetAllRecordsToDT();
        List<GeoZkPointsData> lstzk = new List<GeoZkPointsData>();
        lstzk = MappingUtil.GetEntityFromDataTable<GeoZkPointsData>(dtzk);
        var query = from t in dtzk.AsEnumerable()
                    group t by new { prjno = t.Field<string>(GeoZkPointsData.FIELD_F_PROJECTNO),prjname = t.Field<string>(GeoZkPointsData.FIELD_F_PROJECTNAME) } into m
                    select new
                    {
                        prjno = m.Key.prjno,
                        prjname=m.Key.prjname
                    };

        if (query.ToList().Count > 0)
        {
            query.ToList().ForEach(q => dic.Add(q.prjno,q.prjname));
        }
       
        foreach (var item in dic)
        {
            IEnumerable<GeoZkPointsData> lst = lstzk.Where((zkpoint) => { return zkpoint.ProjectNo.Equals(item.Key); });
            lstmultilev.Add(new MultilevelZKData(item.Key, item.Value, lst.ToList()));
        }
        return lstmultilev;
    }

    #endregion


    #region 私有方法
    private DataTable GetAllRecordsToDT()
    {
        string sql = "select * from " + GeoZkPointsData.TABLE_NAME + " order by " + GeoZkPointsData.FIELD_F_PROJECTNO + " , " + GeoZkPointsData.FIELD_F_ZKBH;
        DataTable dt = _db.DoQueryEx(sql);
        return dt;
    }




    #endregion
}