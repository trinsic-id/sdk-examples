using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using AuthenticationServices;
using Foundation;
using IdentityModel;
using IdentityModel.Client;
using IdentityModel.OidcClient;
using IdentityModel.OidcClient.Browser;
using IdentityModel.OidcClient.Results;
using Microsoft.Maui.Controls;
using Microsoft.Maui.Essentials;
using UIKit;

namespace MauiVerifier;

public partial class MainPage : ContentPage
{
    public MainPage() {
        InitializeComponent();
    }

    private async void OnShareCredential(object sender, EventArgs e) {
        try {
            OidcClientOptions options = new() {
                Authority = "https://connect.trinsic.cloud",
                ClientId = "urn:wallets:123",
                RedirectUri = "mauiverifier://callback",
                Browser = new PlatformBrowser(),
                LoadProfile = false,
                HttpClientFactory = _ => new HttpClient(new NSUrlSessionHandler()),
            };
            OidcClient client = new(options);

            var result = await client.LoginAsync(new LoginRequest {
                FrontChannelExtraParameters = new Parameters {
                    { "trinsic:ecosystem", "default" },
                    { "trinsic:schema", "https://schema.trinsic.cloud/default/attendance-badge" }
                }
            });

            if (result.IsError) {
                ResultLabel.Text = "Action canceled or error occured";
            }
            else {
                ResultLabel.Text = "Success!";
                ResultEditor.Text = result.IdentityToken;//JsonSerializer.Serialize(token, new JsonSerializerOptions { WriteIndented = true });
            }
        }
        catch (Exception ex) {
            Console.WriteLine(ex);
        }
    }
}