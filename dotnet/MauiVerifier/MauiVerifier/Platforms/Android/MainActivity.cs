using Android.App;
using Android.Content.PM;
using Microsoft.Maui;
using Android.Content;
using System;
using Android.OS;

namespace MauiVerifier
{
    [Activity(Theme = "@style/Maui.SplashTheme", MainLauncher = true, LaunchMode = LaunchMode.SingleInstance, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize)]
    [IntentFilter(new[] { Intent.ActionView },
        Categories = new[] { Intent.CategoryBrowsable, Intent.CategoryDefault },
        DataSchemes = new[] { "mauiverifier" },
        DataHost = "*"
    )]
    public class MainActivity : MauiAppCompatActivity
    {
        protected override void OnNewIntent(Intent intent) => PlatformBrowser.ProcessCallback(intent);
    }
}