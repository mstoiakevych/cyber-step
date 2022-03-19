using Microsoft.AspNetCore.SignalR;

namespace GamingPlatform.Hubs;

public class MatchManagementHub : Hub
{
    public Task TestMessage(string message)
    {
        return Clients.Others.SendAsync("ReceiveMessage", message);
    }
}