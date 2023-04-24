using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;
using Trinsic;

namespace Blazor.Security;

public class AuthTokenStateProvider : AuthenticationStateProvider
{
    public AuthTokenStateProvider(TrinsicService myTrinsicService) {
        _trinsicService = myTrinsicService;
    }

    private readonly TrinsicService _trinsicService;

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        var authToken = _trinsicService.Options.AuthToken;

        if (string.IsNullOrWhiteSpace(authToken))
        {
            var anonymous = new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity() { }));
            return anonymous;
        }
        var userClaimPrincipal = new ClaimsPrincipal(new ClaimsIdentity("OberonAuthentication"));
        var loginUser = new AuthenticationState(userClaimPrincipal);
        return loginUser;
    }

    internal void NotifyProfileChanged()
    {
        NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
    }
}