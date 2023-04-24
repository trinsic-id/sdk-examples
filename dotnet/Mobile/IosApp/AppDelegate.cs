namespace IosApp;

using Trinsic;

[Register("AppDelegate")]
public class AppDelegate : UIApplicationDelegate
{
    public override UIWindow? Window
    {
        get;
        set;
    }

    public override bool FinishedLaunching(UIApplication application, NSDictionary launchOptions)
    {
        // create a new window instance based on the screen size
        Window = new UIWindow(UIScreen.MainScreen.Bounds);

        // create a UIViewController with a single UILabel
        var vc = new UIViewController();
        vc.View!.AddSubview(new UILabel(Window!.Frame)
        {
            BackgroundColor = UIColor.White,
            TextAlignment = UITextAlignment.Center,
            Text = "Hello, iOS!"
        });
        Window.RootViewController = vc;

        // make the window visible
        Window.MakeKeyAndVisible();

        SignIn();

        return true;
    }

    private static async void SignIn()
    {
        var trinsicService = new TrinsicService();
        var newWallet = await trinsicService.Wallet.CreateWalletAsync(new() {EcosystemId ="default"});
        trinsicService.Options.AuthToken = newWallet.AuthToken;
        Console.WriteLine($"AuthToken: {newWallet.AuthToken}");

        var items = await trinsicService.Wallet.SearchAsync(new());
        Console.WriteLine($"Items: {items}");
    }
}