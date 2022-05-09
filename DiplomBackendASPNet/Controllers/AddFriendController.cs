using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

namespace DiplomBackendASPNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddFriendController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
 

        public AddFriendController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;      

        }
        [HttpPost]
        public JsonResult AddFriend(FriendRequest friendRequest)
        {
            string query = $@"INSERT INTO ""Friends""(host,friend) VALUES(@host,@friend);";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {                  
                    myCommand.Parameters.AddWithValue("@host", friendRequest.Host);
                    myCommand.Parameters.AddWithValue("@friend", friendRequest.Friend);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(1);
        }

        [HttpDelete]
        public JsonResult Delete(FriendRequest friendRequest)
        {
            string query = $@"DELETE FROM ""Friends"" WHERE host='{friendRequest.Host}'AND friend ='{friendRequest.Friend}'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SocialNetworkCon");
            NpgsqlDataReader myReader;
            var result = "";
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {

                    myReader = myCommand.ExecuteReader();
                    result = myReader.Rows.ToString();
                    myReader.Close();
                    myCon.Close();

                }
            }
           
                return new JsonResult(result);
        }
    }
}
