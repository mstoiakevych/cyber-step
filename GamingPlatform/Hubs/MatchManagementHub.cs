using System.Text.Json;
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

public class MatchManagementHub : Hub<IMatchClientHub>
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

    public async Task BotError(string message)
    {
        var match = await _matchRepository.Query
            .Include(x => x.Bot)
            .Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("This bot does not belong to any match");
            return;
        }

        match.Bot.Status = BotState.Error;
        _matchRepository.Update(match);

        var players = match.Players.Select(x => x.UserId);
        await Clients.Clients(players).ShowErrorMessage(message);
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

    public async Task SetBotStatus(BotState botStatus)
    {
        var match = await _matchRepository.Query.Include(x => x.Bot)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("This bot does not belong to any match");
            return;
        }

        match.Bot.Status = botStatus;
        _matchRepository.Update(match);
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

    public async Task EditLobbyConfiguration(long matchId)
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

        if (match.Bot.Status != BotState.InLobby)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not in lobby");
            return;
        }

        var args = JsonSerializer.Serialize(
            new
            {
                name = $"{_botOptions.Prefix} {match.LobbyName}",
                mode = match.MatchMode,
                password = match.LobbyPassword,
                location = match.Server,
                visibility = "lv_public"
            });

        await Clients.Client(match.BotId).EditCustomMatch(args, matchId);
        await Clients.Clients(match.Players.Select(x => x.UserId))
            .ShowModalWithMessage("Waiting when the bot will configure the game");
    }

    public async Task Time2Prepare(long matchId, int minutes)
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

        if (match.Bot.Status != BotState.InLobby)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not in lobby");
            return;
        }

        await Clients.Clients(match.Players.Select(x => x.UserId))
            .ShowModalWithTimer($"You have time to prepare. The game will start automatically in {minutes}m.");
    }

    public async Task StartGame(long matchId)
    {
        var match = await _matchRepository.Query
            .Include(x => x.Bot)
            .FirstOrDefaultAsync(x => x.Id == matchId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error($"Can not find match by this id: {matchId}");
            return;
        }

        if (match.Bot.Status != BotState.ReadyToStart)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not ready");
            return;
        }

        await Clients.Client(match.BotId).StartGame(null);
    }

    public async Task SetMatchResult(Team winner)
    {
        var match = await _matchRepository.Query
            .Include(x => x.Bot)
            .Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("This bot does not belong to any match");
            return;
        }

        if (match.Bot.Status != BotState.InGame)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not ready");
            return;
        }

        match.TeamWinner = winner;
        await _matchRepository.SaveAsync();

        var players = match.Players.Select(x => x.UserId);
        await Clients.Clients(players).ShowMatchResult(winner);
    }

    public async Task ShowModalWithMessage(string message)
    {
        var match = await _matchRepository.Query
            .Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("This bot does not belong to any match");
            return;
        }

        var players = match.Players.Select(x => x.UserId);
        await Clients.Clients(players).ShowModalWithMessage(message);
    }
}