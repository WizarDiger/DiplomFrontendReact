using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

namespace DiplomBackendASPNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeleteFromAllFriendListsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;


        public DeleteFromAllFriendListsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;

        }

        [HttpDelete]
        public JsonResult Delete(FriendRequest friendRequest)
        {
            string query = $@"DELETE FROM ""Friends"" WHERE host='{friendRequest.Host}' OR friend='{friendRequest.Host}'";
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
