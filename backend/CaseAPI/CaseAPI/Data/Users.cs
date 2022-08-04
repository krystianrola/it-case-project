using System.ComponentModel.DataAnnotations;

namespace CaseAPI.Data
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(45)]
        public string UserName { get; set; }
        [StringLength(45)]
        public string FirstName { get; set; }
        [StringLength(45)]
        public string LastName { get; set; }
        public bool IsAdmin { get; set; }
        [Required]
        [StringLength(45)]
        public string Email { get; set; }
        [StringLength(45)]
        public string LanguageUse { get; set; }
        public bool HasAssingedSeat { get; set; }
    }
}
