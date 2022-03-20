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

        private async void SignIn()
        {
            authToken = await AccountService!.SignInAsync(new()
            {
                Details = new()
                {
                    Name = Model.FullName ?? string.Empty,
                    Email = Model.Email ?? string.Empty
                }
            });

            var profile = AccountProfile.Parser.ParseFrom(Convert.FromBase64String(authToken));
            Console.WriteLine(profile);

            if  (profile.Protection.Enabled)
            {
                protection = true;
            }
            else
            {
                (StateProvider! as AuthTokenStateProvider)!.NotifyProfileChanged(authToken);
            }
        }

        private async void OnUnprotect()
        {
            authToken = AccountService.Unprotect(authToken!, UnprotectModel.SecurityCode!);
            await TokenProvider!.SaveAsync(authToken);

            (StateProvider! as AuthTokenStateProvider)!.NotifyProfileChanged(authToken);
        }
    }
}

