using DiplomBackendASPNet.Helpers;
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
        private readonly JwtService jwtService;

        public SignInController(IConfiguration configuration, IWebHostEnvironment env, UserManager<User> userManager, SignInManager<User> signInManager, JwtService jwtService)
        {
            _configuration = configuration;
            _env = env;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.jwtService = jwtService;
        }

        [HttpPost]
        public async Task<JsonResult> POST(User user)
        {
            if (ModelState.IsValid)
            {
                if (userManager.Users.FirstOrDefault(u => u.Login == user.Login) == null)
                {
                    return new JsonResult("1!Неверный логин и/или пароль");
                }

                    

                var result = await signInManager.PasswordSignInAsync(user.Login, user.Password, isPersistent: false, lockoutOnFailure: false);
                
                if (result.Succeeded)
                {

                var jwt = jwtService.Generate(userManager.Users.FirstOrDefault(u => u.Login == user.Login).Id);
                Response.Cookies.Append("jwt", jwt, new CookieOptions { HttpOnly = false });
                    return new JsonResult(1);
                }


                ModelState.AddModelError("", "Invalid Login Attempt");

            }
            return new JsonResult("LoginFailed");
        }
    }
}
