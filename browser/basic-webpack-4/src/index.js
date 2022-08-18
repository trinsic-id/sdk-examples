import { AccountService} from "@trinsic/trinsic/lib/browser";

async function signIn() {
    
    const service = new AccountService();
    const configuration = await service.signIn();
    console.log(`auth_token = ${configuration}`);
    const info = await service.getInfo();
    console.log("Account info", info)
    
    document.getElementById("response").innerText = `auth_token = ${configuration}`
}

signIn();