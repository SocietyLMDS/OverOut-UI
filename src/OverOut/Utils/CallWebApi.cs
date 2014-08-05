using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using OverOut.Auth;
using OverOut.Models;

namespace OverOut.Utils
{
    public static class CallWebApi
    {
        public static async Task<string> Get(string method, string uri, string parameters)
        {
            var hash2 = DigestAuthentication.GetHash2(method, uri);
            var response = DigestAuthentication.GetResponse(hash2);
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" + DigestAuthentication.Username + "\", realm=\"" + DigestAuthentication.Realm + "\" ,nonce=\"" + DigestAuthentication.Nonce + "\", uri=\"" + uri + "\", cnonce=\"" + DigestAuthentication.CNonce + "\", nc=" + DigestAuthentication.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthentication.QoP + "\"");
            var data = await client.GetAsync(uri + parameters);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return dataBody;
        }

        public static async Task<string> Post(string method, string uri, dynamic parameters)
        {
            var hash2 = DigestAuthentication.GetHash2(method, uri);
            var response = DigestAuthentication.GetResponse(hash2);
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" + DigestAuthentication.Username + "\", realm=\"" + DigestAuthentication.Realm + "\" ,nonce=\"" + DigestAuthentication.Nonce + "\", uri=\"" + uri + "\", cnonce=\"" + DigestAuthentication.CNonce + "\", nc=" + DigestAuthentication.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthentication.QoP + "\"");
            var data = await HttpClientExtensions.PostAsJsonAsync(client, uri,  parameters);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return dataBody;
        }

        public static async Task<string> Post(string uri, dynamic parameters)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            var data = await HttpClientExtensions.PostAsJsonAsync(client,  uri, parameters);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return dataBody;
        }

        public static async Task<string> Put(string method, string uri, dynamic parameters)
        {
            var hash2 = DigestAuthentication.GetHash2(method, uri);
            var response = DigestAuthentication.GetResponse(hash2);
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" + DigestAuthentication.Username + "\", realm=\"" + DigestAuthentication.Realm + "\" ,nonce=\"" + DigestAuthentication.Nonce + "\", uri=\"" + uri + "\", cnonce=\"" + DigestAuthentication.CNonce + "\", nc=" + DigestAuthentication.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthentication.QoP + "\"");
            var data = await HttpClientExtensions.PutAsJsonAsync(client, uri, parameters);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return dataBody;
        }

        public static async Task<string> Delete(string method, string uri, string parameters)
        {
            var hash2 = DigestAuthentication.GetHash2(method, uri);
            var response = DigestAuthentication.GetResponse(hash2);
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" + DigestAuthentication.Username + "\", realm=\"" + DigestAuthentication.Realm + "\" ,nonce=\"" + DigestAuthentication.Nonce + "\", uri=\"" + uri + "\", cnonce=\"" + DigestAuthentication.CNonce + "\", nc=" + DigestAuthentication.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthentication.QoP + "\"");
            var data = await client.DeleteAsync(uri + parameters);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return dataBody;
        }

        public static async Task<string> PostUpload(string method, string uri, FileModel fileModel)
        {
            //try
            //{
            //    var imageData = new byte[fileModel.File.ContentLength];
            //}
            //catch (Exception e)
            //{
            //    var t = e;
            //}
            

            //var requestContent = new MultipartFormDataContent();
            //var imageContent = new ByteArrayContent(imageData);
            //imageContent.Headers.ContentType = MediaTypeHeaderValue.Parse("image/" + fileModel.FileName.Split('.')[1]);
            //requestContent.Add(imageContent, fileModel.FileName.Split('.')[0], fileModel.FileName);
            //requestContent.Add(new StringContent(fileModel.FileName),"filename");
            //requestContent.Add(new StringContent(fileModel.Id), "id");

            //var hash2 = DigestAuthentication.GetHash2(method, uri);
            //var response = DigestAuthentication.GetResponse(hash2);
            //var client = new HttpClient();
            //client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" + DigestAuthentication.Username + "\", realm=\"" + DigestAuthentication.Realm + "\" ,nonce=\"" + DigestAuthentication.Nonce + "\", uri=\"" + uri + "\", cnonce=\"" + DigestAuthentication.CNonce + "\", nc=" + DigestAuthentication.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthentication.QoP + "\"");
            //var data = await client.PostAsync(uri, requestContent);
            //data.EnsureSuccessStatusCode();
            //var dataBody = await data.Content.ReadAsStringAsync();
            return "";
        }
    }
}