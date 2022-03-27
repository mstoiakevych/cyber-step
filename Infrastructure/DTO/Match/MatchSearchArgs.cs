using Domain.Tournaments;

namespace Infrastructure.DTO.Match;

public class MatchSearchArgs
{
    public GameMode? GameMode { get; set; } 
    public string? Server { get; set; }
}