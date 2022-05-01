using AutoMapper;
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
    Task StartGame(string? arg); // TODO delete
    Task ShowMatchResult(Team winner);
    Task OnMatchJoin(IEnumerable<PlayerInMatch> players);
    Task OnNewPlayerJoin(PlayerInMatch player);
}

public partial class MatchManagementHub : Hub<IMatchClientHub>
{
    private readonly BotOptions _botOptions;
    private readonly IRepository<Match> _matchRepository;
    private readonly IRepository<Player> _playerRepository;
    private readonly IPlayerService _playerService;
    private readonly IMapper _mapper;

    public MatchManagementHub(IOptions<BotOptions> botOptions, IRepository<Match> matchRepository,
        IPlayerService playerService, IRepository<Player> playerRepository, IMapper mapper)
    {
        _matchRepository = matchRepository;
        _playerService = playerService;
        _playerRepository = playerRepository;
        _mapper = mapper;
        _botOptions = botOptions.Value;
    }

    public string GetConnectionId()
    {
        return Context.ConnectionId;
    }

    public async Task CreateGame(long matchId)
    {
        try
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
            await Clients.Client(botConnectionId).UpGame(matchId);
        }
        catch (Exception e)
        {
            await Clients.Caller.Error("Unable to connect bot.");
        }
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
        var match = await _matchRepository.Query.Include(x => x.Bot)
            .Include(x => x.Players)
            .ThenInclude(x => x.User)
            .FirstOrDefaultAsync(x => x.Id == matchId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("You can't join this match");
            return;
        }

        var player = await _playerRepository.Query.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == playerId);

        if (player == null)
        {
            await Clients.Client(Context.ConnectionId).Error("You can't join this match");
            return;   
        }

        var hubClient = await _playerService.GetHubClientFromPlayerId(playerId);

        if (hubClient == null)
        {
            await _playerService.ConnectPlayer(matchId, playerId, Context.User, Context.ConnectionId);
            await Clients.AllExcept(Context.ConnectionId).OnNewPlayerJoin(new PlayerInMatch {Id = playerId, Username = player.User.UserName, Avatar = player.User.Avatar, Team = player.Team});
        }

        var matchDto = _mapper.Map<MatchDto>(match);

        // FROM InvitePlayers (if last player invite players)
        if (matchDto.Players.Count == matchDto.TotalPlayers)
        {
            if (match.Bot?.Status != BotState.Online)
            {
                await Clients.AllExcept(match.Bot?.ConnectionId).Error("Your bot is not online");
                return;
            }

            var players = match.Players.Select(x => x.UserId);
            await Clients.Client(match.BotId).InviteInLobby(players, matchId);
            await Clients.Clients(players).ShowModalWithMessage("Waiting when all players accept invite");
        }
    }

    public void Test()
    {
        Console.WriteLine("TEST HAS BEEN PASSED");
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await _playerService.LeaveMatch(Context.ConnectionId);
    }
}