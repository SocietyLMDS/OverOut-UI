using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using OverOut.Auth;
using Newtonsoft.Json;
using OverOut.Models;

namespace OverOut.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ContentResult> Index(string username, string password)
        {
            if (ModelState.IsValid)
            {
                await DigestAuthentication.Initiate(username, password);
                var hash2 = DigestAuthentication.GetHash2("GET", "/api/security/login");
                var response = DigestAuthentication.GetResponse(hash2);
                var client = new HttpClient();
                client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" +DigestAuthentication.Username + "\", realm=\"" + DigestAuthentication.Realm + "\" ,nonce=\"" + DigestAuthentication.Nonce + "\",uri=\"/api/security/login\", cnonce=\"" + DigestAuthentication.CNonce + "\", nc=" + DigestAuthentication.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthentication.QoP+"\"");
                var data = await client.GetAsync("api/security/login");
                data.EnsureSuccessStatusCode();
                var dataBody = await data.Content.ReadAsStringAsync();
                var currentUser = JsonConvert.DeserializeObject<CurrentUser>(dataBody);
                currentUser.RedirectTo = "/Home";
                FormsAuthentication.SetAuthCookie(username, false);
                return Content(JsonConvert.SerializeObject(currentUser));
            }

            return Content("LoginFailed");
        }

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return Content("");
        }
    }
}
