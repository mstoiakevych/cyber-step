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

    public MatchController(IRepository<Match> matchRepository)
    {
        _matchRepository = matchRepository;
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
}