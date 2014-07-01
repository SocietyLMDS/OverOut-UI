using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Models
{
    public class NeedModel
    {
        public Guid Id { get; set; }
        public Guid CustomerObjectId { get; set; }
        public Guid CustomerId { get; set; }
        public Guid CompanyId { get; set; }
        public string WeekDay { get; set; }
        public string NumberOfPersonalNeeded { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}