package id.trinsic.android

import com.google.gson.Gson
import trinsic.TrinsicUtilities
import trinsic.services.AccountService
import trinsic.services.CredentialsService
import trinsic.services.WalletService
import trinsic.services.account.v1.AccountOuterClass
import java.util.HashMap

class DriversLicenseDemo {
    val config = TrinsicUtilities.getConfigFromUrl("https://staging-internal.trinsic.cloud:443")
    val accountService = AccountService(null, config)
    val walletService = WalletService(null, config)
    val credentialsService = CredentialsService(null, config)

    private lateinit var allison: AccountOuterClass.AccountProfile
    private lateinit var motorVehicleDepartment: AccountOuterClass.AccountProfile
    lateinit var policeOfficer: AccountOuterClass.AccountProfile

    fun setupActors() {
        // SETUP ACTORS
        allison = accountService.signIn(null).profile
        motorVehicleDepartment = accountService.signIn(null).profile
        policeOfficer = accountService.signIn(null).profile
    }

    fun issueCredential(credentialString: String): HashMap<*, *>? {
        // ISSUE CREDENTIAL
        credentialsService.profile = motorVehicleDepartment
        val credentialJson = Gson().fromJson(
            credentialString,
            java.util.HashMap::class.java
        )
        val credential = credentialsService.issueCredential(credentialJson)
        println("Credential: $credential")

        return credential
    }

    fun saveCredential(credential: HashMap<*, *>): String {
        // STORE CREDENTIAL
        walletService.profile = allison
        val itemId = walletService.insertItem(credential)
        println("item id = $itemId")

        return itemId

        // TODO - Lucas, please make this save to local device store
    }

    fun createAndVerifyProof(credentialFrameString: String, itemId: String): Boolean {
        // SHARE CREDENTIAL
        credentialsService.profile = allison
        val proofRequestJson = Gson().fromJson(
            credentialFrameString,
            java.util.HashMap::class.java
        )
        val credentialProof = credentialsService.createProof(itemId, proofRequestJson)
        println("Proof: {credential_proof}")

        // TODO - Verify on a different device?
        // VERIFY CREDENTIAL
        credentialsService.profile = policeOfficer
        return credentialsService.verifyProof(credentialProof)
    }
}