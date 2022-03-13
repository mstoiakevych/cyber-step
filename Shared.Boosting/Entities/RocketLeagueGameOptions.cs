﻿namespace Shared.Boosting.Entities;

public class RocketLeagueGameOptions : IGameOptions
{
    public string Title { get; set; }
    public List<Rank> Ranks { get; set; }
    public List<Offer> Offers { get; set; }
    public const string ConfigName = "Rocket League";
}