import { WalletService } from "@trinsic/trinsic-web";

async function generateKey() {

    const service = new WalletService("http://localhost:5000");
    const configuration = await service.getProviderConfiguration();

    console.log(configuration.toObject());

    document.getElementById("did-document").innerText = JSON.stringify(configuration.toObject(), null, "\t");
}

generateKey();