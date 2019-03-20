using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

    /// <summary>
    /// GeoZkPointsData 的摘要说明
    /// </summary>
    public class GeoZkPointsData
    {
        #region 常量
        public const string TABLE_NAME = "v_Geo_zkpoints_data";
        public const string FIELD_F_ID = "ID";
        public const string FIELD_F_PROJECTNO = "PROJECTNO";
        public const string FIELD_F_PROJECTNAME = "PROJECTNAME";
        public const string FIELD_F_ZKBH = "ZKBH";
        public const string FIELD_F_ZKSD = "ZKSD";
        public const string FIELD_F_ZKZJ = "ZKZJ";
        public const string FIELD_F_WKT = "WKT";
        #endregion

        #region 字段
        private string _id ="";
        private string _projectNo = "";
        private string _projectName = "";
        private string _zkbh = "";
        private decimal _zksd = 0;
        private decimal _zkzj = 0;
        private string _wkt = "";
        #endregion

        #region 属性

        public string Id
        {
            get
            {
                return _id;
            }
            set
            {
                _id = value;
            }
        }

        public string ProjectNo
        {
            get
            {
                return _projectNo;
            }
            set
            {
                _projectNo = value;
            }
        }

        public string ProjectName
        {
            get
            {
                return _projectName;
            }
            set
            {
                _projectName = value;
            }
        }

        public string ZKBH
        {
            get
            {
                return _zkbh;
            }
            set
            {
                _zkbh = value;
            }
        }

        public decimal ZKSD
        {
            get
            {
                return _zksd;
            }
            set
            {
                _zksd = value;
            }
        }

        public decimal ZKZJ
        {
            get
            {
                return _zkzj;
            }
            set
            {
                _zkzj = value;
            }
        }

        public string WKT
        {
            get
            {
                return _wkt;
            }
            set
            {
                _wkt = value;
            }
        }

        #endregion
    }

    public class MultilevelZKData
    {
        private string _projectNo = "";
        private string _projectName = "";
        private List<GeoZkPointsData> _lstchildren = new List<GeoZkPointsData>();
        public string ProjectNo
        {
            get
            {
                return _projectNo;
            }
            set
            {
                _projectNo = value;
            }
        }

        public string ProjectName
        {
            get
            {
                return _projectName;
            }
            set
            {
                _projectName = value;
            }
        }

        public List<GeoZkPointsData> ListChildren
        {
            get
            {
                return _lstchildren;
            }
            set
            {
                _lstchildren = value;
            }
        }

        public MultilevelZKData(string no, string name, List<GeoZkPointsData> lstzkpoint)
        {
            _projectNo = no;
            _projectName = name;
            _lstchildren = lstzkpoint;
        }
    }

