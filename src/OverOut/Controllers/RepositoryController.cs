using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;
using OverOut.Auth;
using OverOut.Models;
using OverOut.Utils;

namespace OverOut.Controllers
{
    public class RepositoryController : Controller
    {
        //
        // GET: /Repository/
        [System.Web.Mvc.HttpPost]
        public async Task<ContentResult> Register([FromBody] CompanyModel company)
        {
            var dataBody = await CallWebApi.Post("/api/company/addcompany", company);
            return Content(dataBody);
        }

        [System.Web.Mvc.HttpPost]
        public async Task<ContentResult> ForgotPassword([FromBody] EmailModel email)
        {
            var dataBody = await CallWebApi.Post("/api/security/ForgotPassword", email);
            return Content(dataBody);
        }

        public async Task<ContentResult> GetUser()
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            var section = new Section { UserType = currentUser.UserType };
            return Content(JsonConvert.SerializeObject(section));
        }

        public async Task<ContentResult> GetCurrentCompany()
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            var dataBody = await CallWebApi.Get("GET", "api/company/getcompanybyid", "/?id=" + currentUser.Id);
            var company = JsonConvert.DeserializeObject<CompanyModel>(dataBody);
            return Content(JsonConvert.SerializeObject(company));
        }

        public async Task<ContentResult> GetCompanyEmployees()
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            var dataBody = await CallWebApi.Get("GET", "api/employee/getallemployee", "/?id=" + currentUser.Id);
            var employee = JsonConvert.DeserializeObject(dataBody);
            return Content(JsonConvert.SerializeObject(employee));
        }

        public async Task<ContentResult> GetCompanyCustomers()
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            var dataBody = await CallWebApi.Get("GET", "api/customer/getallcustomer", "/?id=" + currentUser.Id);
            var customers = JsonConvert.DeserializeObject(dataBody);
            return Content(JsonConvert.SerializeObject(customers));
        }

        public async Task<ContentResult> GetCompanyReports()
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            var dataBody = await CallWebApi.Get("GET", "api/report/getallreports", "/?id=" + currentUser.Id);
            var reports = JsonConvert.DeserializeObject(dataBody);
            return Content(JsonConvert.SerializeObject(reports));
        }

        public async Task<ContentResult> GetCompanySchedules()
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            var dataBody = await CallWebApi.Get("GET", "api/schedule/getallschedules", "/?id=" + currentUser.Id);
            var schedules = JsonConvert.DeserializeObject(dataBody);
            return Content(JsonConvert.SerializeObject(schedules));
        }

        public async Task<ContentResult> AddCustomer([FromBody] CustomerModel customer)
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            customer.CompanyId = Guid.Parse(currentUser.Id);
            var dataBody = await CallWebApi.Post("POST", "api/customer/addcustomer", customer);
            return Content(dataBody);
        } 
    }
}
