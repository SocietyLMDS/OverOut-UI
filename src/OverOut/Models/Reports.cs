using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Models
{
    public class Reports
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid CustomerId { get; set; }
        public Guid CompanyId { get; set; }
        public string ReportName { get; set; }
        public ReportModel ReportModel { get; set; }
    }
}