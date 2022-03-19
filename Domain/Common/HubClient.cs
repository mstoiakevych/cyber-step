using Domain.Tournaments;

namespace Domain.Common;

public class HubClient
{
    public string ConnectionId { get; }
    public long? PlayerId { get; set; }
    public Player? Player { get; set; }
    public long MatchId { get; set; }
    public Match? Match { get; set; }

    public HubClient(string connectionId)
    {
        ConnectionId = connectionId;
    }
}