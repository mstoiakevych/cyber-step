using Domain.Common;
using Domain.Tournaments;
using Infrastructure.Abstractions;
using Infrastructure.DTO.Match;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class MatchService : IMatchService
{
    private readonly IRepository<Match> _matchRepository;
    private readonly IClientService _clientService;

    public MatchService(IRepository<Match> matchRepository, IClientService clientService)
    {
        _matchRepository = matchRepository;
        _clientService = clientService;
    }
    
    public async Task<Match> CreateMatch(Match match)
    {
        await _matchRepository.InsertAsync(match);

        return match;
    }

    public async Task<List<MatchDto>> Search(MatchSearchArgs args)
    {
        var query = _matchRepository.Query.Include(x => x.Players).Where(x => x.GameState == GameState.Lobby);
        
        if (args.GameMode != null)
        {
            query = query.Where(x => x.GameMode == args.GameMode);
        }

        if (args.Server != null)
        {
            query = query.Where(x => x.Server == args.Server);
        }

        return await query.Select(x => new MatchDto {Id = x.Id, Name = x.Name, Server = x.Server, GameMode = x.GameMode ?? GameMode.OneVsOne, GameState = x.GameState, LobbyName = x.LobbyName, LobbyPassword = x.LobbyPassword, Players = x.Players}).ToListAsync();
    }

    public async Task<bool> EndMatch(long id)
    {
        var match = await _matchRepository.GetByKeyAsync(id);

        if (match is not {GameState: GameState.Active})
            return false; // throw error

        match.GameState = GameState.Ended;
        
        _matchRepository.Update(match);

        await _clientService.RemoveConnections(id);

        return true;
    }
}