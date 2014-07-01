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
 
        public async Task<ContentResult> ModifyCustomer([FromBody] CustomerModel customer)
        {
            var dataBody = await CallWebApi.Put("PUT", "api/customer/modifycustomer", customer);
            return Content(dataBody);
        }
 
        public async Task<ContentResult> DeleteCustomer([FromBody] CustomerModel customer)
        {
            var dataBody = await CallWebApi.Delete("DELETE", "api/customer/deletecustomer", "/?id=" + customer.Id + "&companyId=" + customer.CompanyId);
            return Content(dataBody);
        }

        public async Task<ContentResult> AddObjectToCustomer([FromBody] CustomerObjectModel customerObject)
        {
            var dataBoby = await CallWebApi.Post("POST", "api/customerobject/addcustomerobject", customerObject);
            return Content(dataBoby);
        }
 
        public async Task<ContentResult> ModifyCustomerObject([FromBody] CustomerObjectModel customerObject)
        {
            var dataBody = await CallWebApi.Put("PUT", "api/customerobject/modifycustomerObject", customerObject);
            return Content(dataBody);
        } 

        public async Task<ContentResult> DeleteCustomerObject([FromBody] CustomerObjectModel customerObject)
        {
            var dataBody = await CallWebApi.Delete("DELETE", "api/customerobject/deletecustomerobject", "/?id=" + customerObject.Id + "&companyId=" + customerObject.CompanyId + "&customerId=" + customerObject.CustomerId);
            return Content(dataBody);
        } 

        public async Task<ContentResult> AddNeedToCustomerObject([FromBody] NeedModel need)
        {
            var dataBody = await CallWebApi.Post("POST", "api/customerobjectneed/addneedtocustomerobject", need);
            return Content(dataBody);
        }
 
        public async Task<ContentResult> ModifyCustomerObjectNeed([FromBody] NeedModel need)
        {
            var dataBody = await CallWebApi.Put("PUT", "api/customerobjectneed/modifyneedoncustomerobject", need);
            return Content(dataBody);
        }
 
        public async Task<ContentResult> DeleteCustomerObjectNeed([FromBody] NeedModel need)
        {
            var dataBody = await CallWebApi.Delete("DELETE", "api/customerobjectneed/deleteneedfromcustomerobject", "/?id=" + need.Id + "&companyId=" + need.CompanyId + "&customerId=" + need.CustomerId + "&customerObjectId=" + need.CustomerObjectId);
            return Content(dataBody);
        } 
    }
}
