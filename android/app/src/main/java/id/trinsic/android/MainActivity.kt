package id.trinsic.android

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.os.Bundle
import android.text.InputType
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONObject


class MainActivity : AppCompatActivity() {
    val demo = DriversLicenseDemo()
    var credentialId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val emailEditText = this.findViewById<EditText>(R.id.email)
        emailEditText.imeOptions = EditorInfo.IME_ACTION_DONE
        emailEditText.setRawInputType(InputType.TYPE_CLASS_TEXT)
    }

    fun signinButton_click(view: View) {
        val emailEditText = this.findViewById<EditText>(R.id.email)
        demo.signin(emailEditText.text.toString())
    }

    fun unprotectButton_click(view: View) {
        val oberonEditText = this.findViewById<EditText>(R.id.oberonCode)
        demo.unprotectAccount(oberonEditText.text.toString())
    }

    fun createProofButton_click(view: View) {
        val credential = demo.getLatestCredential()
        credentialId = credential["id"]?.stringValue
        val proof = demo.createProof(this.assets.open("drivers-license-frame.json").bufferedReader().readText(), credentialId!!)
        val proofJson = JSONObject(proof).toString()

        val proofTextView = this.findViewById<TextView>(R.id.credentialProofText)
        proofTextView.text = proofJson

        val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = ClipData.newPlainText("proof JSON", proofJson)
        clipboard.setPrimaryClip(clip)
    }

    fun sendCredentialButton_click(view: View) {
        val targetEmailEditText = this.findViewById<TextView>(R.id.targetEmail)
        demo.sendCredential(targetEmailEditText.text.toString())
    }
}