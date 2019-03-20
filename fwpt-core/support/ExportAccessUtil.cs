using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZYSK.DZPT.Base.DbBase;
using ZYSK.DZPT.Base.DbBase.Access;
using ZYSK.DZPT.Base.Utility;

public class ExportAccessUtil
{
    public const string ACCESS_PATH = "";
    private static IDBHelper _dbOrl = null;
    public static string ErrorMessage = "";

    public static bool Insert2Access(string[] arrzknos, string accesspath)
    {
        ErrorMessage = "";
        bool blresult = true;
        bool blresult1 = true;
        bool blresult2 = true;
        bool blresult3 = true;
        bool blresult4 = true;
        bool blresult5 = true;
        bool blresult6 = true;
        bool blresult7 = true;
        _dbOrl = RequestUtil.GlobalDBHelper;
        IDBHelper accessdb = new AccessDBHelper();
        accessdb.DBPath = accesspath;  //要导出Access数据库对应的DBHelper
        DataTable dttest = accessdb.DoQueryEx("select * from g_OrgTree");
        GeoZkPointsDataRepository geozkResposity = new GeoZkPointsDataRepository();
        DataRow[] drSelected = geozkResposity.GetDataWhereInArrId(arrzknos);
        List<GeoZkPointsData> lstzkData = MappingUtil.GetEntityFromDataRowArr<GeoZkPointsData>(drSelected);


        string gcbh = "";
        string zkbh = "";
        int zkcount = lstzkData.Count;
        string orl_sql_zuankong = "", orl_sql_shuiwei = "", orl_sql_quyang = "", orl_sql_connect = "", orl_sql_temptuceng = "", orl_sql_tuceng = "", orl_sql_biaoguan = "";
        OleDbConnection accConn = (OleDbConnection)accessdb.ActiveConnection;
        List<object[]> lstrows_zk = new List<object[]>();
        List<object[]> lstrows_sw = new List<object[]>();
        List<object[]> lstrows_qy = new List<object[]>();
        List<object[]> lstrows_conn = new List<object[]>();
        List<object[]> lstrows_ttc = new List<object[]>();
        List<object[]> lstrows_tc = new List<object[]>();
        List<object[]> lstrows_bg = new List<object[]>();
        DataTable dtzk = new DataTable();
        DataTable dtsw = new DataTable();
        DataTable dtqy = new DataTable();
        DataTable dtconnect = new DataTable();
        DataTable dtttc = new DataTable();
        DataTable dttc = new DataTable();
        DataTable dtbg = new DataTable();
        DataTable dtgc = new DataTable();
        int gcsyRepalce = Convert.ToInt32(DateTime.Now.Year + "" + DateTime.Now.Month + "" + DateTime.Now.Day);
        string gcmcRepalce = "Exported" + gcsyRepalce;
        int zknum = 0;//统计钻孔数目，也作为钻孔新的编号
        try
        {
            for (int i = 0; i < zkcount; i++)
            {
                zknum++;
                gcbh = lstzkData[i].ProjectNo;
                zkbh = lstzkData[i].ZKBH;

                dtzk.Clear();
                orl_sql_zuankong = string.Format("select * from z_zuankong where F_PROJECTNO='{0}' and zkbh='{1}'", gcbh, zkbh);
                dtzk = _dbOrl.DoQueryEx(orl_sql_zuankong);
                if (dtzk.Rows.Count > 0)
                {
                    dtzk.Columns.RemoveAt(0);
                    foreach (DataRow dr in dtzk.Rows)
                    {
                        object[] obj = dr.ItemArray;
                        obj[0] = gcsyRepalce;
                        obj[1] = zknum;
                        lstrows_zk.Add(obj);
                    }

                }

                dtsw.Clear();
                orl_sql_shuiwei = string.Format("select * from z_g_shuiwei where F_PROJECTNO='{0}' and zkbh='{1}'", gcbh, zkbh);
                dtsw = _dbOrl.DoQueryEx(orl_sql_shuiwei);
                if (dtsw.Rows.Count > 0)
                {
                    dtsw.Columns.RemoveAt(0);
                    foreach (DataRow dr in dtsw.Rows)
                    {
                        object[] obj = dr.ItemArray;
                        obj[0] = gcsyRepalce;
                        obj[1] = zknum;
                        lstrows_sw.Add(obj);

                    }

                }

                dtqy.Clear();
                orl_sql_quyang = string.Format("select * from z_c_quyang where F_PROJECTNO='{0}' and zkbh='{1}'", gcbh, zkbh);
                dtqy = _dbOrl.DoQueryEx(orl_sql_quyang);
                if (dtqy.Rows.Count > 0)
                {
                    dtqy.Columns.RemoveAt(0);
                    foreach (DataRow dr in dtqy.Rows)
                    {
                        object[] obj = dr.ItemArray;
                        obj[0] = gcsyRepalce;
                        obj[1] = zknum;
                        lstrows_qy.Add(obj);
                    }

                }

                dtconnect.Clear();
                orl_sql_connect = string.Format("select * from p_connect where F_PROJECTNO='{0}' and zkbh='{1}'", gcbh, zkbh);
                dtconnect = _dbOrl.DoQueryEx(orl_sql_connect);
                if (dtconnect.Rows.Count > 0)
                {
                    dtconnect.Columns.RemoveAt(0);
                    foreach (DataRow dr in dtconnect.Rows)
                    {
                        object[] obj = dr.ItemArray;
                        obj[0] = gcsyRepalce;
                        obj[2] = zknum;
                        lstrows_conn.Add(obj);
                    }

                }

                dtttc.Clear();
                orl_sql_temptuceng = string.Format("select * from z_g_temptuceng where F_PROJECTNO='{0}' and zkbh='{1}'", gcbh, zkbh);
                dtttc = _dbOrl.DoQueryEx(orl_sql_temptuceng);
                if (dtttc.Rows.Count > 0)
                {
                    dtttc.Columns.RemoveAt(0);
                    foreach (DataRow dr in dtttc.Rows)
                    {
                        object[] obj = dr.ItemArray;
                        obj[0] = gcsyRepalce;
                        obj[1] = zknum;
                        lstrows_ttc.Add(obj);
                    }

                }

                dttc.Clear();
                orl_sql_tuceng = string.Format("select * from z_g_tuceng where F_PROJECTNO='{0}' and zkbh='{1}'", gcbh, zkbh);
                dttc = _dbOrl.DoQueryEx(orl_sql_tuceng);
                if (dttc.Rows.Count > 0)
                {
                    dttc.Columns.RemoveAt(0);
                    foreach (DataRow dr in dttc.Rows)
                    {
                        object[] obj = dr.ItemArray;
                        obj[0] = gcsyRepalce;
                        obj[1] = zknum;
                        lstrows_tc.Add(obj);
                    }

                }

                dtbg.Clear();
                orl_sql_biaoguan = string.Format("select * from z_y_biaoguan where F_PROJECTNO='{0}' and zkbh='{1}'", gcbh, zkbh);
                dtbg = _dbOrl.DoQueryEx(orl_sql_biaoguan);
                if (dtbg.Rows.Count > 0)
                {
                    dtbg.Columns.RemoveAt(0);
                    foreach (DataRow dr in dtbg.Rows)
                    {
                        object[] obj = dr.ItemArray;
                        obj[0] = gcsyRepalce;
                        obj[1] = zknum;
                        lstrows_bg.Add(obj);
                    }
                }

            }

            blresult1 = CreateCmdsAndUpdate("z_zuankong", accConn, lstrows_zk);
            blresult2 = CreateCmdsAndUpdate("z_g_shuiwei", accConn, lstrows_sw);
            blresult3 = CreateCmdsAndUpdate("z_c_quyang", accConn, lstrows_qy);
            blresult4 = CreateCmdsAndUpdate("p_connect", accConn, lstrows_conn);
            blresult5 = CreateCmdsAndUpdate("z_g_temptuceng", accConn, lstrows_ttc);
            blresult6 = CreateCmdsAndUpdate("z_g_tuceng", accConn, lstrows_tc);
            blresult7 = CreateCmdsAndUpdate("z_y_biaoguan", accConn, lstrows_bg);

            string sql_gc = string.Format("update x_GongCheng set GCSY='{0}',GCMC='{1}', GCBH='{2}', GCBHOLD='{3}'", gcsyRepalce, gcmcRepalce, gcmcRepalce, gcmcRepalce);//另外两个字段GCBH,GCBHOLD,                      
            accessdb.DoSQL(sql_gc);

        }
        catch (Exception ex)
        {
            LogManager.WriteToError("导出Access数据库");
            LogManager.WriteToError(ex.Message);
            ErrorMessage += "导出Access数据库:" + ex.Message;

        }
        finally
        {
            if (accessdb.ActiveConnection.State == ConnectionState.Open)
            {
                accessdb.ActiveConnection.Close();
            }
            StreamsFile(accesspath);
        }
        blresult = blresult1 && blresult2 && blresult3 && blresult4 && blresult5 && blresult6 && blresult7;

        return blresult;
    }


