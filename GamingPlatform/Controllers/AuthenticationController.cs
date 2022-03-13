using AspNet.Security.OpenId.Steam;
using Domain.Identity;
using GamingPlatform.Identity;
using Infrastructure.Abstractions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GamingPlatform.Controllers;

public class AuthenticationController : Controller
{
    private readonly UserManager<SteamUser> _userManager;
    private readonly SignInManager<SteamUser> _signInManager;
    private readonly ISteamApiService _steamApiService;

    public AuthenticationController(SignInManager<SteamUser> signInManager, UserManager<SteamUser> userManager, ISteamApiService steamApiService)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _steamApiService = steamApiService;
    }
    
    [HttpGet("/signin")]
    public IActionResult SignIn()
    {
        return Challenge(new AuthenticationProperties {RedirectUri = "/link-identity"}, SteamAuthenticationDefaults.AuthenticationScheme);
    }

    [HttpGet("/signout")]
    public async Task<IActionResult> SignOutUser()
    {
        await _signInManager.SignOutAsync();

        return Redirect("/");    
    }

    [HttpGet("/link-identity")]
    public async Task<IActionResult> AuthenticateWithSteam()
    {
        var result = await HttpContext.AuthenticateAsync(SteamAuthenticationDefaults.AuthenticationScheme);

        var claims = result.Principal.Identities.FirstOrDefault().Claims
            .Select(x => new {x.Issuer, x.OriginalIssuer, x.Type, x.Value});

        var user = await _userManager.GetUserAsync(result.Principal);

        if (user == null)
        {
            var id = claims.First().Value.Split('/').Last();

            var playerSummary = await _steamApiService.GetPlayerSummary(id);

            user = new SteamUser
            {
                Id = id,
                UserName = playerSummary.Personaname,
                Avatar = playerSummary.Avatar.ToString(),
                AvatarFull = playerSummary.Avatarfull.ToString(),
                AvatarMedium = playerSummary.Avatarmedium.ToString(),
                ProfileUrl = playerSummary.Profileurl.ToString(),
                OnlineState = Enum.GetValues<OnlineState>()[playerSummary.Personastate]
            };

            await _userManager.CreateAsync(user);
        }

        await _signInManager.SignInAsync(user, new AuthenticationProperties(), SteamAuthenticationDefaults.AuthenticationScheme);
        
        return Redirect("/");
    }
}