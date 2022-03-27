using Domain.Abstractions;
using Domain.Tournaments;
using Infrastructure.Abstractions;
using Infrastructure.DTO.Match;
using Microsoft.AspNetCore.Mvc;

namespace GamingPlatform.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MatchController : ControllerBase
{
    private readonly IRepository<Match> _matchRepository;
    private readonly IPlayerService _playerService;

    public MatchController(IRepository<Match> matchRepository, IPlayerService playerService)
    {
        _matchRepository = matchRepository;
        _playerService = playerService;
    }

    [HttpGet]
    public ActionResult<Match[]> Search([FromQuery] MatchSearchArgs args)
    {
        var query = _matchRepository.Query.Where(x => x.GameState == GameState.Lobby);
        
        if (args.GameMode != null)
        {
            query = query.Where(x => x.GameMode == args.GameMode);
        }

        if (args.Server != null)
        {
            query = query.Where(x => x.Server == args.Server);
        }

        return Ok(query);
    }

    [HttpPost("create-join")]
    public async Task<ActionResult<JoinMatchDto>> CreateAndJoin(CreateMatchDto createMatchDto)
    {
        var match = new Match
        {
            Name = createMatchDto.Name,
            Server = createMatchDto.Server,
            GameMode = createMatchDto.GameMode,
            GameState = GameState.Lobby
        };

        match = await _matchRepository.InsertAsync(match);

        var player = await _playerService.JoinMatch(match.Id, User);
        if (player == null) return BadRequest();
        
        return new JoinMatchDto
        {
            MatchId = match.Id,
            PlayerId = player.Id
        };
    }

    [HttpPost("join/{id:long}")]
    public async Task<ActionResult<JoinMatchDto>> Join(long id)
    {
        var player = await _playerService.JoinMatch(id, User);

        if (player == null) return BadRequest();

        return new JoinMatchDto
        {
            MatchId = id,
            PlayerId = player.Id
        };
    }
}