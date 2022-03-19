using AspNet.Security.OpenId.Steam;
using Domain.Identity;
using GamingPlatform.Hubs;
using Infrastructure.Abstractions;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Shared.Boosting;
using Shared.Boosting.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR();

builder.Services.AddDbContext<DataContext>(options =>
{
    // options.UseInMemoryDatabase("InMemory");
    options.UseNpgsql(builder.Configuration.GetConnectionString("GamingPlatform"));
});

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

        options.Events.OnSigningOut = context =>
        {
            Console.WriteLine("Cookie");
            
            return Task.CompletedTask;
        };
    })
    .AddSteam();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Configuration.AddJsonFile("boostingsettings.json", false);
builder.Services.AddOptions<ApexLegendsGameOptions>().Bind(builder.Configuration.GetSection(ApexLegendsGameOptions.ConfigName));
builder.Services.AddOptions<Dota2GameOptions>().Bind(builder.Configuration.GetSection(Dota2GameOptions.ConfigName));
builder.Services.AddOptions<CounterStrikeGoGameOptions>().Bind(builder.Configuration.GetSection(CounterStrikeGoGameOptions.ConfigName));
builder.Services.AddOptions<HearthstoneGameOptions>().Bind(builder.Configuration.GetSection(HearthstoneGameOptions.ConfigName));
builder.Services.AddOptions<LeagueOfLegendsGameOptions>().Bind(builder.Configuration.GetSection(LeagueOfLegendsGameOptions.ConfigName));
builder.Services.AddOptions<OverwatchGameOptions>().Bind(builder.Configuration.GetSection(OverwatchGameOptions.ConfigName));
builder.Services.AddOptions<PubgGameOptions>().Bind(builder.Configuration.GetSection(PubgGameOptions.ConfigName));
builder.Services.AddOptions<RocketLeagueGameOptions>().Bind(builder.Configuration.GetSection(RocketLeagueGameOptions.ConfigName));
builder.Services.AddOptions<ValorantGameOptions>().Bind(builder.Configuration.GetSection(ValorantGameOptions.ConfigName));

builder.Services.AddSingleton<GameOptionsProvider>();

builder.Services.AddTransient<IClaimsTransformation, SteamUserClaimsTransformation>();

builder.Services.AddHttpClient<ISteamApiService, SteamApiService>();

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
// app.MapControllers();
// app.MapFallbackToFile("index.html");

app.Run();