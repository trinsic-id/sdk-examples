import {
  IdentityProvider,
  TrinsicService
} from "@trinsic/trinsic";

import * as rlsync from "readline-sync";

const localOptions = {serverUseTls: false,
  serverEndpoint:"127.0.0.1", serverPort: 5000};
const devOptions = {serverUseTls: true, serverEndpoint: "dev-internal.trinsic.cloud", serverPort: 443}

async function confirmUnauthenticated() {
  let service = new TrinsicService(devOptions);
  const ecosystemId = "default";
  let addEmail = await service.wallet().addExternalIdentityInit({
    identity: "jp+test3@trinsic.id",
    provider: IdentityProvider.EMAIL,
  });
}

async function signedInSearch() {
  let service = new TrinsicService({serverUseTls: false,
  serverEndpoint:"localhost", serverPort: 5000});
  // let createWalletResponse = await service.wallet().createWallet({
  //   ecosystemId: "default"
  // });
  let addEmail = await service.wallet().authenticateInit({
    identity: "polygonguru@gmail.com",
    provider: IdentityProvider.EMAIL,
    ecosystemId: "default"
  })
  let code =
    rlsync.question("Enter the security code sent to your email:") ?? "";
  let emailConfirmed = await service
    .wallet().authenticateConfirm({
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

confirmUnauthenticated()
  .then()
  .catch((reason) => console.error(reason));
