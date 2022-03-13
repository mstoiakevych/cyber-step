using Domain.Abstractions;

namespace Domain.Tournaments;

public class Match : IBaseEntity
{
    public long Id { get; set; }
    public string Name { get; set; }
    public GameMode GameMode { get; set; }
    public GameState GameState { get; set; }
    public DotaServer Server { get; set; }
    public string LobbyName { get; set; }
    public string LobbyPassword { get; set; }
    public ICollection<Player> Players { get; set; }
}