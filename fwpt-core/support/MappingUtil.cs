using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using Newtonsoft.Json;

/// <summary>
/// MappingUtil :映射通用类
/// 作用：将DataTable转化为实体对象
/// 日期：2018-12-27
/// </summary>
public class MappingUtil
{
    public MappingUtil()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }

    /// <summary>
    /// 将DataTable映射为实体对象列表
    /// </summary>
    /// <typeparam name="T">对象实体类型</typeparam>
    /// <param name="sourceDT">源数据表</param>
    /// <returns></returns>
    public static List<T> GetEntityFromDataTable<T>(DataTable sourceDT) where T : class
    {
        List<T> list = new List<T>();
        // 获取需要转换的目标类型
        Type type = typeof(T);
        foreach (DataRow dRow in sourceDT.Rows)
        {
            // 实体化目标类型对象
            object obj = Activator.CreateInstance(type);
            foreach (var prop in type.GetProperties())
            {
                // 给目标类型对象的各个属性值赋值
                if (prop != null && dRow[prop.Name]!=DBNull.Value)
                {
                    prop.SetValue(obj, dRow[prop.Name], null);
                }
                
            }
            list.Add(obj as T);
        }
        return list;
    }


    /// <summary>
    /// 将DataTable映射为实体对象列表
    /// </summary>
    /// <typeparam name="T">对象实体类型</typeparam>
    /// <param name="sourceDT">源数据表</param>
    /// <returns></returns>
    public static List<T> GetEntityFromDataRowArr<T>(DataRow[] sourceDRS) where T : class
    {
        List<T> list = new List<T>();
        // 获取需要转换的目标类型
        Type type = typeof(T);
        foreach (DataRow dRow in sourceDRS)
        {
            // 实体化目标类型对象
            object obj = Activator.CreateInstance(type);
            foreach (var prop in type.GetProperties())
            {
                // 给目标类型对象的各个属性值赋值
                if (prop != null && dRow[prop.Name] != DBNull.Value)
                {
                    prop.SetValue(obj, dRow[prop.Name], null);
                }

            }
            list.Add(obj as T);
        }
        return list;
    }

    /// <summary>
    /// 将实体对象转化为JSON字符串
    /// </summary>
    /// <typeparam name="T">泛型</typeparam>
    /// <param name="obj">实体对象</param>
    /// <returns></returns>
    public static string GetJSON<T>(T obj)
    {
        DataContractJsonSerializer json = new DataContractJsonSerializer(typeof(T));
        using (MemoryStream ms=new MemoryStream ())
        {
            json.WriteObject(ms, obj);
            string strJson = Encoding.UTF8.GetString(ms.ToArray());
            return strJson;
        }
    }

    /// <summary>
    /// 将实体List集合转化为JSON对象
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="lstObj"></param>
    /// <returns></returns>
    public static string GetJSON<T>(List<T> lstObj)
    {
        List<string> lst = new List<string>();
        foreach(T obj in lstObj)
        {
            lst.Add(GetJSON<T>(obj));
        }
       string result="["+string.Join(" , ",lst.ToArray())+"]";
      
       return result;
    }

    public static string Convert2JSON<T>(List<T> lstObj)
    {
        
       string result= JsonConvert.SerializeObject(lstObj);
       return result;
        //JsonSerializer serializer = new JsonSerializer();
        //using (StreamWriter sw=new StreamWriter ())
        //{
        //    serializer.Serialize(new JsonTextWriter(sw), lstObj);
        //}
    }
}