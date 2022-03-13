using System.Net.Http.Json;
using Infrastructure.Abstractions;
using Infrastructure.DTO.SteamAPI;

namespace Infrastructure.Services;

public class SteamApiService : ISteamApiService
{
    private readonly HttpClient _httpClient;

    public SteamApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;

        _httpClient.BaseAddress = new Uri("https://api.steampowered.com/");
    }

    public async Task<PlayerSummary?> GetPlayerSummary(string id)
    {
        var response = await _httpClient.GetAsync(
            $"ISteamUser/GetPlayerSummaries/v0002/?key=72E77EA5B03193881236153FFBEBED2A&steamids={id}");

        var content = await response.Content.ReadFromJsonAsync<PlayerSummaryResponseContent>();

        return content?.Response.Players.FirstOrDefault();
    }
}