using GamingPlatform.Identity;
using Microsoft.AspNetCore.Identity;

namespace Domain.Identity;

public class SteamUser : IdentityUser
{
    public long SteamId32 => long.Parse(Id) - 76561197960265728;
    public string? Avatar { get; set; }
    public string? AvatarMedium { get; set; }
    public string? AvatarFull { get; set; }
    public OnlineState? OnlineState { get; set; }
    public string? ProfileUrl { get; set; }
}