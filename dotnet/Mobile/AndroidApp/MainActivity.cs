using Trinsic;

namespace AndroidApp
{
    [Activity(Label = "@string/app_name", MainLauncher = true)]
    public class MainActivity : Activity
    {
        protected override void OnCreate(Bundle? savedInstanceState)
        {
            base.OnCreate(savedInstanceState);

            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.activity_main);

            SignIn();
        }

        private static async void SignIn()
        {
            var trinsicService = new TrinsicService();
            var newWallet = await trinsicService.Wallet.CreateWalletAsync(new() { EcosystemId = "default" });
            trinsicService.Options.AuthToken = newWallet.AuthToken;
            Console.WriteLine($"AuthToken: {newWallet.AuthToken}");

            var items = await trinsicService.Wallet.SearchAsync(new());

            Console.WriteLine($"Items: {items}");
        }
    }
}