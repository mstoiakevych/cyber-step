using System.Security.Claims;
using Domain.Common;
using Domain.Exceptions;
using Domain.Identity;
using Domain.Tournaments;
using Infrastructure.Abstractions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class PlayerService : IPlayerService
{
    private readonly IRepository<Match> _matchRepository;
    private readonly IRepository<Player> _playerRepository;
    private readonly IRepository<BotClient> _botRepository;
    private readonly IRepository<HubClient> _hubClientsRepository;
    private readonly UserManager<SteamUser> _userManager;

    public PlayerService(IRepository<Match> matchRepository, IRepository<Player> playerRepository,
        UserManager<SteamUser> userManager, IRepository<BotClient> botRepository,
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
        var match = await _matchRepository.Query.Include(x => x.Players!).ThenInclude(x => x.User)
            .FirstOrDefaultAsync(x => x.Id == matchId);

        if (match == null)
            throw new CSNotAcceptableException("This match has been finished.");

        var user = await _userManager.GetUserAsync(claimsPrincipal);

        if (user == null)
        {
            if (!match.Players!.Any())
                _matchRepository.Delete(match);

            throw new CSNotAuthenticatedException("You must authenticate first!");
        }

        var existingPlayer = match.Players!.FirstOrDefault(x => x.UserId == user.Id);
        if (existingPlayer != null)
            return existingPlayer;

        // If Player is already in some match
        var inAnotherMatch = await IsUserInAnyMatch(user);

        if (inAnotherMatch)
            throw new CSNotAcceptableException(
                "You are already in some match. You must finish it first in order to join a new one.");

        var player = new Player
        {
            UserId = user.Id,
            MatchId = matchId,
            Team = match.Players!.Count == 0 ? Team.Dire : Team.Radiant
        };

        player = await _playerRepository.InsertAsync(player);

        return player;
    }

    public async Task<HubClient> ConnectPlayer(long matchId, long playerId, ClaimsPrincipal claimsPrincipal,
        string connectionId)
    {
        var match = await _matchRepository.GetByKeyAsync(matchId);
        if (match == null) throw new CSConnectionClosedException("Can't establish a connection with this match");

        var user = await _userManager.GetUserAsync(claimsPrincipal);
        if (user == null)
            throw new CSNotAuthenticatedException("You must be authenticated in order to join this match");

        var player = await _playerRepository.GetByKeyAsync(playerId);
        if (player == null) throw new CSConnectionClosedException("Can't establish a connection with this match");

        if (user.Id != player.UserId)
            throw new CSConnectionClosedException("Can't establish a connection with this match");

        var hubClient = new HubClient(connectionId, player.Id, match.Id);

        return await _hubClientsRepository.InsertAsync(hubClient);
    }

    public async Task<BotClient> ConnectBot(long matchId, string connectionId)
    {
        var match = await _matchRepository.GetByKeyAsync(matchId);

        if (match == null) throw new CSConnectionClosedException("Can't establish a bot connection with this match");

        var botClient = new BotClient
        {
            ConnectionId = connectionId,
            MatchId = match.Id
        };

        match.BotId = botClient.ConnectionId;
        match.Bot = botClient;

        _matchRepository.Update(match);

        return botClient;
    }

    public async Task<Player?> GetPlayerFromHubClient(HubClient hubClient)
    {
        return await _playerRepository.GetByKeyAsync(hubClient.PlayerId);
    }

    public async Task<Player?> GetPlayerByHubClientConnectionId(string connectionId)
    {
        var hubClient = await _hubClientsRepository.Query.Include(x => x.Player).ThenInclude(x => x.User)
            .FirstOrDefaultAsync(x => x.ConnectionId == connectionId);

        if (hubClient == null) return null;

        return await _playerRepository.GetByKeyAsync(hubClient.PlayerId);
    }

    public async Task<HubClient?> GetHubClientFromPlayerId(long playerId)
    {
        return await _hubClientsRepository.Query.FirstOrDefaultAsync(x => x.PlayerId == playerId);
    }

    public async Task<bool> LeaveMatch(long playerId)
    {
        var player = await _playerRepository.GetByKeyAsync(playerId);

        if (player == null)
            return false;

        _playerRepository.Delete(player);

        return true;
    }

    public async Task<bool> LeaveMatch(string connectionId)
    {
        var player = await GetPlayerByHubClientConnectionId(connectionId);

        if (player == null)
            return false;

        _playerRepository.Delete(player);

        return true;
    }

    public async Task<bool> IsUserInAnyMatch(ClaimsPrincipal claimsPrincipal)
    {
        var user = await _userManager.GetUserAsync(claimsPrincipal);

        if (user == null)
            throw new CSNotAuthenticatedException("You must authenticate first");

        return await IsUserInAnyMatch(user);
    }

    public async Task<bool> IsUserInAnyMatch(SteamUser user)
    {
        return await _hubClientsRepository.Query.Include(x => x.Player).Where(x => x.Player != null)
            .AnyAsync(x => x.Player!.UserId == user.Id);
    }
}