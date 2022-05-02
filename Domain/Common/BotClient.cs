namespace Domain.Common;

public class BotClient
{
    public string ConnectionId { get; init; }
    public long MatchId { get; init; }

    public BotState Status { get; set; } = BotState.Offline;

    public BotClient()
    {
    }

    public BotClient(string connectionId, long matchId)
    {
        ConnectionId = connectionId;
        MatchId = matchId;
    }
}