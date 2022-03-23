using System;
using Microsoft.Maui.Controls;
using Microsoft.Maui.Essentials;
using Trinsic;

namespace HauiMaui;

public partial class MainPage : ContentPage
{
    private AccountService _accountService = new();

    public MainPage() {
        InitializeComponent();
    }

    private async void OnSignInClicked(object sender, EventArgs e) {
        var authToken = await _accountService.SignInAsync(new());
        AuthTokenLabel.Text = $"Success! [auth_token = {authToken.Substring(0, 16)}...]";

        SemanticScreenReader.Announce(AuthTokenLabel.Text);
    }
}