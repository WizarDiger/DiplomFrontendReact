using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DiplomBackendASPNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignOutController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;


        public SignOutController(IConfiguration configuration, IWebHostEnvironment env, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _configuration = configuration;
            _env = env;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        public async Task<JsonResult> POST(User user)
        {
            if (ModelState.IsValid)
            {
                 Response.Cookies.Delete("jwt");
                 await signInManager.SignOutAsync();
               
            }
            return new JsonResult(1);
        }
    }
}
