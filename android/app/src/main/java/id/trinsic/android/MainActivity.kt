package id.trinsic.android

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.os.Bundle
import android.text.InputType
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.lang.reflect.Type


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

    fun loginButton_click(view: View) {
        val emailEditText = this.findViewById<EditText>(R.id.email)
        this.findViewById<Button>(R.id.login).text = "Done"
        demo.login(emailEditText.text.toString())
    }

    fun loginConfirmButton_click(view: View) {
        val confirmationCode = this.findViewById<EditText>(R.id.confirmationCode)
        demo.loginConfirm(confirmationCode.text.toString())
        this.findViewById<Button>(R.id.confirm).text = "Done"
        val proofTextView = this.findViewById<TextView>(R.id.authToken)
        proofTextView.text = demo.authToken;
    }
}