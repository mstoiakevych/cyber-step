using Domain.Exceptions;
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
    public async Task<ActionResult<MatchDto[]>> Search([FromQuery] MatchSearchArgs args)
    {
        var matches = await _matchService.Search(args);
        
        var matchDtos = matches
            .Select(x => new MatchDto 
            {
                Id = x.Id, 
                Name = x.Name, 
                Server = x.Server, 
                GameMode = x.GameMode ?? GameMode.OneVsOne, 
                GameState = x.GameState, 
                LobbyName = x.LobbyName, 
                LobbyPassword = x.LobbyPassword, 
                Players = x.Players
                    .Select(x => new PlayerInMatch 
                        {Id = x.Id, Username = x.User.UserName, Avatar = x.User.Avatar, Team = x.Team})
                    .ToList()
            });

        return Ok(matchDtos);
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<MatchDto>> Get(long id)
    {
        var match = await _matchService.Get(id);
        
        return new MatchDto
        {
            Id = match.Id, Name = match.Name, Server = match.Server, GameMode = (GameMode) match.GameMode,
            GameState = match.GameState, LobbyName = match.LobbyName, LobbyPassword = match.LobbyPassword,
            Players = match.Players.Select(x => new PlayerInMatch {Id = x.Id, Username = x.User.UserName, Avatar = x.User.AvatarFull, Team = x.Team}).ToList()
        };
    }

    [HttpPost("create")]
    public async Task<ActionResult<long>> Create(CreateMatchDto createMatchDto)
    {
        var match = new Match
        {
            Name = createMatchDto.Name,
            Server = createMatchDto.Server,
            GameMode = createMatchDto.GameMode
        };

        match = await _matchService.CreateMatch(match);

        return match.Id;
    }

    [HttpPost("join/{id:long}")]
    public async Task<ActionResult<PlayerInMatch>> Join(long id)
    {
        var player = await _playerService.JoinMatch(id, User);

        if (player == null) throw new CSNotAuthenticatedException("You must authenticate first");

        return new PlayerInMatch {Id = player.Id, Username = player.User.UserName, Avatar = player.User.AvatarFull, Team = player.Team};
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