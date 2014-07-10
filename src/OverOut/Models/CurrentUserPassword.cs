using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OverOut.Models
{
    public class CurrentUserPassword
    {
        public string UserType { get; set; }
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string RetypeNewPassword { get; set; }
    }
}