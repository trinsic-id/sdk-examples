using System;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Trinsic;

// createAccountService() {
var _options = new ServiceOptions() {
    ServerEndpoint = "prod.trinsic.cloud"
    ServerPort = 443
    ServerUseTls = true
};
var providerService = new ProviderService(_options.Clone());
var accountService = new AccountService(_options.Clone());
var (ecosystem, _) = providerService.CreateEcosystem(new());
var ecosystemId = ecosystem.Id;
// }

// SETUP ACTORS
// Create 3 different profiles for each participant in the scenario
// setupActors() {
var allison = await accountService.SignInAsync(new() {EcosystemId = ecosystemId});
var clinic = await accountService.SignInAsync(new() {EcosystemId = ecosystemId});
var airline = await accountService.SignInAsync(new() {EcosystemId = ecosystemId});
// }

accountService.Options.AuthToken = clinic;
var info = await accountService.GetInfoAsync();
info.Should().NotBeNull();

// createService() {
var walletService = new WalletService(_options.CloneWithAuthToken(allison));
var credentialsService = new CredentialsService(_options.CloneWithAuthToken(clinic));
// }

// ISSUE CREDENTIAL
// Sign a credential as the clinic and send it to Allison
// issueCredential() {
// Set active profile to 'clinic' so we can issue credential signed
// with the clinic's signing keys
walletService.Options.AuthToken = credentialsService.Options.AuthToken = clinic;

// Read the JSON credential data
var credentialJson = await File.ReadAllTextAsync(VaccinationCertificateUnsigned);
// Sign the credential using BBS+ signature scheme
var credential = await credentialsService.IssueCredentialAsync(new() {DocumentJson = credentialJson});
Console.WriteLine($"Credential:\n{credential.SignedDocumentJson}");
// }

// storeAndRecallProfile {
// Serialize auth token by exporting it to file
File.WriteAllText("allison.txt", allison);
// Create auth token from existing data
allison = File.ReadAllText("allison.txt");
// }

// STORE CREDENTIAL
// Allison stores the credential in her cloud wallet.
// storeCredential() {
// Set active profile to 'allison' so we can manage her cloud wallet
walletService.Options.AuthToken = credentialsService.Options.AuthToken = allison;

var itemId = await walletService.InsertItemAsync(new() {ItemJson = credential.SignedDocumentJson});
var walletItems = await walletService.SearchAsync();
Console.WriteLine($"Last wallet item:\n{walletItems.Items.Last()}");
// }

// SHARE CREDENTIAL
// Allison shares the credential with the venue.
// The venue has communicated with Allison the details of the credential
// that they require expressed as a JSON-LD frame.
// shareCredential() {
// We'll read the request frame from a file and communicate this with Allison
walletService.Options.AuthToken = credentialsService.Options.AuthToken = allison;

var proofRequestJson = await File.ReadAllTextAsync(VaccinationCertificateFrame);

// Build a proof for the given request and the `itemId` we previously received
// which points to the stored credential
var credentialProof = await credentialsService.CreateProofAsync(new() {
    ItemId = itemId,
    RevealDocumentJson = proofRequestJson
});
Console.WriteLine("Proof:");
Console.WriteLine(credentialProof.ProofDocumentJson);
// }


// VERIFY CREDENTIAL
// verifyCredential() {
// The airline verifies the credential
walletService.Options.AuthToken = credentialsService.Options.AuthToken = airline;

// Check for valid signature
var valid = await credentialsService.VerifyProofAsync(new() {
    ProofDocumentJson = credentialProof.ProofDocumentJson
});
Console.WriteLine($"Verification result: {valid}");
Assert.True(valid);
// }