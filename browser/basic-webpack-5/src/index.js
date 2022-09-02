import { AccountService } from "@trinsic/trinsic/browser";

async function signIn() {

    const accountService = new AccountService();
    const authenticationToken = await accountService.loginAnonymous();
    const accountInfo = await accountService.getInfo();

    document.getElementById("accountInfo").innerText = JSON.stringify(accountInfo, null, 4);
    document.getElementById("authToken").innerText = authenticationToken;
}

signIn();