namespace Domain.Tournaments;

public class MatchPlayer
{
    public long MatchId { get; set; }
    public Match Match { get; set; }
    
    public long PlayerId { get; set; }
    public Player Player { get; set; }
}