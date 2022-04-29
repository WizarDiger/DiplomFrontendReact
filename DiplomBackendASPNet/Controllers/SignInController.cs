using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DiplomBackendASPNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignInController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;


        public SignInController(IConfiguration configuration, IWebHostEnvironment env, UserManager<User> userManager, SignInManager<User> signInManager)
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

                var result = await signInManager.PasswordSignInAsync(user.Login, user.Password, isPersistent: false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return new JsonResult(1);
                }


                ModelState.AddModelError("", "Invalid Login Attempt");

            }
            return new JsonResult("LoginFailed");
        }
    }
}
