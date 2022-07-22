using AspNet.Security.OpenId.Steam;
using Domain.Identity;
using GamingPlatform;
using GamingPlatform.Hubs;
using GamingPlatform.Middleware;
using Infrastructure;
using Infrastructure.Abstractions;
using Infrastructure.Data;
using Infrastructure.Mappings;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
    build =>
    {
        build.AllowAnyMethod()
            .AllowAnyHeader()
            .AllowAnyOrigin();
    }));

builder.Services.AddSignalR(options =>
{
    options.MaximumReceiveMessageSize = 102400000;
});

builder.Services.AddDbContext<DataContext>(options =>
{
    // options.UseInMemoryDatabase("InMemory");
    options.UseNpgsql(builder.Configuration.GetConnectionString("GamingPlatform"));
});
builder.Services.AddOptions<BotOptions>().Bind(builder.Configuration.GetSection("BotOptions"));

#region Configure Authentication

builder.Services.AddIdentity<SteamUser, IdentityRole>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = SteamAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie(options =>
    {
        options.LoginPath = "/login";
        options.LogoutPath = "/signout";
    })
    .AddSteam();

builder.Services.AddTransient<IClaimsTransformation, SteamUserClaimsTransformation>();

#endregion

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<ISteamApiService, SteamApiService>();

builder.Services.AddInfrastructure();

builder.Services.AddAutoMapper(typeof(MatchMappingProfile));

builder.Services.AddTransient<ExceptionHandlingMiddleware>();

var app = builder.Build();

app.UseRouting();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToFile("index.html");
    endpoints.MapHub<MatchManagementHub>("/hub/match-management");
});

app.Run();
