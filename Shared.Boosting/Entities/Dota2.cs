namespace Shared.Boosting.Entities;

public class Dota2 : IGame
{
    public string Title { get; set; }
    public int MinRating { get; set; }
    public int MaxRating { get; set; }
    public List<Rank> Ranks { get; set; }
    public List<Offer> Offers { get; set; }
    public string ConfigName => "dota2";
}