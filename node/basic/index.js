import { WalletService, AccountService } from "@trinsic/trinsic";

async function accountSignIn() {

  // sign in with new account
  const service = new AccountService();
  const response = await service.signIn();

  console.log(response.toObject());

  // insert a JSON item in the wallet
  const profile = response.getProfile();
  const walletService = new WalletService({ profile });
  const itemId = await walletService.insertItem({
    "item": "examle",
    "valid": true
  });

  console.log(`Item inserted: ${itemId}`)
}

accountSignIn();
