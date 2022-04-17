using Domain.Common;
using Domain.Tournaments;
using Infrastructure.Abstractions;
using Infrastructure.DTO.Match;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace GamingPlatform.Hubs;

public interface IMatchClientHub
{
    Task Error(string message);
    Task ShowErrorMessage(string message);
    Task UpGame(long gameId);
    Task InviteInLobby(IEnumerable<string> players, long matchId);
    Task ShowModalWithMessage(string message);
    Task EditCustomMatch(string args, long matchId);
    Task ShowModalWithTimer(string message);
    Task StartGame(string? arg);
    Task ShowMatchResult(Team winner);
    Task OnMatchJoin(IEnumerable<PlayerInMatch> players);
}

public partial class MatchManagementHub : Hub<IMatchClientHub>
{
    private readonly BotOptions _botOptions;
    private readonly IRepository<Match> _matchRepository;
    private readonly IRepository<Player> _playerRepository;
    private readonly IPlayerService _playerService;

    public MatchManagementHub(IOptions<BotOptions> botOptions, IRepository<Match> matchRepository,
        IPlayerService playerService, IRepository<Player> playerRepository)
    {
        _matchRepository = matchRepository;
        _playerService = playerService;
        _playerRepository = playerRepository;
        _botOptions = botOptions.Value;
    }

    public string GetConnectionId()
    {
        return Context.ConnectionId;
    }

    public async Task CreateGame(long matchId, long playerId)
    {
        var client = new HttpClient();
        var response = await client.GetAsync($"{_botOptions.ServerUrl}/create");
        if (!response.IsSuccessStatusCode)
        {
            await Clients.Client(Context.ConnectionId).Error("Server error");
            return;
        }

        var botConnectionId = response.Content.ReadAsStringAsync().Result;
        await _playerService.ConnectBot(matchId, botConnectionId);
        await _playerService.ConnectPlayer(matchId, playerId, Context.User, Context.ConnectionId);
        await Clients.Client(botConnectionId).UpGame(matchId);
    }

    public async Task InvitePlayers(long matchId)
    {
        var match = await _matchRepository.Query
            .Include(x => x.Bot)
            .Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.Id == matchId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("Can not find this match");
            return;
        }

        if (match.Bot.Status != BotState.Online)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not online");
            return;
        }

        if (match.Players?.Count > 0)
        {
            var players = match.Players.Select(x => x.UserId);
            await Clients.Client(match.BotId).InviteInLobby(players, matchId);
            await Clients.Clients(players).ShowModalWithMessage("Waiting when all players accept invite");
        }
    }

    public async Task Join(long matchId, long playerId)
    {
        var match = await _matchRepository.Query.Include(x => x.Players).FirstOrDefaultAsync(x => x.Id == matchId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("You can't join this match");
            return;
        }

        var player = await _playerRepository.GetByKeyAsync(playerId);

        if (player == null)
        {
            await Clients.Client(Context.ConnectionId).Error("You can't join this match");
            return;   
        }

        if (match.Players.Any(x => x.Id == playerId))
        {
            await Clients.Client(Context.ConnectionId).Error("You are already in this match");
            return;
        }

        await _playerService.ConnectPlayer(matchId, playerId, Context.User, Context.ConnectionId);

        var matchPlayers = match.Players.Select(x => 
            new PlayerInMatch
            {
                Username = x.User.UserName,
                Avatar = x.User.AvatarFull,
                Team = x.Team,
            });

        await Clients.Caller.OnMatchJoin(matchPlayers);
    }
}