using AutoMapper;
using Domain.Tournaments;
using Infrastructure.DTO.Match;

namespace Infrastructure.Mappings;

public class MatchMappingProfile : Profile
{
    public MatchMappingProfile()
    {
        CreateMap<Match, MatchDto>()
            .ForMember(dest => dest.Players,
                opt => opt.MapFrom(src => src.Players.Select(x => new PlayerInMatch
                    {Id = x.Id, Username = x.User.UserName, Avatar = x.User.Avatar, Team = x.Team, IsReady = x.IsReady})))
            .ForMember(dest => dest.GameMode, opt => opt.MapFrom(src => src.GameMode ?? GameMode.OneVsOne));
    }
}