using DiplomBackendASPNet.Helpers;
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
    public class AddToRoleController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly JwtService jwtService;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public AddToRoleController(IConfiguration configuration, IWebHostEnvironment env, UserManager<User> userManager, SignInManager<User> signInManager, JwtService jwtService, RoleManager<IdentityRole> roleManager)
        {
            _configuration = configuration;
            _env = env;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.jwtService = jwtService;
            this.roleManager = roleManager;
        }

        
        [HttpGet]
        public JsonResult GetModerators()
        {
            string query = $@"SELECT * FROM ""AspNetUserRoles"" WHERE ""RoleId""='372292a0-6835-482e-9c80-f945af6bdcfd'";
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
        public async Task<JsonResult> AddToRole(AddToRoleRequest addToRoleRequest)
        {

            var currentUser = await userManager.FindByNameAsync(addToRoleRequest.UserName);
            //var roleresult = await userManager.IsInRoleAsync(currentUser, addToRoleRequest.Role);
            var roleresult = await userManager.AddToRoleAsync(currentUser, addToRoleRequest.Role);
            return new JsonResult(roleresult);
        }

        [HttpDelete("{Id}")]
        public JsonResult Delete(string Id)
        {
            string query = @"delete from ""AspNetUserRoles""
	        where ""UserId"" = @Id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", Id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Deleted Succesfully");
        }

    }
}

