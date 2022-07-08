import {
  TrinsicService
} from "@trinsic/trinsic";

import * as rlsync from "readline-sync";


async function main() {
  let service = new TrinsicService();
  await service.account().loginAnonymous()

  let searchResponse = await service.wallet().search();
  console.log(searchResponse.items);
  console.log("Search complete");

  let loginResponse = await service.account().login({email: "scott.phillips@trinsic.id", ecosystemId: "", invitationCode: ""})
  let code = rlsync.question("Enter the security code sent to your email:") ?? "";
  let loginConfirmResponse = await service.account().loginConfirm(loginResponse.challenge, code);

  searchResponse = await service.wallet().search();
  console.log(searchResponse.items);
  console.log("Signed in Search complete");
}

main().then().catch(reason => console.error(reason))