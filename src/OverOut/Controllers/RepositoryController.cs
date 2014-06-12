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

namespace OverOut.Controllers
{
    public class RepositoryController : Controller
    {
        //
        // GET: /Repository/
        [System.Web.Mvc.HttpPost]
        public async Task<ContentResult> Register([FromBody] CompanyEntity company)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            var data = await client.PostAsJsonAsync("/api/company/addcompany", company);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return Content(dataBody);
        }

        [System.Web.Mvc.HttpPost]
        public async Task<ContentResult> ForgotPassword([FromBody] EmailModel email )
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            var data = await client.PostAsJsonAsync("/api/security/ForgotPassword", email);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return Content(dataBody);
        } 
    }
}
