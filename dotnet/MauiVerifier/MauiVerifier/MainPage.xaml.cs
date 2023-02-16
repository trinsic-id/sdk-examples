using System;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using IdentityModel.OidcClient;
using Microsoft.Maui.Controls;

namespace MauiVerifier;

public partial class MainPage : ContentPage
{
    public MainPage() {
        InitializeComponent();
    }

    private async void OnShareCredential(object sender, EventArgs e) {

        BusyIndicator.IsRunning = BusyIndicator.IsVisible = true;
        ResultLabel.Text = "";

        await Task.Yield();

        try {
            OidcClientOptions options = new() {
                Authority = "https://dev-connect.trinsic.cloud",
                ClientId = "urn:wallets:123",
                RedirectUri = "mauiverifier://callback",
                Browser = new PlatformBrowser(),
                LoadProfile = false,
                HttpClientFactory = _ => new HttpClient(),
            };
            OidcClient client = new(options);
            
            var result = await client.LoginAsync(new LoginRequest {
                FrontChannelExtraParameters = new Parameters {
                    { "trinsic:ecosystem", EcosystemEntry.Text },
                    { "trinsic:schema", SchemaEntry.Text }
                }
            });

            if (result.IsError) {
                ResultLabel.Text = "Action canceled or error occured";
            }
            else {
                ResultLabel.Text = "Success!";
                
                await Navigation.PushAsync(new CredentialPage(result.IdentityToken), true);
            }
        }
        catch (Exception ex) {
            Console.WriteLine(ex);
        }
        finally {
            BusyIndicator.IsRunning = BusyIndicator.IsVisible = false;
        }
    }
}