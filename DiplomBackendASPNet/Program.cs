var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

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