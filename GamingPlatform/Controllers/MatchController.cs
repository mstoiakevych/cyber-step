using Domain.Abstractions;
using Domain.Tournaments;
using Infrastructure.Abstractions;
using Infrastructure.DTO.Match;
using Infrastructure.Services;
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

    [HttpPost("join/{id:long}")]
    public async Task<ActionResult<JoinMatchDto>> JoinMatch(long id)
    {
        var player = await _playerService.JoinMatch(id, User);

        if (player == null)
            return BadRequest();

        return new JoinMatchDto
        {
            MatchId = id,
            PlayerId = player.Id
        };
    }
}