using System.Text.Json.Serialization;

namespace Infrastructure.DTO.SteamAPI;

public partial class PlayerSummary
{
    [JsonPropertyName("steamid")]
    public string Steamid { get; set; }

    [JsonPropertyName("communityvisibilitystate")]
    public long Communityvisibilitystate { get; set; }

    [JsonPropertyName("profilestate")]
    public long Profilestate { get; set; }

    [JsonPropertyName("personaname")]
    public string Personaname { get; set; }

    [JsonPropertyName("profileurl")]
    public Uri Profileurl { get; set; }

    [JsonPropertyName("avatar")]
    public Uri Avatar { get; set; }

    [JsonPropertyName("avatarmedium")]
    public Uri Avatarmedium { get; set; }

    [JsonPropertyName("avatarfull")]
    public Uri Avatarfull { get; set; }

    [JsonPropertyName("avatarhash")]
    public string Avatarhash { get; set; }

    [JsonPropertyName("lastlogoff")]
    public long Lastlogoff { get; set; }

    [JsonPropertyName("personastate")]
    public long Personastate { get; set; }

    [JsonPropertyName("primaryclanid")]
    public string Primaryclanid { get; set; }

    [JsonPropertyName("timecreated")]
    public long Timecreated { get; set; }

    [JsonPropertyName("personastateflags")]
    public long Personastateflags { get; set; }

    [JsonPropertyName("loccountrycode")]
    public string Loccountrycode { get; set; }
}