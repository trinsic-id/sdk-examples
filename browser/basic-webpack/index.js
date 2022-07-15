import { AccountService} from "@trinsic/trinsic";

async function signIn() {

    const service = new AccountService();
    const configuration = await service.signIn();

    console.log(`auth_token = ${configuration}`);

    document.getElementById("response").innerText = `auth_token = ${configuration}`
}

signIn();