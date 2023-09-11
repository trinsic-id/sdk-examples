import { TrinsicService } from "@trinsic/trinsic";

async function signIn() {
    const trinsic = new TrinsicService();
    const createWalletResponse = await trinsic.wallet().createWallet({ ecosystemId: "default" });
    trinsic.setAuthToken(createWalletResponse.authToken);
    const accountInfo = await trinsic.wallet().getMyInfo({});

    document.getElementById("accountInfo").innerText = JSON.stringify(accountInfo, null, 4);
    document.getElementById("authToken").innerText = createWalletResponse.authToken;
}

signIn();