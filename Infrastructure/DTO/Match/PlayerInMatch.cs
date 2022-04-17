using Domain.Tournaments;

namespace Infrastructure.DTO.Match;

public class PlayerInMatch
{
    public Team? Team { get; set; }
    public string Username { get; set; }
    public string Avatar { get; set; }
}