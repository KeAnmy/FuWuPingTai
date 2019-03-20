using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


   public class GeoGcqyData
   {
       #region 常量
       public const string TABLE_NAME = "V_GEO_GCQY_DATA";
       public const string FIELD_F_ID = "ID";
       public const string FIELD_F_PROJECTNO = "PROJECTNO";
       public const string FIELD_F_PROJECTNAME = "PROJECTNAME";
       public const string FIELD_F_PROJECYHEADER = "PROJECYHEADER";
       public const string FIELD_F_PROJECTDATE = "PROJECTDATE";
       public const string FIELD_F_PROJECTUNIT = "PROJECTUNIT";
       public const string FIELD_F_FILENO = "FILENO";
       public const string FIELD_F_COORDSYSTEM = "COORDSYSTEM";
       public const string FIELD_F_ELEVATIONSYSTEM = "ELEVATIONSYSTEM";
       public const string FIELD_F_WKT = "WKT";
       #endregion

       #region 字段
       private decimal _id = 0;
       private string _projectNo = "";
       private string _projectName = "";
       private string _projecyheader = "";
       private string _projectdate = "";
       private string _projectunit = "";
       private string _fileno = "";
       private string _coordsystem = "";
       private string _elevationsystem = "";
       private string _wkt = "";

     
       #endregion

       #region 属性
       public decimal Id
       {
           get { return _id; }
           set { _id = value; }
       }

       public string ProjectNo
       {
           get { return _projectNo; }
           set { _projectNo = value; }
       }

       public string ProjectName
       {
           get { return _projectName; }
           set { _projectName = value; }
       }

       public string Projecyheader
       {
           get { return _projecyheader; }
           set { _projecyheader = value; }
       }

       public string Projectdate
       {
           get { return _projectdate; }
           set { _projectdate = value; }
       }

       public string Projectunit
       {
           get { return _projectunit; }
           set { _projectunit = value; }
       }

       public string Fileno
       {
           get { return _fileno; }
           set { _fileno = value; }
       }

       public string Coordsystem
       {
           get { return _coordsystem; }
           set { _coordsystem = value; }
       }

       public string Elevationsystem
       {
           get { return _elevationsystem; }
           set { _elevationsystem = value; }
       }

       public string Wkt
       {
           get { return _wkt; }
           set { _wkt = value; }
       }

       #endregion
   }

