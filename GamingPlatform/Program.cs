using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
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
builder.Services.AddOptions<ApexLegends>().Bind(builder.Configuration.GetSection(ApexLegends.ConfigName));
builder.Services.AddOptions<Dota2>().Bind(builder.Configuration.GetSection(Dota2.ConfigName));
builder.Services.AddOptions<CounterStrikeGo>().Bind(builder.Configuration.GetSection(CounterStrikeGo.ConfigName));
builder.Services.AddOptions<Hearthstone>().Bind(builder.Configuration.GetSection(Hearthstone.ConfigName));
builder.Services.AddOptions<LeagueOfLegends>().Bind(builder.Configuration.GetSection(LeagueOfLegends.ConfigName));
builder.Services.AddOptions<Overwatch>().Bind(builder.Configuration.GetSection(Overwatch.ConfigName));
builder.Services.AddOptions<Pubg>().Bind(builder.Configuration.GetSection(Pubg.ConfigName));
builder.Services.AddOptions<RocketLeague>().Bind(builder.Configuration.GetSection(RocketLeague.ConfigName));
builder.Services.AddOptions<Valorant>().Bind(builder.Configuration.GetSection(Valorant.ConfigName));

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