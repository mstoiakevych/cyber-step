using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace Infrastructure.Services;

public class SteamUserClaimsTransformation : IClaimsTransformation
{
    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        var identity = principal.Identity as ClaimsIdentity;

        if (identity == null)
            return Task.FromResult(principal);

        var idClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

        if (idClaim != null)
            identity.RemoveClaim(idClaim);
        
        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, idClaim.Value.Split('/').Last()));

        return Task.FromResult(principal);
    }
}