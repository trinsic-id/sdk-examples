import {TrinsicService} from "@trinsic/trinsic";

async function signIn() {

    const trinsicService = new TrinsicService();
    const createWalletResponse = await trinsicService.wallet().createWallet({ecosystemId:"default"});
    trinsicService.setAuthToken(createWalletResponse.authToken);
    const accountInfo = await trinsicService.wallet().getMyInfo({});

    document.getElementById("accountInfo").innerText = JSON.stringify(accountInfo, null, 4);
    document.getElementById("authToken").innerText = createWalletResponse.authToken;
}

signIn();