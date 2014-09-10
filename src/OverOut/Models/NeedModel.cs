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
        public string NumberOfPersonalNeeded { get; set; }
        public string StartDateTime { get; set; }
        public string EndDateTime { get; set; }
    }
}