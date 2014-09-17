using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Models
{
    public class ShiftModel
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid ScheduleId { get; set; }
        public Guid EmployeeId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string EmailAddress { get; set; }
        public string JobDescription { get; set; }
        public string PersonalNumber { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string TotalTime { get; set; }
        public bool Removed { get; set; }
        public string Status { get; set; }
    }
}