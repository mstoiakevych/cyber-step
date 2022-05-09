using Domain.Tournaments;

namespace Infrastructure.DTO.Match;

public class CreateMatchDto
{
    public string Name { get; set; }
    public GameMode GameMode { get; set; }
    public string Server { get; set; }
    public string MatchMode { get; set; }
    public string Password { get; set; }
}