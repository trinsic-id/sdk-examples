using System;
using System.Threading;
using System.Threading.Tasks;
using Android.Content;
using Android.Net;
using IdentityModel.OidcClient.Browser;
using Java.Net;
using Java.Security.Cert;
using Microsoft.Maui.Controls;
using static Android.Graphics.ImageDecoder;

namespace MauiVerifier
{
    public class PlatformBrowser : IBrowser
    {
        public static TaskCompletionSource<BrowserResult> Source;
        public PlatformBrowser()
        {
        }

        public Task<BrowserResult> InvokeAsync(BrowserOptions options, CancellationToken cancellationToken = default)
        {
            Source = new TaskCompletionSource<BrowserResult>();

            try
            {
                var intent = new Intent(Intent.ActionView, Android.Net.Uri.Parse(options.StartUrl))
                    .SetFlags(ActivityFlags.NoHistory)
                    .SetFlags(ActivityFlags.NewTask);

                Android.App.Application.Context.StartActivity(intent);

                return Source.Task;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public static void ProcessCallback(Intent intent)
        {
            if (Source != null)
            {
                Source.SetResult(new BrowserResult
                {
                    Response = intent.DataString,
                    ResultType = BrowserResultType.Success
                });

                Source = null;
            }
            else
            {
                Console.WriteLine("Warning: PlatformBrowser callback invoked, but Source is null");
            }
        }
    }
}

