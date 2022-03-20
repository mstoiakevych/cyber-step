using AspNet.Security.OpenId.Steam;
using Domain.Abstractions;
using Domain.Identity;
using GamingPlatform;
using GamingPlatform.Hubs;
using Infrastructure;
using Infrastructure.Abstractions;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddSignalR();

builder.Services.AddDbContext<DataContext>(options =>
{
    // options.UseInMemoryDatabase("InMemory");
    options.UseNpgsql(builder.Configuration.GetConnectionString("GamingPlatform"));
});
builder.Services.AddOptions<BotOptions>().Bind(builder.Configuration.GetSection("BotOptions"));
builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();

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