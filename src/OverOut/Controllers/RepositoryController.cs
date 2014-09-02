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
            var employee = JsonConvert.DeserializeObject<List<EmployeeModel>>(dataBody);
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

        public async Task<ContentResult> AddEmployee([FromBody] EmployeeModel employee)
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            employee.CompanyId = Guid.Parse(currentUser.Id);
            var dataBody = await CallWebApi.Post("POST", "api/employee/addemployee", employee);
            return Content(dataBody);
        }

        public async Task<ContentResult> ModifyEmployee([FromBody] EmployeeModel employee)
        {
            var dataBody = await CallWebApi.Put("PUT", "api/employee/modifyemployee", employee);
            return Content(dataBody);
        }

        public async Task<ContentResult> DeleteEmployee([FromBody] EmployeeModel employee)
        {
            var dataBody = await CallWebApi.Delete("DELETE", "api/employee/deleteemployee", "/?id=" + employee.Id + "&companyId=" + employee.CompanyId);
            return Content(dataBody);
        }

        public async Task<ContentResult> ChangePassword([FromBody] CurrentUserPassword currentUser)
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var getUser = DigestAuthentication.Users[username];
            currentUser.UserType = getUser.UserType;
            currentUser.Username = getUser.Username;
            var dataBody = await CallWebApi.Post("POST", "api/security/changepassword", currentUser);
            DigestAuthentication.SetupHash1(username, currentUser.NewPassword);
            return Content(dataBody);
        }

        public async Task<ContentResult> ModifyCompany([FromBody] CompanyModel companyModel)
        {
            var dataBody = await CallWebApi.Put("PUT", "api/company/modifycompany", companyModel);
            return Content(dataBody);
        }

        public async Task<ContentResult> UploadLogo()
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            var file = Request.Files["file"];
            var fileName = currentUser.CompanyName.Trim() + currentUser.Id + "." + file.FileName.Split('.')[1];
            var fileModel = new FileModel { FileName = fileName, Id = currentUser.Id, File = file };
            var dataBody = await CallWebApi.PostImageUpload("POST", "api/upload/uploadlogo", fileModel);
            return Content(dataBody);
        }

        public async Task<ContentResult> AddSchedule([FromBody] ScheduleModelUi schedule)
        {
            var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
            var currentUser = DigestAuthentication.Users[username];
            dynamic response;

            switch (schedule.Type)
            {
                case "ScheduleByNeed":
                    var str = await CallWebApi.Get("GET", "api/schedule/getschedulelimit", "");
                    var monthsLength = str.Substring(1, str.Length - 2);
                    var scheduleDates = FindOutScheduleDates.GetScheduleDatesList(int.Parse(monthsLength), schedule.Day);
                    foreach (var scheduleDate in scheduleDates)
                    {
                        var startDate = new DateTime(scheduleDate.Year,scheduleDate.Month, scheduleDate.Day, schedule.StartDateAndTime.Hour,schedule.StartDateAndTime.Minute, schedule.StartDateAndTime.Second);
                        var endDate = new DateTime(scheduleDate.Year,scheduleDate.Month, scheduleDate.Day, schedule.EndDateAndTime.Hour,schedule.EndDateAndTime.Minute, schedule.EndDateAndTime.Second);
                        

                        var newSchedule = new ScheduleModel
                            {
                 
                                CompanyId = Guid.Parse(currentUser.Id),
                                CustomerId = schedule.CustomerId,
                                CustomerObjectId = schedule.CustomerObjectId,
                                StartDate = startDate,
                                EndDate = endDate,
                            };

                        response = await CallWebApi.Post("POST", "api/schedule/addschedule", newSchedule);
                        if (response != "Unsuceeded") continue;
                        foreach (var employee in schedule.Employees)
                        {
                            var shiftModel = new ShiftModel
                                {
                                    ScheduleId = Guid.Parse(response), 
                                    EmployeeId = employee.Id,
                                    EmployeeFirstname = employee.Firstname,
                                    EmployeeLastname = employee.Lastname,
                                    StartTime = startDate,
                                    EndTime = endDate,
                                };

                            response = await CallWebApi.Post("POST", "api/shift/addshifttoschedule", shiftModel);
                        }

                        
                    }
                    break;
                case "ScheduleByDate":
                    break;
            }

            return Content("");
        }
    }
}
