using CaseAPI.Data;
using CaseAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CaseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private DatabaseContext dbContext;
        
        public UserController(DatabaseContext dbContect)
        {
            this.dbContext = dbContect;
        }

        [HttpGet("Get")]
        public IActionResult GetAll()
        {
            try
            {
                var users = dbContext.Users;
                if (users is null)
                {
                    return NotFound("No user was found");
                }
                return Ok(users);
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An error has occurred");
            }
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] User request)
        {
            Users users = new Users();
            users.UserName = request.UserName;
            users.FirstName = request.FirstName;
            users.LastName = request.LastName;
            users.IsAdmin = request.IsAdmin;
            users.Email = request.Email;
            users.LanguageUse = request.LanguageUse;
            users.HasAssingedSeat = request.HasAssingedSeat;

            try
            {
                dbContext.Users.Add(users);
                dbContext.SaveChanges();
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An error has occurred");
            }

            var usersDb = dbContext.Users;
            return Ok(usersDb);
        }

        [HttpPut("Update")]
        public IActionResult Update([FromBody] User request)
        {
            try
            {
                var user = dbContext.Users.Find(request.Id);
                if (user is null)
                {
                    return StatusCode(404, "User not found");
                }
                user.UserName = request.UserName;
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.IsAdmin = request.IsAdmin;
                user.Email = request.Email;
                user.LanguageUse = request.LanguageUse;
                user.HasAssingedSeat = request.HasAssingedSeat;

                dbContext.Entry(user).State = EntityState.Modified;
                dbContext.SaveChanges();
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An error has occurred");
            }

            var users = dbContext.Users;
            return Ok(users);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete([FromRoute]int id)
        {
            try
            {
                var user = dbContext.Users.Find(id);
                if (user is null)
                {
                    return StatusCode(404, "User not found");
                }

                dbContext.Entry(user).State = EntityState.Deleted;
                dbContext.SaveChanges();
            }
            catch (System.Exception)
            {
                return StatusCode(500, "An error has occurred");
            }

            var users = dbContext.Users;
            return Ok(users);
        }
    }
}
