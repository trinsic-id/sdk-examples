using System;
using Blazor.Models;
using Blazor.Security;
using Blazored.LocalStorage;
using Google.Protobuf;
using Grpc.Net.Client;
using Grpc.Net.Client.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Trinsic;
using Trinsic.Services.Account.V1;
using Trinsic.Services.UniversalWallet.V1;

namespace Blazor.Shared
{
    public partial class SignInDisplay
    {
        public SignInModel Model { get; set; } = new();
        public ProtectionModel UnprotectModel { get; set; } = new();

        [Inject]public AuthenticationStateProvider? StateProvider { get; set; }
        [Inject]public TrinsicService? MyTrinsicService { get; set; }

        protected bool protection = false;
        protected string? authToken;
        protected AuthenticateInitResponse authenticateInitResponse;

        private async Task SignIn()
        {
            authenticateInitResponse = await MyTrinsicService!.Wallet.AuthenticateInitAsync(new()
            {
                EcosystemId = "default",
                Identity = "",
                Provider = IdentityProvider.Email
            });

                (StateProvider! as AuthTokenStateProvider)!.NotifyProfileChanged();
            StateHasChanged();
        }

        private async Task OnUnprotect()
        {
            var authenticateConfirmResponse = await MyTrinsicService!.Wallet.AuthenticateConfirmAsync(new()
            {
                Challenge = authenticateInitResponse.Challenge, Response = UnprotectModel.SecurityCode
            });
            authToken = authenticateConfirmResponse.AuthToken;
            MyTrinsicService.Options.AuthToken = authToken;

            (StateProvider! as AuthTokenStateProvider)!.NotifyProfileChanged();
        }
    }
}

