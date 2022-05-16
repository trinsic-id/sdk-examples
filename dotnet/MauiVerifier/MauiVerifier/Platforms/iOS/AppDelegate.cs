using System.Linq;
using AuthenticationServices;
using Foundation;
using Microsoft.Maui;
using Microsoft.Maui.Hosting;
using UIKit;

namespace MauiVerifier
{
    [Register("AppDelegate")]
    public class AppDelegate : MauiUIApplicationDelegate,  IASWebAuthenticationPresentationContextProviding
    {
        protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
        
        public UIWindow GetPresentationAnchor(ASWebAuthenticationSession session) {
            return UIApplication.SharedApplication.ConnectedScenes
                .ToArray()
                .OfType<UIWindowScene>()
                .SelectMany(scene => scene.Windows)
                .First(window => window.IsKeyWindow);
        }
    }
}