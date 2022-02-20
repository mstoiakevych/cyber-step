namespace Shared.Boosting.Entities;

public class Pubg : IGameOptions
{
    public string Title { get; set; }
    public int MinRating { get; set; }
    public int MaxRating { get; set; }
    public List<Rank> Ranks { get; set; }
    public List<Offer> Offers { get; set; }
    public const string ConfigName = "PUBG";
}