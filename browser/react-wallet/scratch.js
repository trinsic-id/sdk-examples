const trinsic = require('@trinsic/trinsic');

let service = new trinsic.AccountService();
let details = new trinsic.AccountDetails();
details.setName("Michael Black");
details.setEmail("michaelblack117@gmail.com");

const main = async () => {
  let resp = await service.signIn(details);
  console.log(resp.getProfile().toObject());
}

main();