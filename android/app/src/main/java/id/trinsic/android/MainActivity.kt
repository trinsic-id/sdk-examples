package id.trinsic.android

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.protobuf.ByteString
import trinsic.okapi.DidKey
import trinsic.okapi.keys.v1.Keys


class MainActivity : AppCompatActivity() {
    val demo = DriversLicenseDemo()
    var credential: HashMap<*, *>? = null
    var credentialId: String? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        demo.setupActors()
    }

    fun issueCredential_Click(view: View) {
        credential = demo.issueCredential(view.context.assets.open("drivers-license-unsigned.json").bufferedReader().readText())
        // TODO - Push to display
        this.findViewById<TextView>(R.id.credentialView).text = credential.toString()
    }

    fun saveCredential_Click(view: View) {
        credentialId = demo.saveCredential(credential!!)
        // TODO - Push to display

        this.findViewById<TextView>(R.id.credentialIdView).text = credentialId
    }

    fun loadCredential_Click(view: View) {
        // TODO - Lucas, can you make this load from local device store?
    }

    fun provideProof_Click(view: View) {
        val isProven = demo.createAndVerifyProof(view.context.assets.open("drivers-license-frame.json").bufferedReader().readText(), credentialId!!)
        // TODO - Push to display

        this.findViewById<TextView>(R.id.verifyResultView).text = ("Is Proven = $isProven")
    }

    fun generateKey123ButtonClick(view: View) {
        val request: Keys.GenerateKeyRequest =
            Keys.GenerateKeyRequest.newBuilder()
                .setKeyType(Keys.KeyType.KEY_TYPE_ED25519)
                .setSeed(ByteString.copyFrom(byteArrayOf(1, 2, 3)))
                .build()

        val response: Keys.GenerateKeyResponse = DidKey.generate(request)

        println("Generated Key Response = $response")
    }
}