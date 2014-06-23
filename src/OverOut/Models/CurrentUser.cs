
namespace OverOut.Models
{
    public class CurrentUser
    {
        public string Id { get; set; }
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string UserType { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string EmailAddress { get; set; }
        public string RedirectTo { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}