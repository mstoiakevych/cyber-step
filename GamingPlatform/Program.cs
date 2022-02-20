using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Shared.Boosting;
using Shared.Boosting.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseInMemoryDatabase("InMemory");
    // options.UseNpgsql(configuration.GetConnectionString("GamingPlatform"));
});

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

var app = builder.Build();

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
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();