    private static bool CreateCmdsAndUpdate(string strTableName, OleDbConnection connection, List<object[]> arrDr)
    {
        OleDbDataAdapter adapter = new OleDbDataAdapter();
        adapter.SelectCommand = new OleDbCommand("SELECT * FROM [" + strTableName + "]", connection);
        OleDbCommandBuilder builder = new OleDbCommandBuilder(adapter);
        builder.QuotePrefix = "[";
        builder.QuoteSuffix = "]";
        //builder.QuotePrefix
        try
        {
            // connection.Open();
            DataSet customers = new DataSet();
            adapter.Fill(customers);
            for (int i = 0; i < arrDr.Count; i++)
            {
                //code to modify data in dataset here
                customers.Tables[0].Rows.Add(arrDr[i]);
                //  adapter.UpdateBatchSize = customers.Tables[0].Rows.Count; 
            }
            adapter.Update(customers);
            customers.AcceptChanges();
            return true;
        }
        catch (Exception ex)
        {
            connection.Close();
            ErrorMessage += "导出Access数据库:" + ex.Message;
            return false;
        }
    }



    public static void StreamsFile(string fpath)
    {
        try
        {
            var p = new Process
            {
                StartInfo =
                {
                    FileName = Environment.CurrentDirectory + "\\streams64.exe",
                    UseShellExecute = false,
                    Arguments = " -d \"" + fpath + "\""
                }
            };
            //执行参数
            p.StartInfo.UseShellExecute = false;  ////不使用系统外壳程序启动进程
            p.StartInfo.CreateNoWindow = true;  //不显示dos程序窗口
            p.StartInfo.RedirectStandardInput = true;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.RedirectStandardError = true;//把外部程序错误输出写到StandardError流中
            p.ErrorDataReceived += new DataReceivedEventHandler(p_ErrorDataReceived);
            p.OutputDataReceived += new DataReceivedEventHandler(p_OutputDataReceived);
            p.StartInfo.UseShellExecute = false;
            p.Start();
            p.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
            p.BeginErrorReadLine();//开始异步读取
            p.WaitForExit();//阻塞等待进程结束
            p.Close();//关闭进程
            p.Dispose();//释放资源
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    public static void p_ErrorDataReceived(object sender, DataReceivedEventArgs e)
    {
        Console.WriteLine(e.Data);
    }
    public static void p_OutputDataReceived(object sender, DataReceivedEventArgs e)
    {
        Console.WriteLine(e.Data);
    }




}



