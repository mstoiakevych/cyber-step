using Domain.Tournaments;
using Infrastructure.Abstractions;
using Infrastructure.DTO.Match;
using Microsoft.AspNetCore.Mvc;

namespace GamingPlatform.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MatchController : ControllerBase
{
    private readonly IMatchService _matchService;
    private readonly IPlayerService _playerService;

    public MatchController(IPlayerService playerService, IMatchService matchService)
    {
        _playerService = playerService;
        _matchService = matchService;
    }

    [HttpGet]
    public async Task<ActionResult<Match[]>> Search([FromQuery] MatchSearchArgs args)
    {
        var matches = await _matchService.Search(args);

        return Ok(matches);
    }

    [HttpPost("create-join")]
    public async Task<ActionResult<JoinMatchDto>> CreateAndJoin(CreateMatchDto createMatchDto)
    {
        var match = new Match
        {
            Name = createMatchDto.Name,
            Server = createMatchDto.Server,
            GameMode = createMatchDto.GameMode
        };

        match = await _matchService.CreateMatch(match);

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

    [HttpPost("end/{id:long}")]
    public async Task<ActionResult> End(long id)
    {
        var success = await _matchService.EndMatch(id);

        if (!success)
            return BadRequest();
        
        return Ok();
    }
}