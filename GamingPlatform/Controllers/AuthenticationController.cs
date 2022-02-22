using AspNet.Security.OpenId.Steam;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace GamingPlatform.Controllers;

public class AuthenticationController : Controller
{
    [HttpGet("/signin")]
    public IActionResult SignIn()
    {
        return Challenge(new AuthenticationProperties {RedirectUri = "/"}, SteamAuthenticationDefaults.AuthenticationScheme);
    }

    [HttpGet("/signout")]
    public IActionResult SignOut()
    {
        foreach (var userClaim in HttpContext.User.Claims)
        {
            Console.WriteLine(userClaim.Type + " : " + userClaim.Value);
        }

        return SignOut(new AuthenticationProperties {RedirectUri = "/"},
            CookieAuthenticationDefaults.AuthenticationScheme);
    }
}