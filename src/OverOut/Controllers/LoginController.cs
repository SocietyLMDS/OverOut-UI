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
using OverOut.Utils;

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
                var dataBody = await CallWebApi.Get("GET", "api/security/login", "");
                var currentUser = JsonConvert.DeserializeObject<CurrentUser>(dataBody);
                FormsAuthentication.SetAuthCookie(username, false);
                DigestAuthentication.UsersLoggedIn(currentUser);
                return Content("/Home");
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
