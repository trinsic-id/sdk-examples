import { TrinsicService } from "@trinsic/trinsic";

import * as rlsync from "readline-sync";

async function signedInSearch() {
  let service = new TrinsicService();
  let loginResponse = await service.account().login({
    email: "scott.phillips@trinsic.id",
    ecosystemId: "",
    ecosystemId: "default"
  });
  let code =
    rlsync.question("Enter the security code sent to your email:") ?? "";
  let loginConfirmResponse = await service
    .account()
    .loginConfirm(loginResponse.challenge, code);

  let searchResponse = await service.wallet().searchWallet();
  console.log(searchResponse.items);
  console.log("Signed in Search complete");
}

async function main() {
  let service = new TrinsicService();
  const authenticationToken = await service.account().loginAnonymous("default");
  console.log("Authentication token", authenticationToken)

  let searchResponse = await service.wallet().searchWallet();
  console.log(searchResponse.items);
  console.log("Search complete");
}

main()
  .then()
  .catch((reason) => console.error(reason));
