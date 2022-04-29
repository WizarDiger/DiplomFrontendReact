using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

namespace DiplomBackendASPNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        
        public LoginController(IConfiguration configuration, IWebHostEnvironment env, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _configuration = configuration;
            _env = env;
            this.userManager = userManager;
            this.signInManager = signInManager;
           
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"SELECT Id AS ""userId"",""Login"" AS ""Login"",""Password"" AS ""password"",""Name"" AS ""name"",""Email"" AS ""email"",""DateOfBirth"" AS ""DateOfBirth"",""City"" AS ""city"" FROM ""AspNetUsers""";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            
            return new JsonResult(table);
        }
     

        [HttpPost]
        public async Task<JsonResult> POST(User user)
        {         
            if (ModelState.IsValid)
            {
                var user_identity = new User
                {
                    Login = user.Login,
                    UserName = user.Name,
                    Surname = user.Surname,
                    Patronymic = user.Patronymic,
                    Name = user.Name,
                    Email = user.Email,
                    DateOfBirth = user.DateOfBirth,
                    City = user.City
                };
                Console.WriteLine(user_identity.ToString());
                var result = await userManager.CreateAsync(user_identity, user.Password);
                if (result.Succeeded)
                {
                    
                    await signInManager.SignInAsync(user_identity, isPersistent: false);

                }
                string errors = "";
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                    errors += error.Description;
                }
                if (errors == "")
                    return new JsonResult(1);
                else return new JsonResult(errors);
              
            }
            return new JsonResult("RegisterFailed");
        }

        [HttpPut]
        public JsonResult Put(User user)
        {
            string query = @"update Пользователь
	        set 
	        login = @login,
	        password = @password,
	        name = @name,
	        mail = @mail,
	        birthday = @birthday,
            city = @city,
            roleid = @roleid
            where id = @id;";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", user.Id);
                    myCommand.Parameters.AddWithValue("@login", user.Login);
                    myCommand.Parameters.AddWithValue("@password", user.Password);
                    myCommand.Parameters.AddWithValue("@name", user.Name + user.Surname + user.Patronymic);
                    myCommand.Parameters.AddWithValue("@mail", user.Email);
                    myCommand.Parameters.AddWithValue("@birthday", user.DateOfBirth);
                    myCommand.Parameters.AddWithValue("@city", user.City);
                  
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Updated Succesfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from Пользователь
	        where id = @id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);                  
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Deleted Succesfully");
        }

        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
