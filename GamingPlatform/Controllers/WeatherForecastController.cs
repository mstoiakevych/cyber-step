using System.Security.Claims;
using System.Text.Json;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Shared.Boosting;
using Shared.Boosting.Entities;

namespace GamingPlatform.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IOptions<ApexLegendsGameOptions> options, IOptions<Dota2GameOptions> dotaOptions, GameOptionsProvider _gameOptionsProvider)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<WeatherForecast[]> Get()
    {
        foreach (var userClaim in User.Claims)
        {
            Console.WriteLine($"Weather forecast:    {userClaim.Type} - {userClaim.Value}");
        }
        
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
    }
}