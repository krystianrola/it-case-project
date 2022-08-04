namespace CaseAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsAdmin { get; set; }
        public string Email { get; set; }
        public string LanguageUse { get; set; }
        public bool HasAssingedSeat { get; set; }
    }
}
