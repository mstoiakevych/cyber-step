using Domain.Tournaments;

namespace Domain.Common;

public class HubClient
{
    public string ConnectionId { get; init; }
    public long PlayerId { get; init; }
    public Player? Player { get; set; }
    public long MatchId { get; init; }
    public Match? Match { get; set; }

    public HubClient(string connectionId, long playerId, long matchId)
    {
        ConnectionId = connectionId;
        PlayerId = playerId;
        MatchId = matchId;
    }
}