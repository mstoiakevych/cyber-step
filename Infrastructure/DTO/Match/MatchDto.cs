using Domain.Tournaments;

namespace Infrastructure.DTO.Match;

public class MatchDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public GameMode GameMode { get; set; }
    public string MatchMode { get; set; }
    public GameState GameState { get; set; }
    public string Server { get; set; }
    public string LobbyName { get; set; }
    public string LobbyPassword { get; set; }
    public List<PlayerInMatch> Players { get; set; }
    
    public int TotalPlayers => GameMode switch
    {
        GameMode.OneVsOne => 2,
        GameMode.TwoVsTwo => 4,
        GameMode.FiveVsFive => 10,
        _ => 0
    };

    public int JoinedPlayers => Players?.Count ?? 0;
}