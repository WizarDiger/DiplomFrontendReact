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
    public class RolesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly JwtService jwtService;
        private readonly RoleManager<IdentityRole> roleManager;

        public RolesController(IConfiguration configuration, IWebHostEnvironment env, UserManager<User> userManager, SignInManager<User> signInManager, JwtService jwtService, RoleManager<IdentityRole> roleManager)
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
            try
            {
                var administrator = new IdentityRole();
                administrator.Name = "admin";
                await roleManager.CreateAsync(administrator);
                var moderator = new IdentityRole();
                moderator.Name = "moderator";
                await roleManager.CreateAsync(moderator);
                return new JsonResult(roleManager.Roles);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }
        [HttpPost]
        public async Task<JsonResult> Register(User user)
        {
           
            var currentUser = await userManager.FindByNameAsync(user.UserName);
            var roleresult = await userManager.IsInRoleAsync(currentUser, "Admin");
            //var roleresult = await userManager.AddToRoleAsync(currentUser, "Admin");
            return new JsonResult(roleresult);
        }

       
    }
}
