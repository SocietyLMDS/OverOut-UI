using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;
using OverOut.Models;

namespace OverOut.Auth
{
    public static class DigestAuthentication
    {
        public static string Nonce { get; set; }
        public static string QoP { get; set; }
        public static string Realm { get; set; }
        public static int NonceCount { get; set; }
        public static string CNonce { get; set; }
        public static string Username { get; set; }
        public static string Password { get; set; }
        public static string Hash1 { get; set; }
        public static ConcurrentDictionary<string, CurrentUser> Users = new ConcurrentDictionary<string, CurrentUser>();

        public static async Task Initiate(string username, string password)
        {
            Username = username;
            Password = password;
            await SetupValues();
            GenerateCNonce();
        }

        public static void UsersLoggedIn(CurrentUser user)
        {
            user.Username = Username;
            user.Password = Password;
            Users.AddOrUpdate(user.Username, user, (oldkey, oldvalue) => user);
        }

        public static async Task SetupValues()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.GetAsync("api/security/login");
            var headers = response.Headers.WwwAuthenticate.SingleOrDefault(s => s.Parameter.Contains("nonce")).Parameter;
            var splitHeaders = headers.Split(',');
            foreach (var splitItems in splitHeaders.Select(items => items.Split('=')))
            {
                switch (splitItems[0].Trim())
                {
                    case "nonce":
                        Nonce = splitItems[1].Trim().Substring(1, splitItems[1].Trim().Length-2);
                        break;
                    case "realm":
                        Realm = splitItems[1].Trim().Substring(1, splitItems[1].Trim().Length-2);
                        break;
                    case "qop":
                        QoP = splitItems[1].Trim().Substring(1, splitItems[1].Trim().Length-2);
                        break;
                }
            }
        }

        public static void GenerateCNonce()
        {
            var bytes = new byte[16];
            var rngProvider = new RNGCryptoServiceProvider();
            rngProvider.GetBytes(bytes);
            var hash = GenerateMd5Hash(bytes);
            CNonce = hash;
        }

        public static string ConvertStringToMd5Hash(string hashString)
        {
            return GenerateMd5Hash(Encoding.UTF8.GetBytes(hashString));
        }

        public static string GetNonceCount()
        {
           NonceCount++;
           return NonceCount.ToString(CultureInfo.InvariantCulture);
        }

        public static string GenerateMd5Hash(byte[] bytes)
        {
            var hash = new StringBuilder();
            var md5 = MD5.Create();
            md5.ComputeHash(bytes).ToList().ForEach(b => hash.AppendFormat("{0:x2}", b));
            return hash.ToString();
        }

        public static void SetupHash1()
        {
            try
            {
                var usernameFromCookie = FormsAuthentication.Decrypt(HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
                var currentUser = Users[usernameFromCookie];
                Username = currentUser.Username;
                Password = currentUser.Password;
                Hash1 = ConvertStringToMd5Hash(string.Format("{0}:{1}:{2}", Username, Realm, Password));
            }
            catch (Exception)
            {
                Hash1 = ConvertStringToMd5Hash(string.Format("{0}:{1}:{2}", Username, Realm, Password));
            }

        }

        public static string GetHash2(string method, string uri)
        {
            return ConvertStringToMd5Hash(string.Format("{0}:{1}", method, uri));
        }

        public static string GetResponse(string hash2)
        {
            return ConvertStringToMd5Hash(string.Format("{0}:{1}:{2}:{3}:{4}:{5}", Hash1, Nonce, GetNonceCount(), CNonce, QoP, hash2));
        }
    }
}