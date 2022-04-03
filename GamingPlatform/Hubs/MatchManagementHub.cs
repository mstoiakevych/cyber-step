using System.Text.Json;
using Domain.Common;
using Domain.Tournaments;
using Infrastructure.Abstractions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace GamingPlatform.Hubs;

public class MatchManagementHub : Hub
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
            await Clients.Client(Context.ConnectionId).SendAsync("Error", "Server error");
            return;
        }

        var botConnectionId = response.Content.ReadAsStringAsync().Result;
        await _playerService.ConnectBot(matchId, botConnectionId);
        await _playerService.ConnectPlayer(matchId, playerId, Context.User, Context.ConnectionId);
        await Clients.Client(botConnectionId).SendAsync("UpGame", null);
    }

    public async Task SetBotStatus(string botStatus)
    {
        var success = Enum.TryParse(botStatus, out BotState botState);
        if (!success)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("Error", $"Can not parse BotState ({botState})");
            return;
        }

        var match = await _matchRepository.Query.Include(x => x.Bot)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("Error", $"This bot does not belong to any match");
            return;
        }

        match.Bot.Status = botState;
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
            await Clients.Client(Context.ConnectionId).SendAsync("Error", $"Can not find match by this id: {matchId}");
            return;
        }

        if (match.Bot.Status != BotState.Online)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("Error", $"Your bot is not online");
            return;
        }

        await Clients.Client(match.BotId).SendAsync("InviteInLobby", match.Players?.Select(x => x.UserId));
    }

    public async Task EditLobbyConfiguration(long matchId)
    {
        var match = await _matchRepository.Query
            .Include(x => x.Bot)
            .FirstOrDefaultAsync(x => x.Id == matchId);
        
        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("Error", $"Can not find match by this id: {matchId}");
            return;
        }
        
        if (match.Bot.Status != BotState.InLobby)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("Error", $"Your bot is not in lobby");
            return;
        }

        var args = JsonSerializer.Serialize(
            new
            {
                name = $"{_botOptions.Prefix} {match.LobbyName}", 
                mode = match.MatchMode, 
                password =match.LobbyPassword, 
                location = match.Server, 
                visibility = "lv_public"
            });
        
        await Clients.Client(match.BotId).SendAsync("EditCustomMatch", args);
    }

    public async Task StartGame(long matchId)
    {
        var match = await _matchRepository.Query
            .Include(x => x.Bot)
            .FirstOrDefaultAsync(x => x.Id == matchId);
        
        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("Error", $"Can not find match by this id: {matchId}");
            return;
        }
        
        if (match.Bot.Status != BotState.ReadyToStart)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("Error", $"Your bot is not ready");
            return;
        }
        await Clients.Client(match.BotId).SendAsync("StartGame", null);
    }
}