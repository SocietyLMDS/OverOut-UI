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
using System.Web.Security;
using OverOut.Auth;
using OverOut.Models;
using System.Drawing;
using System.Drawing.Imaging;

namespace OverOut.Utils
{
    public static class CallWebApi
    {
        public static async Task<string> Get(string method, string uri, string parameters)
        {
            DigestAuthentication.SetupHash1();
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
            DigestAuthentication.SetupHash1();
            var hash2 = DigestAuthentication.GetHash2(method, uri);
            var response = DigestAuthentication.GetResponse(hash2);
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" + DigestAuthentication.Username + "\", realm=\"" + DigestAuthentication.Realm + "\" ,nonce=\"" + DigestAuthentication.Nonce + "\", uri=\"" + uri + "\", cnonce=\"" + DigestAuthentication.CNonce + "\", nc=" + DigestAuthentication.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthentication.QoP + "\"");
            var data = await HttpClientExtensions.PostAsJsonAsync(client, uri, parameters);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return dataBody;
        }

        public static async Task<string> Post(string uri, dynamic parameters)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            var data = await HttpClientExtensions.PostAsJsonAsync(client, uri, parameters);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return dataBody;
        }

        public static async Task<string> Put(string method, string uri, dynamic parameters)
        {
            DigestAuthentication.SetupHash1();
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
            DigestAuthentication.SetupHash1();
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

        public static async Task<string> PostImageUpload(string method, string uri, FileModel fileModel)
        {
            var image = Image.FromStream(fileModel.File.InputStream,true,true);
            var ms = new MemoryStream();
            image.Save(ms, ChooseImageFormat.GetImageFormat(fileModel.FileName.Split('.')[1]));
            var bytes = ms.ToArray();
            var requestContent = new MultipartFormDataContent();
            var imageContent = new ByteArrayContent(bytes);
            imageContent.Headers.ContentType = MediaTypeHeaderValue.Parse(fileModel.File.ContentType);
            requestContent.Add(imageContent, fileModel.FileName.Split('.')[0].Replace(" ", ""), fileModel.FileName.Replace(" ", ""));
            requestContent.Add(new StringContent(fileModel.FileName.Replace(" ","")), "filename");
            requestContent.Add(new StringContent(fileModel.Id), "id");
            DigestAuthentication.SetupHash1();
            var hash2 = DigestAuthentication.GetHash2(method, uri);
            var response = DigestAuthentication.GetResponse(hash2);
            var client = new HttpClient();
            client.BaseAddress = new Uri(ConfigurationManager.AppSettings["ApiBaseUri"]);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Digest", "username=\"" + DigestAuthentication.Username + "\", realm=\"" + DigestAuthentication.Realm + "\" ,nonce=\"" + DigestAuthentication.Nonce + "\", uri=\"" + uri + "\", cnonce=\"" + DigestAuthentication.CNonce + "\", nc=" + DigestAuthentication.NonceCount + ", response=\"" + response + "\", qop=\"" + DigestAuthentication.QoP + "\"");
            var data = await client.PostAsync(uri, requestContent);
            data.EnsureSuccessStatusCode();
            var dataBody = await data.Content.ReadAsStringAsync();
            return dataBody;
        }
    }

    public class ChooseImageFormat
    {
        public static ImageFormat GetImageFormat(string format)
        {
            ImageFormat ret = null;

            if (format.ToLower() == "jpeg" || format.ToLower() == "jpg")
            {
                ret =  ImageFormat.Jpeg; 
            }

            if (format.ToLower() == "png")
            {
                ret = ImageFormat.Png;
            }

            if (format.ToLower() == "gif")
            {
                ret = ImageFormat.Gif;
            }

            return ret;
        }
    }
}