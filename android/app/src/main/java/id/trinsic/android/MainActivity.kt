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
        val allison: AccountOuterClass.AccountProfile = accountService.signIn(null).profile
        val motorVehicleDepartment: AccountOuterClass.AccountProfile = accountService.signIn(null).profile
        val policeOfficer: AccountOuterClass.AccountProfile = accountService.signIn(null).profile

        // ISSUE CREDENTIAL
        credentialsService.profile = motorVehicleDepartment
        val credentialJson = Gson().fromJson(view.context.assets.open("drivers-license-unsigned.json").bufferedReader(), java.util.HashMap::class.java)
        val credential = credentialsService.issueCredential(credentialJson)
        println("Credential: $credential")

        // STORE CREDENTIAL
        walletService.profile = allison
        val itemId = walletService.insertItem(credential)
        println("item id = $itemId")

        // SHARE CREDENTIAL
        credentialsService.profile = allison
        val proofRequestJson = Gson().fromJson(view.context.assets.open("drivers-license-frame.json").bufferedReader(), java.util.HashMap::class.java)
        val credentialProof = credentialsService.createProof(itemId, proofRequestJson)
        println("Proof: {credential_proof}")

        // VERIFY CREDENTIAL
        credentialsService.profile = policeOfficer
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