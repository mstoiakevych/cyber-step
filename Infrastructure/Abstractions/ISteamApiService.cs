using Infrastructure.DTO.SteamAPI;

namespace Infrastructure.Abstractions;

public interface ISteamApiService
{
    public Task<PlayerSummary?> GetPlayerSummary(string id);
}