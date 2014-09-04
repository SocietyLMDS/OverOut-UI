using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Models
{
    public class ShiftModel
    {
        public Guid Id { get; set; }
        public Guid ScheduleId { get; set; }
        public Guid EmployeeId { get; set; }
        public string EmployeeFirstname { get; set; }
        public string EmployeeLastname { get; set; }
        public string EmployeeEmailAddress { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string TotalTime { get; set; }
        public string Status { get; set; }
    }
}