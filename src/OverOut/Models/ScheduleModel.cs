using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Models
{
    public class ScheduleModel
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid CustomerId { get; set; }
        public Guid CustomerObjectId { get; set; }
        public string CompanyName { get; set; }
        public string CustomerName { get; set; }
        public string CustomerObjectName { get; set; }
        public Address CustomerObjectAddress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<ShiftModel> Schedules { get; set; }
    }
}