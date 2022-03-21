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
            var accountService = new AccountService();
            var authToken = await accountService.SignInAsync(new());

            Console.WriteLine($"AuthToken: {authToken}");

            var walletService = new WalletService();
            var items = await walletService.SearchAsync();

            Console.WriteLine($"Items: {items}");
        }
    }
}