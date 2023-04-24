using System;
using System.IO;
using System.Linq;
using FluentAssertions;
using Trinsic;
using Trinsic.Services.Account.V1;
using Trinsic.Services.Provider.V1;
using Trinsic.Services.UniversalWallet.V1;
using Trinsic.Services.VerifiableCredentials.V1;

const string VaccinationCertificateUnsigned = "vaccination-certificate-unsigned.jsonld";
const string VaccinationCertificateFrame = "vaccination-certificate-frame.jsonld";

var trinsicService = new TrinsicService();

// createAccountService() {
var (ecosystem, _) = trinsicService.Provider.CreateEcosystem(new CreateEcosystemRequest());
var ecosystemId = ecosystem.Id;
// }

// SETUP ACTORS
// Create 3 different profiles for each participant in the scenario
// setupActors() {
var allison = await trinsicService.Wallet.CreateWalletAsync(new() { EcosystemId = ecosystemId });
var clinic = await trinsicService.Wallet.CreateWalletAsync(new() { EcosystemId = ecosystemId });
var airline = await trinsicService.Wallet.CreateWalletAsync(new() { EcosystemId = ecosystemId });
// }

trinsicService.Options.AuthToken = clinic.AuthToken;
var info = await trinsicService.Wallet.GetMyInfoAsync(new());
info.Should().NotBeNull();

// ISSUE CREDENTIAL
// Sign a credential as the clinic and send it to Allison
// issueCredential() {
// Set active profile to 'clinic' so we can issue credential signed
// with the clinic's signing keys
trinsicService.Options.AuthToken = clinic.AuthToken;

// Read the JSON credential data
var credentialJson = await File.ReadAllTextAsync(VaccinationCertificateUnsigned);
// Sign the credential using BBS+ signature scheme
var credential = await trinsicService.Credential.IssueAsync(new IssueRequest { DocumentJson = credentialJson });
Console.WriteLine($"Credential:\n{credential.SignedDocumentJson}");
// }

// storeAndRecallProfile {
// Serialize auth token by exporting it to file
File.WriteAllText("allison.txt", allison.AuthToken);
// Create auth token from existing data
allison.AuthToken = File.ReadAllText("allison.txt");
// }

// STORE CREDENTIAL
// Allison stores the credential in her cloud wallet.
// storeCredential() {
// Set active profile to 'allison' so we can manage her cloud wallet
trinsicService.Options.AuthToken = allison.AuthToken;

var insertItemResponse = await trinsicService.Wallet.InsertItemAsync(new InsertItemRequest { ItemJson = credential.SignedDocumentJson });
var walletItems = await trinsicService.Wallet.SearchAsync(new SearchRequest() {Query = "SELECT * FROM _"});
Console.WriteLine($"Last wallet item:\n{walletItems.Items.ToList().Last()}");
// }

// SHARE CREDENTIAL
// Allison shares the credential with the venue.
// The venue has communicated with Allison the details of the credential
// that they require expressed as a JSON-LD frame.
// shareCredential() {
// We'll read the request frame from a file and communicate this with Allison

var proofRequestJson = await File.ReadAllTextAsync(VaccinationCertificateFrame);

// Build a proof for the given request and the `itemId` we previously received
// which points to the stored credential
var credentialProof = await trinsicService.Credential.CreateProofAsync(new CreateProofRequest
{
    ItemId = insertItemResponse.ItemId,
    RevealDocumentJson = proofRequestJson
});
Console.WriteLine("Proof:");
Console.WriteLine(credentialProof.ProofDocumentJson);
// }


// VERIFY CREDENTIAL
// verifyCredential() {
// The airline verifies the credential
trinsicService.Options.AuthToken = airline.AuthToken;

// Check for valid signature
var verifyProofResponse = await trinsicService.Credential.VerifyProofAsync(new VerifyProofRequest
{
    ProofDocumentJson = credentialProof.ProofDocumentJson
});
var validationResult = verifyProofResponse.ValidationResults["SignatureVerification"].IsValid;
Console.WriteLine($"Verification result: {validationResult}");
validationResult.Should().BeTrue();
// }