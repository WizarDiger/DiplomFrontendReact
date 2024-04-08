using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;
using Npgsql;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Cors;
using DiplomBackendASPNet.Helpers;
using DiplomBackendASPNet.Hubs;
using Microsoft.AspNetCore.SignalR;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var hostName = "https://localhost:3000/";
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowed(hostName => true));
});

builder.Services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

builder.Services.AddScoped<JwtService>();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseNpgsql("Server=localhost;Database=postgres;Port=5432;Ssl Mode=allow;User Id=postgres;Password="));
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 0;
    options.Password.RequireNonAlphanumeric = false;
    
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
builder.Services.ConfigureApplicationCookie(options =>
{

    options.Cookie.HttpOnly = false;

});
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options=>options.AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowed(hostName => true));

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Photos")),
    RequestPath = "/PhotosTESTTEST"
});

app.UseRouting();
app.UseEndpoints(endpoints => endpoints.MapHub<ChatHub>("/hubs/chat"));

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();



//public static void ConfigureIdentity(WebApplicationBuilder builder)
//{
//    builder.Services.AddIdentity<User, IdentityRole>(options =>
//   {
//       options.Password.RequireDigit = false;
//       options.Password.RequireLowercase = false;
//       options.Password.RequireUppercase = false;
//       options.Password.RequiredLength = 0;
//       options.Password.RequireNonAlphanumeric = false;
//   })
//        .AddEntityFrameworkStores<AppDbContext>()
//        .AddDefaultTokenProviders();
//}