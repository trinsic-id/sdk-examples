using System;
using Microsoft.Maui.Accessibility;
using Microsoft.Maui.Controls;
using Trinsic;

namespace HauiMaui;

public partial class MainPage : ContentPage
{
    public MainPage() {
        InitializeComponent();
    }

    private async void OnSignInClicked(object sender, EventArgs e)
    {
        var trinsicService = new TrinsicService();
        var newWallet = await trinsicService.Wallet.CreateWalletAsync(new() {EcosystemId ="default"});
        trinsicService.Options.AuthToken = newWallet.AuthToken;
        Console.WriteLine($"AuthToken: {newWallet.AuthToken}");

        var items = await trinsicService.Wallet.SearchAsync(new());
        Console.WriteLine($"Items: {items}");
        AuthTokenLabel.Text = $"Success! [auth_token = {newWallet.AuthToken.Substring(0, 16)}...]";

        SemanticScreenReader.Announce(AuthTokenLabel.Text);
    }
}