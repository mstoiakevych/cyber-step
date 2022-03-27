using System.Security.Claims;
using Domain.Common;
using Domain.Tournaments;

namespace Domain.Abstractions;

public interface IPlayerService
{
    Task<Player?> JoinMatch(long matchId, ClaimsPrincipal claimsPrincipal);
    Task<HubClient> ConnectPlayer(long matchId, long playerId, ClaimsPrincipal claimsPrincipal, string connectionId);
    Task<BotClient> ConnectBot(long matchId, string connectionId);
    Task<Player?> GetPlayerFromHubClient(HubClient hubClient);
    Task<Player?> GetPlayerByHubClientConnectionId(string connectionId);
}