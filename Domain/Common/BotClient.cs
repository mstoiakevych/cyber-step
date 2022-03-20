using Domain.Tournaments;

namespace Domain.Common;

public class BotClient
{
    public string ConnectionId { get; }

    public long MatchId { get; }
    public Match? Match { get; set; }
    

    public BotClient(string connectionId, long matchId)
    {
        ConnectionId = connectionId;
        MatchId = matchId;
    }
}