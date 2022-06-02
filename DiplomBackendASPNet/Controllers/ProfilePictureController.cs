using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

namespace DiplomBackendASPNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilePictureController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
      

        public ProfilePictureController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
           
        }
        [HttpGet]
        public JsonResult GetMessages()
        {
            string query = $@"SELECT * FROM ""ProfilePictures""";
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
        public JsonResult SaveMessage(ProfilePicture profilePicture)
        {
            string query = $@"INSERT INTO ""ProfilePictures"" (picture, senderid)
               VALUES(@picture,@senderid)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@picture", profilePicture.Picture);              
                    myCommand.Parameters.AddWithValue("@senderid", profilePicture.SenderId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult(table);
        }
        [HttpPut]
        public JsonResult Put(ProfilePicture profilePicture)
        {
            string query = @"update ""ProfilePictures""
	        set 
	        picture = @picture
            where senderid = @senderid;";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@picture", profilePicture.Picture);
                    myCommand.Parameters.AddWithValue("@senderid", profilePicture.SenderId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Updated Succesfully");
        }
    }
}
