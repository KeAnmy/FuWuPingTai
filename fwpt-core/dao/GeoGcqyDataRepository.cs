using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZYSK.DZPT.Base.DbBase;
using ZYSK.DZPT.Base.Utility;

public class GeoGcqyDataRepository
{
    #region 私有变量

    private IDBHelper _db = null;

    #endregion

    #region 初始化
    public GeoGcqyDataRepository()
    {
        _db = RequestUtil.GlobalDBHelper;
    }
    #endregion

    #region 公有方法

    public List<GeoGcqyData> GetAllRecords()
    {
        DataTable dtgc = this.GetAllRecordsToDT();
        List<GeoGcqyData> lstzk = new List<GeoGcqyData>();
        lstzk = MappingUtil.GetEntityFromDataTable<GeoGcqyData>(dtgc);
        return lstzk;
    }
    #endregion

    #region 私有方法
    private DataTable GetAllRecordsToDT()
    {

        string sql = "select * from " + GeoGcqyData.TABLE_NAME + " order by " + GeoZkPointsData.FIELD_F_PROJECTNO + " , " + GeoZkPointsData.FIELD_F_ID;
        try
        {
            DataTable dt = _db.DoQueryEx(sql);
            LogManager.WriteToDebug("工程区域数据DataTable获取成功", RequestUtil.LogsFolderPath);
            return dt;
        }
        catch (Exception ex)
        {
            LogManager.WriteToError(ex.Message, RequestUtil.LogsFolderPath);
            LogManager.WriteToError("工程区域数据DataTable获取失败", RequestUtil.LogsFolderPath);
            return null;
        }

    }




    #endregion



}

