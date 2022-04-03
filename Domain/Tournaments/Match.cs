using Domain.Abstractions;
using Domain.Common;

namespace Domain.Tournaments;

public class Match : IEntity
{
    public long Id { get; set; }
    public string Name { get; set; }
    public GameMode GameMode { get; set; }
    public GameState GameState { get; set; }
    public string? Server { get; set; }
    public string? LobbyName { get; set; }
    public string? LobbyPassword { get; set; }
    public string? BotId { get; set; }
    public BotClient? Bot { get; set; }
    public ICollection<Player> Players { get; set; }
}