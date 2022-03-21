using System.Security.Claims;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Trinsic;

namespace Blazor.Security;

public class AuthTokenStateProvider : AuthenticationStateProvider
{
    public AuthTokenStateProvider(ITokenProvider tokenProvider) {
        _tokenProvider = tokenProvider;
    }

    private readonly ITokenProvider _tokenProvider;

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        var authToken = await _tokenProvider!.GetAsync();

        if (authToken is null)
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