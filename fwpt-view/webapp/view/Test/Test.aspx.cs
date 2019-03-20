using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class webapp_view_Test_Test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        GeoZkPointsDataRepository gepzkdatasRepository = new GeoZkPointsDataRepository();
        if (!Page.IsPostBack)
        {
            ReportDataSource bb = new ReportDataSource("datasetTest", gepzkdatasRepository.GetZKDataTest());
            ReportViewer1.LocalReport.DataSources.Clear();
            ReportViewer1.LocalReport.DataSources.Add(bb);
        }

    }
}