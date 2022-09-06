using System;
using System.Threading;
using System.Threading.Tasks;
using AuthenticationServices;
using Foundation;
using IdentityModel.OidcClient.Browser;
using UIKit;

namespace MauiVerifier
{
    public class PlatformBrowser : IBrowser
    {
        public PlatformBrowser()
        {
        }

        public Task<BrowserResult> InvokeAsync(BrowserOptions options, CancellationToken cancellationToken = default)
        {
            try
            {
                var source = new TaskCompletionSource<BrowserResult>();

                var session = new ASWebAuthenticationSession(NSUrl.FromString(options.StartUrl), "mauiverifier", (url, error) =>
                {
                    if (error is not null)
                    {
                        source.SetResult(new BrowserResult
                        {
                            Error = error.LocalizedFailureReason,
                            ErrorDescription = error.LocalizedDescription,
                            ResultType = BrowserResultType.UnknownError
                        });
                    }
                    else if (url is not null)
                    {
                        source.SetResult(new BrowserResult
                        {
                            Response = url.ToString(),
                            ResultType = BrowserResultType.Success
                        });
                    }
                    else
                    {
                        source.SetResult(new BrowserResult
                        {
                            ResultType = BrowserResultType.UnknownError,
                            Error = "Empty response."
                        });
                    }
                });

                session.PresentationContextProvider = UIApplication.SharedApplication.Delegate as IASWebAuthenticationPresentationContextProviding;

                session.Start();

                return source.Task;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}

