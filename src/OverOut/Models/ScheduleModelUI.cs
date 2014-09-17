using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Models
{
    public class ScheduleModelUi
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public Guid CustomerObjectId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerObjectName { get; set; }
        public Address CustomerObjectAddress { get; set; }
        public string Day { get; set; }
        public DateTime StartDateAndTime { get; set; }
        public DateTime EndDateAndTime { get; set; }
        public List<EmployeeModel> Employees { get; set; }
        public string Type { get; set; }
    }
}