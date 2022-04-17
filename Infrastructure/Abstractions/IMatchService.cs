using Domain.Tournaments;
using Infrastructure.DTO.Match;

namespace Infrastructure.Abstractions;

public interface IMatchService
{
    Task<List<MatchDto>> Search(MatchSearchArgs args);
    Task<Match> CreateMatch(Match match);
    Task<bool> EndMatch(long id);
}