using CaseAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private DatabaseContext dbContext;

        public ReservationController(DatabaseContext dbContect)
        {
            this.dbContext = dbContect;
        }

        [HttpGet("Get")]
        public IActionResult GetAll()
        {
            try
            {
                var reservations = dbContext.Reservation;
                if (reservations is null)
                {
                    return NotFound("No reservations were found");
                }
                return Ok(reservations);
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An error has occurred");
            }
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] Reservation request)
        {
            Reservation reservation = new Reservation();
            reservation.ReservationDate = request.ReservationDate;
            reservation.TimeOfDay = request.TimeOfDay;
            reservation.ReservationStatus = request.ReservationStatus;
            reservation.UsersId = request.UsersId;
            reservation.SeatId = request.SeatId;

            try
            {
                dbContext.Reservation.Add(reservation);
                dbContext.SaveChanges();
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An error has occurred");
            }

            var reservationDb = dbContext.Reservation;
            return Ok(reservationDb);
        }

        [HttpPut("Update")]
        public IActionResult Update([FromBody] Reservation request)
        {
            try
            {
                var reservation = dbContext.Reservation.Find(request.Id);
                if (reservation is null)
                {
                    return StatusCode(404, "User not found");
                }
                reservation.ReservationDate = request.ReservationDate;
                reservation.TimeOfDay = request.TimeOfDay;
                reservation.ReservationStatus = request.ReservationStatus;
                reservation.UsersId = request.UsersId;
                reservation.SeatId = request.SeatId;

                dbContext.Entry(reservation).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An error has occurred");
            }

            var reservationDb = dbContext.Reservation;
            return Ok(reservationDb);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                var reservation = dbContext.Reservation.Find(id);
                if (reservation is null)
                {
                    return StatusCode(404, "Reservation not found");
                }

                dbContext.Entry(reservation).State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An error has occurred");
            }

            var reservationDb = dbContext.Reservation;
            return Ok(reservationDb);
        }
    }
}
