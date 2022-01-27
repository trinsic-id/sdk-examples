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
        [Inject]public ILocalStorageService? LocalStorage { get; set; }

        protected bool protection = false;
        protected AccountProfile? profile;

        private async void SignIn()
        {
            var accountService = new AccountService();
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
                await LocalStorage!.SetItemAsStringAsync(
                    key: "currentProfile",
                    data: Convert.ToBase64String(profile.ToByteArray()));

                (StateProvider! as AccountProfileStateProvider)!.NotifyProfileChanged(profile);
            }
        }

        private async void OnUnprotect()
        {
            if (profile == null) throw new ArgumentException("profile must be set");

            profile = AccountService.Unprotect(profile, UnprotectModel.SecurityCode!);
            await LocalStorage!.SetItemAsStringAsync(
                    key: "currentProfile",
                    data: Convert.ToBase64String(profile.ToByteArray()));

            (StateProvider! as AccountProfileStateProvider)!.NotifyProfileChanged(profile);
        }
    }
}

