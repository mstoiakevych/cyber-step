using Domain.Common;
using Domain.Tournaments;
using Infrastructure.Abstractions;
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
}

public partial class MatchManagementHub : Hub<IMatchClientHub>
{
    private readonly BotOptions _botOptions;
    private readonly IRepository<Match> _matchRepository;
    private readonly IPlayerService _playerService;

    public MatchManagementHub(IOptions<BotOptions> botOptions, IRepository<Match> matchRepository,
        IPlayerService playerService)
    {
        _matchRepository = matchRepository;
        _playerService = playerService;
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
            await Clients.Client(Context.ConnectionId).Error($"Can not find match by this id: {matchId}");
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
}