using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using ZYSK.DZPT.Base.Utility;

/// <summary>
/// XmlHelper 的摘要说明
/// </summary>
public class XmlHelper
{
    public XmlHelper()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }

    #region public static

    /// <summary>
    /// 作用：读取Xml文件保存至dictionary
    /// </summary>
    /// <param name="strfilepath">xml文件的路径</param>
    /// <returns></returns>
    public static Dictionary<string, string> ReaderXML(string strfilepath)
    {
        Dictionary<string, string> dicReturn = new Dictionary<string, string>();
        XmlDocument xmldocument = new XmlDocument();
        xmldocument.Load(strfilepath);
        XmlElement root = xmldocument.DocumentElement;
        XmlNodeList nodelist = root.ChildNodes;
        foreach (XmlNode node in nodelist)
        {
            dicReturn.Add(node.Name, node.InnerText.Trim());
        }
        return dicReturn;
    }


    #endregion


}