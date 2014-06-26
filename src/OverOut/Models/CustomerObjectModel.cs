using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Models
{
    public class CustomerObjectModel
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public Address VisitationAddress { get; set; }
        public string ResponsibleGuardFirstname { get; set; }
        public string ResponsibleGuardLastname { get; set; }
        public string ResponsibleManagerFistname { get; set; }
        public string ResponsibleManagerLastname { get; set; }
        public string LicenseType { get; set; }
        public bool License { get; set; }
        public int HourlyRate { get; set; }
    }
}