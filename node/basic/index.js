import trinsic from "@trinsic/trinsic";
const { WalletService } = trinsic;

async function getConfig() {

  const service = new WalletService();
  const configuration = await service.getProviderConfiguration();

  console.log(configuration);
}

getConfig();
