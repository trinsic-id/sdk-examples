using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text.Json;
using Microsoft.Maui.Controls;

namespace MauiVerifier;

public partial class CredentialPage : ContentPage
{
    public CredentialPage(string token) {
        InitializeComponent();
        
        Token = token;
    }
    public string Token { get; set; }

    protected override void OnNavigatedTo(NavigatedToEventArgs args) {
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(Token);

        var credentialJson = jwt.Claims
            .FirstOrDefault(x => x.Type.Equals("_vp_token", StringComparison.OrdinalIgnoreCase))?
            .Value;

        if (credentialJson is null) {
            Console.WriteLine("No presentation token found.");
            return;
        }
        
        var credential = JsonSerializer.Deserialize<JsonElement>(credentialJson);

        CredentialTypeLabel.Text = ParseTitle(credential);
        ClaimsListView.ItemsSource = ParseSubjectClaims(credential);
    }
    private IEnumerable<SubjectClaim> ParseSubjectClaims(JsonElement credential) {
        if (!credential.TryGetProperty("credentialSubject", out var subjectElement) && subjectElement.ValueKind != JsonValueKind.Object) {
            return Array.Empty<SubjectClaim>();
        }
        
        return subjectElement
            .EnumerateObject()
            .Select(x => new SubjectClaim() {
                Name = x.Name,
                Value = x.Value.ToString()
            }).ToList();
    }
    private string ParseTitle(JsonElement credential) {
        if (!credential.TryGetProperty("type", out var typeElement) && typeElement.ValueKind != JsonValueKind.Array) {
            return "Invalid format";
        }
        return typeElement
            .EnumerateArray()
            .Select(x => x.GetString())
            .FirstOrDefault(x => !x!.Equals("VerifiableCredential", StringComparison.OrdinalIgnoreCase));
    }
}

public class SubjectClaim
{
    public string Value { get; set; }
    public string Name { get; set; }
}