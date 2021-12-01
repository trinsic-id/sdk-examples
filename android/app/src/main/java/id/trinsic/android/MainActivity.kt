package id.trinsic.android

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.google.protobuf.ByteString
import trinsic.TrinsicUtilities
import trinsic.okapi.DidKey
import trinsic.okapi.keys.v1.Keys
import trinsic.services.AccountService
import trinsic.services.CredentialsService
import trinsic.services.WalletService
import trinsic.services.account.v1.AccountOuterClass


class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    @SuppressLint("SetTextI18n")
    fun testServicesButtonClick(view: View) {
        val config = TrinsicUtilities.getConfigFromUrl("http://staging-internal-unproxied.trinsic.cloud:80")
        val accountService = AccountService(null, config)
        val walletService = WalletService(null, config)
        val credentialsService = CredentialsService(null, config)

        // SETUP ACTORS
        // Create 3 different profiles for each participant in the scenario

        // SETUP ACTORS
        // Create 3 different profiles for each participant in the scenario
        val allison: AccountOuterClass.AccountProfile = accountService.signIn(null).profile
        val clinic: AccountOuterClass.AccountProfile = accountService.signIn(null).profile
        val airline: AccountOuterClass.AccountProfile = accountService.signIn(null).profile

        // ISSUE CREDENTIAL
        // Sign a credential as the clinic and send it to Allison

        // ISSUE CREDENTIAL
        // Sign a credential as the clinic and send it to Allison
        credentialsService.profile = clinic
        val credentialJson = Gson().fromJson(view.context.assets.open("vaccination-certificate-unsigned.jsonld").bufferedReader(), java.util.HashMap::class.java)

        val credential = credentialsService.issueCredential(credentialJson)

        println("Credential: $credential")

        // STORE CREDENTIAL
        // Alice stores the credential in her cloud wallet.

        // STORE CREDENTIAL
        // Alice stores the credential in her cloud wallet.
        walletService.profile = allison
        val itemId = walletService.insertItem(credential)
        println("item id = $itemId")

        // SHARE CREDENTIAL
        // Allison shares the credential with the venue.
        // The venue has communicated with Allison the details of the credential
        // that they require expressed as a JSON-LD frame.

        // SHARE CREDENTIAL
        // Allison shares the credential with the venue.
        // The venue has communicated with Allison the details of the credential
        // that they require expressed as a JSON-LD frame.
        credentialsService.profile = allison

        val proofRequestJson = Gson().fromJson(view.context.assets.open("vaccination-certificate-frame.jsonld").bufferedReader(), java.util.HashMap::class.java)

        val credentialProof = credentialsService.createProof(itemId, proofRequestJson)

        println("Proof: {credential_proof}")

        // VERIFY CREDENTIAL
        // The airline verifies the credential

        // VERIFY CREDENTIAL
        // The airline verifies the credential
        credentialsService.profile = airline
        val valid = credentialsService.verifyProof(credentialProof)

        this.findViewById<TextView>(R.id.generateKeySeed123Text).text = ("Verification result: $valid")
    }

    fun generateKey123ButtonClick(view: View) {
        val request: Keys.GenerateKeyRequest =
            Keys.GenerateKeyRequest.newBuilder()
                .setKeyType(Keys.KeyType.KEY_TYPE_ED25519)
                .setSeed(ByteString.copyFrom(byteArrayOf(1, 2, 3)))
                .build()

        val response: Keys.GenerateKeyResponse = DidKey.generate(request)

        val textView = this.findViewById<TextView>(R.id.generateKeySeed123Text)
        textView.text = response.toString()
    }
}