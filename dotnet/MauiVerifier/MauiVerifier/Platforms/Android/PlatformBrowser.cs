using System;
using System.Threading;
using System.Threading.Tasks;
using Android.Content;
using Android.Net;
using IdentityModel.OidcClient.Browser;
using Microsoft.Maui.Controls;

namespace MauiVerifier
{
    public class PlatformBrowser : IBrowser
    {
        public PlatformBrowser()
        {
        }

        public async Task<BrowserResult> InvokeAsync(BrowserOptions options, CancellationToken cancellationToken = default)
        {
            try
            {
                Intent intent = new Intent(Intent.ActionView, Android.Net.Uri.Parse(options.StartUrl));
                intent.SetFlags(ActivityFlags.NoHistory);
                intent.SetFlags(ActivityFlags.NewTask);

                Android.App.Application.Context.StartActivity(intent);

                await Task.CompletedTask;

                return new BrowserResult
                {
                    Response = "OK",
                    ResultType = BrowserResultType.Success
                };
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}

