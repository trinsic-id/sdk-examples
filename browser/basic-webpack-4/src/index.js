import {TrinsicService} from "@trinsic/trinsic/browser";

async function signIn() {

    const trinsicService = new TrinsicService();
    const authenticationToken = await trinsicService.account().loginAnonymous();
    const accountInfo = await trinsicService.account().getInfo();

    document.getElementById("accountInfo").innerText = JSON.stringify(accountInfo, null, 4);
    document.getElementById("authToken").innerText = authenticationToken;
}

signIn();