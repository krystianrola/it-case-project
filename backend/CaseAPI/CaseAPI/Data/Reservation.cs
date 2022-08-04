using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CaseAPI.Data
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "date")]
        public DateTime ReservationDate { get; set; }
        [Required]
        [StringLength(25)]
        public string TimeOfDay { get; set; }
        [Required]
        [StringLength(25)]
        public string ReservationStatus { get; set; }
        [Column("Users_id")]
        public int UsersId { get; set; }
        [Column("Seat_id")]
        public int SeatId { get; set; }
    }
}
