package id.trinsic.android

import android.os.Bundle
import android.text.InputType
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.google.protobuf.ByteString
import org.json.JSONObject
import trinsic.okapi.DidKey
import trinsic.okapi.keys.v1.Keys


class MainActivity : AppCompatActivity() {
    val demo = DriversLicenseDemo()
    var credential: HashMap<*, *>? = null
    var credentialId: String? = null
    var proofDocument: HashMap<*, *>? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val providedCredentialText = this.findViewById<EditText>(R.id.providedCredentialText)
        providedCredentialText.imeOptions = EditorInfo.IME_ACTION_DONE
        providedCredentialText.setRawInputType(InputType.TYPE_CLASS_TEXT)

        demo.setupActors()
    }

    fun issueCredential_Click(view: View) {
        credential = demo.issueCredential(view.context.assets.open("drivers-license-unsigned.json").bufferedReader().readText())
        // Push to display
        this.findViewById<TextView>(R.id.credentialView).text = JSONObject(credential).toString(2)
    }

    fun saveCredential_Click(view: View) {
        if (credential == null) {
            // TODO - Import from text view.
            credential = Gson().fromJson(this.findViewById<EditText>(R.id.providedCredentialText).text.toString(), java.util.HashMap::class.java)
        }
        credentialId = demo.saveCredential(credential!!)
        // TODO - Push to display

        this.findViewById<TextView>(R.id.credentialIdView).text = credentialId
    }

    fun loadCredential_Click(view: View) {
        // TODO - Lucas, can you make this load from local device store?
    }

    fun provideProof_Click(view: View) {
        proofDocument = demo.createProof(
            view.context.assets.open("drivers-license-frame.json").bufferedReader().readText(),
            credentialId!!
        )
        // Push to display
        this.findViewById<TextView>(R.id.credentialView).text = JSONObject(proofDocument).toString() // provide indent spaces for pretty-print, turned off for demo.
    }
    fun verifyProof_Click(view: View) {
        val isProven = demo.verifyProof(proofDocument!!)
        this.findViewById<TextView>(R.id.verifyResultView).text = ("Is Proven = $isProven")
    }

    fun generateKey123ButtonClick(view: View) {
        val request: Keys.GenerateKeyRequest =
            Keys.GenerateKeyRequest.newBuilder()
                .setKeyType(Keys.KeyType.KEY_TYPE_ED25519)
                .setSeed(ByteString.copyFrom(byteArrayOf(1, 2, 3)))
                .build()

        val response: Keys.GenerateKeyResponse = DidKey.generate(request)

        this.findViewById<TextView>(R.id.credentialView).text = response.toString()
    }
}