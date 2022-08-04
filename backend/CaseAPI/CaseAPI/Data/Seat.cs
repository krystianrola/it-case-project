using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CaseAPI.Data
{
    public class Seat
    {
        [Key]
        public int Id { get; set; }
        [Column("Workplace_id")]
        public int? WorkplaceId { get; set; }
        [StringLength(35)]
        public string Name { get; set; }
        [Required]
        [StringLength(10)]
        public string AvailabilityStatus { get; set; }
        public byte? CoordinateX { get; set; }
        public byte? CoordinateY { get; set; }
    }
}
