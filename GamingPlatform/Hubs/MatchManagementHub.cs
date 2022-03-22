using Domain.Abstractions;
using Domain.Common;
using Domain.Tournaments;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;

namespace GamingPlatform.Hubs;

public class MatchManagementHub : Hub
{
    public Task TestMessage(string message)
    {
        Console.WriteLine(message);
        return Clients.Others.SendAsync("ReceiveMessage", message);
    }

    private static readonly Random Random = new();
    private readonly BotOptions _botOptions;

    public MatchManagementHub(IOptions<BotOptions> botOptions)
    {
        _botOptions = botOptions.Value;
    }

    public async Task CreateGame(string gameName)
    {
        var client = new HttpClient();
        var response = await client.GetAsync($"{_botOptions.ServerUrl}/create");
        if (!response.IsSuccessStatusCode)
        {
            await Clients.Client(Context.ConnectionId).SendAsync("Error", "Server error");
            return;
        }
        
        var botConnectionId = response.Content.ReadAsStringAsync().Result;

        await Clients.Client(botConnectionId).SendAsync("UpGame", null);


        // var match = new Match
        // {
        //     GameMode = GameMode.OneVsOne,
        //     GameState = GameState.Creating,
        //     Server = DotaServer.UsWest,
        //     Players = new List<Player>(),
        //     Name = gameName,
        //     LobbyName = $"{_botOptions.Prefix} {gameName}",
        //     LobbyPassword = RandomString(10),
        //     // BotId = botConnectionId,
        //     // Bot = hubClient,
        // };
        // _unitOfWork.InsertAsync(match);
        // var botClient = new BotClient(botConnectionId, match.Id);
        // _unitOfWork.InsertAsync(botClient);
        // await _unitOfWork.SaveAsync(CancellationToken.None);
    }

    public async Task InvitePlayers()
    {
    }

    public async Task EditLobbyConfiguration(string mode, string location)
    {
        // var match = _userRepository.Find(Context.ConnectionId).Include(x => x.Match);
        // await Clients.Client(match.ConnectionBotId).SendAsync("EditLobby", "121");
    }

    private static string RandomString(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[Random.Next(s.Length)]).ToArray());
    }
}