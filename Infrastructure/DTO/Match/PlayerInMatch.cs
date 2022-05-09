using Domain.Tournaments;

namespace Infrastructure.DTO.Match;

public class PlayerInMatch
{
    public long Id { get; set; }
    public Team? Team { get; set; }
    public string Username { get; set; }
    public string Avatar { get; set; }
    public bool IsReady { get; set; }
}