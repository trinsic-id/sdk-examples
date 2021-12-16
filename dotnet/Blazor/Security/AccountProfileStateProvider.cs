using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;
using Trinsic.Services.Account.V1;

namespace Blazor.Security;

public class AccountProfileStateProvider : AuthenticationStateProvider
{
    public AccountProfile? CurrentProfile { get; set; }

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        await Task.Yield();

        if (CurrentProfile == null)
        {
            var anonymous = new AuthenticationState(new ClaimsPrincipal(new ClaimsIdentity() { }));
            return anonymous;
        }
        var userClaimPrincipal = new ClaimsPrincipal(new ClaimsIdentity("AccountProfileAuthentication"));
        var loginUser = new AuthenticationState(userClaimPrincipal);
        return loginUser;
    }

    internal void NotifyProfileChanged(AccountProfile profile)
    {
        CurrentProfile = profile;
        NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
    }
}