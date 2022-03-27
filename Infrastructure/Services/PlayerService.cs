using System.Security.Claims;
using Domain.Abstractions;
using Domain.Common;
using Domain.Identity;
using Domain.Tournaments;
using Infrastructure.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services;

public class PlayerService : IPlayerService
{
    private readonly IRepository<Match> _matchRepository;
    private readonly IRepository<Player> _playerRepository;
    private readonly IRepository<BotClient> _botRepository;
    private readonly IRepository<HubClient> _hubClientsRepository;
    private readonly UserManager<SteamUser> _userManager;

    public PlayerService(
        IRepository<Match> matchRepository, 
        IRepository<Player> playerRepository, 
        UserManager<SteamUser> userManager, 
        IRepository<BotClient> botRepository, 
        IRepository<HubClient> hubClientsRepository)
    {
        _matchRepository = matchRepository;
        _playerRepository = playerRepository;
        _userManager = userManager;
        _botRepository = botRepository;
        _hubClientsRepository = hubClientsRepository;
    }

    public async Task<Player?> JoinMatch(long matchId, ClaimsPrincipal claimsPrincipal)
    {
        var match = await _matchRepository.GetByKeyAsync(matchId);

        if (match == null)
            return null;

        var user = await _userManager.GetUserAsync(claimsPrincipal);

        if (user == null)
            return null;

        var player = new Player
        {
            UserId = user.Id,
            Matches = new List<Match> {match}
        };

        player = await _playerRepository.InsertAsync(player);

        return player;
    }

    public async Task<HubClient> ConnectPlayer(long matchId, long playerId, ClaimsPrincipal claimsPrincipal, string connectionId)
    {
        var match = await _matchRepository.GetByKeyAsync(matchId);
        if (match == null) return null; // todo throw connection close exception (invalid match id)
        
        var user = await _userManager.GetUserAsync(claimsPrincipal);
        if (user == null) return null; // todo todo throw connection close exception (not authenticated)

        var player = await _playerRepository.GetByKeyAsync(playerId);
        if (player == null) return null; // todo throw connection close exception (player must join the game first)

        if (user.Id != player.UserId) return null; // todo throw connection close exception (invalid player id)
        
        var hubClient = new HubClient(connectionId, player.Id, match.Id);

        return await _hubClientsRepository.InsertAsync(hubClient);

    }

    public async Task<BotClient> ConnectBot(long matchId, string connectionId)
    {
        var match = await _matchRepository.GetByKeyAsync(matchId);

        if (match == null) return null; // todo throw connection close exception (invalid match id)

        // todo maybe check for existing bot in the match???
        
        var botClient = new BotClient
        {
            ConnectionId = connectionId,
            MatchId = match.Id
        };

        return await _botRepository.InsertAsync(botClient);
    }

    public async Task<Player?> GetPlayerFromHubClient(HubClient hubClient)
    {
        return await _playerRepository.GetByKeyAsync(hubClient.PlayerId);
    }
    
    public async Task<Player?> GetPlayerByHubClientConnectionId(string connectionId)
    {
        var hubClient = await _hubClientsRepository.GetByKeyAsync(connectionId);

        if (hubClient == null) return null;

        return await _playerRepository.GetByKeyAsync(hubClient.PlayerId);
    }
}