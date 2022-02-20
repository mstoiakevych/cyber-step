﻿namespace Shared.Boosting.Entities;

public class Hearthstone : IGame
{
    public string Title { get; set; }
    public List<Rank> Ranks { get; set; }
    public List<Offer> Offers { get; set; }
    public string ConfigName { get; }
}