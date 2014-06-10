using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using OverOut.Auth;

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
                await DigestAuthenticationUtils.SetupValues();
                DigestAuthenticationUtils.GenerateCNonce();
                DigestAuthenticationUtils.SetupHash1(username, password);
                var hash2 = DigestAuthenticationUtils.GetHash2("GET", "/api/security/login");
                var response = DigestAuthenticationUtils.GetResponse(hash2);
                var client = new HttpClient();
                client.BaseAddress = new Uri("http://localhost:57903/");
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" + username + "\", realm=\"" + DigestAuthenticationUtils.Realm + "\" ,nonce=\"" + DigestAuthenticationUtils.Nonce + "\",uri=\"/api/security/login\", cnonce=\"" + DigestAuthenticationUtils.CNonce + "\", nc=" + DigestAuthenticationUtils.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthenticationUtils.QoP+"\"");
                var data = await client.GetAsync("api/security/login");
               
                if (username == "ladji" && password == "diakite")
                {
                    FormsAuthentication.SetAuthCookie(username, false);
                    return Content("/Home/Index"); 
                }
            }

            return Content("/Login/Index");
        }

        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return Content("");
        }
    }
}
