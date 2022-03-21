import { AccountService, SignInRequest } from "@trinsic/trinsic-web";

async function signIn() {

    const service = new AccountService();
    const configuration = await service.signIn(new SignInRequest());

    console.log(`auth_token = ${configuration}`);

    document.getElementById("response").innerText = `auth_token = ${configuration}`
}

signIn();