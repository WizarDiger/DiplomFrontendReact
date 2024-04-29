using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;

namespace DiplomBackendASPNet.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MoodRecordController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly IWebHostEnvironment _env;


		public MoodRecordController(IConfiguration configuration, IWebHostEnvironment env)
		{
			_configuration = configuration;
			_env = env;
		}


		[HttpPost]
		public JsonResult GetMoodRecords(MoodRecord moodRecord)
		{
			string query = $@"SELECT * FROM ""MoodRecords"" WHERE ""keyword"" = @keyword";
			DataTable table = new DataTable();
			string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
			NpgsqlDataReader myReader;
			using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
			{
				myCon.Open();
				using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
				{
					myCommand.Parameters.AddWithValue("@keyword", moodRecord.keyword);
					myReader = myCommand.ExecuteReader();
					table.Load(myReader);
					myReader.Close();
					myCon.Close();

				}
			}

			return new JsonResult(table);
		}
	}
}
