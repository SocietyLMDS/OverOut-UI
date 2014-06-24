using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using OverOut.Auth;

namespace OverOut.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        [Authorize]
        public ActionResult Index()
        {
            try
            {
                var username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
                var currentUser = DigestAuthentication.Users[username];
            }
            catch (Exception)
            {

                return RedirectToAction("Index", "Login");
            }

            return View();
        }

    }
}
