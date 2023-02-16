using System;
using Blazor.Models;
using Blazor.Security;
using Blazored.LocalStorage;
using Google.Protobuf;
using Grpc.Net.Client;
using Grpc.Net.Client.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Okapi.Security;
using Okapi.Security.V1;
using Trinsic;
using Trinsic.Services.Account.V1;

namespace Blazor.Shared
{
    public partial class SignInDisplay
    {
        public SignInModel Model { get; set; } = new();
        public ProtectionModel UnprotectModel { get; set; } = new();

        [Inject]public AuthenticationStateProvider? StateProvider { get; set; }
        [Inject]public ITokenProvider? TokenProvider { get; set; }
        [Inject]public AccountService? AccountService { get; set; }

        protected bool protection = false;
        protected string? authToken;
        protected LoginResponse _loginResponse;

        private async Task SignIn()
        {
            try
            {
                _loginResponse = await AccountService!.LoginAsync(new()
                {
                    EcosystemId = "default",
                    Email = Model.Email ?? string.Empty
                });

                if (_loginResponse.Profile is null)
                {
                    protection = true;
                }
                else
                {
                    (StateProvider! as AuthTokenStateProvider)!.NotifyProfileChanged();
                }

                StateHasChanged();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
        }

        private async Task OnUnprotect()
        {
            authToken = AccountService!.LoginConfirm(_loginResponse.Challenge, UnprotectModel.SecurityCode);
            await TokenProvider!.SaveAsync(authToken);

            (StateProvider! as AuthTokenStateProvider)!.NotifyProfileChanged();
        }
    }
}

