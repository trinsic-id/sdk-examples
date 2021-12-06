using System;
using Blazor.Models;
using Blazor.Security;
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

        protected bool protection = false;
        protected AccountProfile? profile;

        private async void SignIn()
        {
            var httpClient = new HttpClient(new GrpcWebHandler(GrpcWebMode.GrpcWeb, new HttpClientHandler()));
            var channel = GrpcChannel.ForAddress("https://staging-internal.trinsic.cloud", new GrpcChannelOptions { HttpClient = httpClient });

            var accountService = new AccountService(serverConfig: null, existingChannel: channel);
            profile = await accountService.SignInAsync(new()
            {
                Name = Model.FullName ?? String.Empty,
                Email = Model.Email ?? String.Empty
            });

            Console.WriteLine(profile);

            if  (profile.Protection.Enabled)
            {
                protection = true;
            }
            else
            {
                (StateProvider! as AccountProfileStateProvider)!.NotifyProfileChanged(profile);
            }
        }

        private void OnUnprotect()
        {
            if (profile == null) throw new ArgumentException("profile must be set");

            profile = AccountService.Unprotect(profile, UnprotectModel.SecurityCode!);

            (StateProvider! as AccountProfileStateProvider)!.NotifyProfileChanged(profile);
        }
    }
}

