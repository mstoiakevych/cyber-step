using System.Text.Json.Serialization;

namespace Infrastructure.DTO.SteamAPI;

public partial class PlayerSummaryResponseContent
{
    [JsonPropertyName("response")]
    public PlayerSummaryResponse Response { get; set; }
}

public partial class PlayerSummaryResponse
{
    [JsonPropertyName("players")]
    public PlayerSummary[] Players { get; set; }
}