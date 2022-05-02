using System.Security.Claims;
using Domain.Common;
using Domain.Identity;
using Domain.Tournaments;

namespace Infrastructure.Abstractions;

public interface IPlayerService
{
    Task<Player?> JoinMatch(long matchId, ClaimsPrincipal claimsPrincipal);
    Task<HubClient> ConnectPlayer(long matchId, long playerId, ClaimsPrincipal claimsPrincipal, string connectionId);
    Task<BotClient> ConnectBot(long matchId, string connectionId);
    Task<Player?> GetPlayerFromHubClient(HubClient hubClient);
    Task<Player?> GetPlayerByHubClientConnectionId(string connectionId);
    Task<HubClient?> GetHubClientFromPlayerId(long playerId);
    Task<bool> LeaveMatch(long playerId);
    Task<bool> LeaveMatch(string connectionId);
    Task<bool> IsUserInAnyMatch(ClaimsPrincipal claimsPrincipal);
    Task<bool> IsUserInAnyMatch(SteamUser user);
}