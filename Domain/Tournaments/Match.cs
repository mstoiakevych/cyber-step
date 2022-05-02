using Domain.Abstractions;
using Domain.Common;

namespace Domain.Tournaments;

public class Match : IEntity
{
    public long Id { get; set; }
    public string Name { get; set; }
    public GameMode? GameMode { get; set; }
    public GameState GameState { get; set; }
    public string? MatchMode { get; set; } = "gm_1v1_solo_mid";
    public string? Server { get; set; } = "sl_us_west";
    public string? LobbyName { get; set; } = Guid.NewGuid().ToString()[..8];
    public string? LobbyPassword { get; set; } = Guid.NewGuid().ToString()[^12..];
    public string? BotId { get; set; }
    public BotClient? Bot { get; set; }
    public ICollection<Player>? Players { get; set; }

    public Team? TeamWinner { get; set; }
}