using DiplomBackendASPNet.Helpers;
using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System;
using System.Data;
using System.Threading.Tasks;

namespace DiplomBackendASPNet.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class NeuralNetworkController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly IWebHostEnvironment _env;

		private readonly UserManager<User> userManager;
		private readonly SignInManager<User> signInManager;
		private readonly JwtService jwtService;
		private readonly RoleManager<IdentityRole> roleManager;

		public NeuralNetworkController(IConfiguration configuration, IWebHostEnvironment env, UserManager<User> userManager, SignInManager<User> signInManager, JwtService jwtService, RoleManager<IdentityRole> roleManager)
		{
			_configuration = configuration;
			_env = env;
			this.userManager = userManager;
			this.signInManager = signInManager;
			this.jwtService = jwtService;
			this.roleManager = roleManager;
		}

		[HttpGet]
		public async Task<JsonResult> Get()
		{
			string query = $@"SELECT * FROM ""MoodRecords""";
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
		public async Task<JsonResult> CheckIfAdmin(User user)
		{

			var currentUser = await userManager.FindByNameAsync(user.UserName);
			var roleresult = await userManager.IsInRoleAsync(currentUser, "Admin");
			//var roleresult = await userManager.AddToRoleAsync(currentUser, "Admin");
			return new JsonResult(roleresult);
		}


	}
}
