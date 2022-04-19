import {
  WalletService,
  AccountService,
  SignInRequest,
  AccountDetails,
  AccountProfile
} from "@trinsic/trinsic";

import * as rlsync from "readline-sync";


async function main() {
  console.log(["038205"]);
  let accountService = new AccountService();
  let base64Profile = await accountService.signIn(new SignInRequest())
  accountService.options.setAuthToken(base64Profile);

  let walletService = new WalletService(accountService.options);
  let searchResponse = await walletService.search();
  console.log(searchResponse.getItemsList());
  console.log("Search complete");

  base64Profile = await accountService.signIn(new SignInRequest().setDetails(new AccountDetails().setEmail("scott.phillips@trinsic.id").setName("Scott Phillips")))
  let code = rlsync.question("Enter the security code sent to your email:") ?? "";
  let p = AccountProfile.deserializeBinary(Buffer.from(base64Profile, "base64url"));
  let profile = await AccountService.unprotect(p, new TextEncoder().encode(code));
  accountService.options.setAuthToken(profile)

  walletService = new WalletService(accountService.options);
  searchResponse = await walletService.search();
  console.log(searchResponse.getItemsList());
  console.log("Signed in Search complete");
}

main().then().catch(reason => console.error(reason))