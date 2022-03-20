using Domain.Abstractions;
using Domain.Identity;

namespace Domain.Tournaments;

public class Player : IEntity
{
    public long Id { get; set; }
    public string UserId { get; set; }
    public SteamUser User { get; set; }
    public Team Team { get; set; }
    public ICollection<Match> Matches { get; set; }
    // todo add props
}