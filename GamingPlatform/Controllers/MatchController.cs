using AutoMapper;
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
    private readonly IMapper _mapper;

    public MatchController(IPlayerService playerService, IMatchService matchService, IMapper mapper)
    {
        _playerService = playerService;
        _matchService = matchService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<MatchDto[]>> Search([FromQuery] MatchSearchArgs args)
    {
        var matches = await _matchService.Search(args);
        
        var matchDtos = matches
            .Select(x => _mapper.Map<MatchDto>(x));

        return Ok(matchDtos);
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<MatchDto>> Get(long id)
    {
        var match = await _matchService.Get(id);
        
        return _mapper.Map<MatchDto>(match);
    }

    [HttpPost("create")]
    public async Task<ActionResult<long>> Create(CreateMatchDto createMatchDto)
    {
        var isUserInAnyMatch = await _playerService.IsUserInAnyMatch(User);

        if (isUserInAnyMatch)
            throw new CSNotAcceptableException("You are already in some match. You must finish it first in order to create a new one.");
        
        var match = new Match
        {
            Name = createMatchDto.Name,
            Server = createMatchDto.Server,
            GameMode = createMatchDto.GameMode,
            LobbyName = createMatchDto.Name,
            LobbyPassword = createMatchDto.Password,
            MatchMode = createMatchDto.MatchMode
        };

        match = await _matchService.CreateMatch(match);

        return match.Id;
    }

    [HttpPost("join/{id:long}")]
    public async Task<ActionResult<PlayerInMatch>> Join(long id)
    {
        var player = await _playerService.JoinMatch(id, User);

        if (player == null) throw new CSNotAuthenticatedException("You must authenticate first");

        return new PlayerInMatch {Id = player.Id, Username = player.User.UserName, Avatar = player.User.AvatarFull, Team = player.Team, IsReady = player.IsReady};
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