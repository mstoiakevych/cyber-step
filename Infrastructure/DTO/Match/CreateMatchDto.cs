using Domain.Tournaments;

namespace Infrastructure.DTO.Match;

public class CreateMatchDto
{
    public string Name { get; set; }
    public GameMode GameMode { get; set; }
    public GameState GameState { get; set; }
    public string Server { get; set; }
    public string LobbyName { get; set; }
    public string LobbyPassword { get; set; }
    public ICollection<Player> Players { get; set; }
}