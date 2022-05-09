using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DiplomBackendASPNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
   

        public SearchController(IConfiguration configuration, IWebHostEnvironment env, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _configuration = configuration;
            _env = env;
            this.userManager = userManager;
            this.signInManager = signInManager;
      
        }
        [HttpGet]
        public async Task<JsonResult> Get()
        {

            try
            {
                var allUsers = userManager.Users;
                return new JsonResult(allUsers);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

    }
}
