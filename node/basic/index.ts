import {IdentityProvider, TrinsicService} from "@trinsic/trinsic";

import * as rlsync from "readline-sync";

async function signedInSearch() {
  let service = new TrinsicService();
  let loginResponse = await service.wallet().createWallet({
    ecosystemId: "default"
  });
  let addEmail = await service.wallet().addExternalIdentityInit({
    identity: "scott.phillips@trinsic.id",
    provider: IdentityProvider.EMAIL
  })
  let code =
    rlsync.question("Enter the security code sent to your email:") ?? "";
  let emailConfirmed = await service
    .wallet().addExternalIdentityConfirm({
        challenge: addEmail.challenge,
        response: code
      });

  let searchResponse = await service.wallet().searchWallet();
  console.log(searchResponse.items);
  console.log("Signed in Search complete");
}

async function main() {
  let service = new TrinsicService();
  const createWalletResponse = await service.wallet().createWallet({ecosystemId:"default"})
  console.log("Wallet Created", createWalletResponse)
  service.setAuthToken(createWalletResponse.authToken!);

  let searchResponse = await service.wallet().searchWallet();
  console.log(searchResponse.items);
  console.log("Search complete");
}

main()
  .then()
  .catch((reason) => console.error(reason));
