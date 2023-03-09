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
import android.widget.TableRow
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isInvisible
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

        val nameEditText = this.findViewById<EditText>(R.id.name);
        nameEditText.imeOptions = EditorInfo.IME_ACTION_DONE;
        nameEditText.setRawInputType(InputType.TYPE_CLASS_TEXT);

        val licenseNumberEditText = this.findViewById<EditText>(R.id.licenseNumber);
        licenseNumberEditText.imeOptions = EditorInfo.IME_ACTION_DONE;
        licenseNumberEditText.setRawInputType(InputType.TYPE_CLASS_NUMBER);

        val dobEditText = this.findViewById<EditText>(R.id.dob);
        dobEditText.imeOptions = EditorInfo.IME_ACTION_DONE;
        dobEditText.setRawInputType(InputType.TYPE_DATETIME_VARIATION_DATE);

        val issEditText = this.findViewById<EditText>(R.id.iss);
        issEditText.imeOptions = EditorInfo.IME_ACTION_DONE;
        issEditText.setRawInputType(InputType.TYPE_DATETIME_VARIATION_DATE);

        val expEditText = this.findViewById<EditText>(R.id.exp);
        expEditText.imeOptions = EditorInfo.IME_ACTION_DONE;
        expEditText.setRawInputType(InputType.TYPE_DATETIME_VARIATION_DATE);

        makeInvisible();
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

        this.findViewById<TableRow>(R.id.namerow).visibility = View.VISIBLE;
        this.findViewById<TableRow>(R.id.dobrow).visibility = View.VISIBLE;
        this.findViewById<TableRow>(R.id.licenserow).visibility = View.VISIBLE;
        this.findViewById<TableRow>(R.id.issrow).visibility = View.VISIBLE;
        this.findViewById<TableRow>(R.id.exprow).visibility = View.VISIBLE;
        this.findViewById<TableRow>(R.id.issuerow).visibility = View.VISIBLE;
        this.findViewById<TableRow>(R.id.itemrow).visibility = View.VISIBLE;
    }

    fun issueButton_click(view: View) {
        val name = this.findViewById<EditText>(R.id.name).text.toString();
        val dob = this.findViewById<EditText>(R.id.dob).text.toString();
        val licenseNumber = this.findViewById<EditText>(R.id.licenseNumber).text.toString();
        val iss = this.findViewById<EditText>(R.id.iss).text.toString();
        val exp = this.findViewById<EditText>(R.id.exp).text.toString();

        demo.issueDriversLicense(name, dob, licenseNumber, iss, exp);
        this.findViewById<Button>(R.id.issueBtn).text = "Done"
        val itemIdTextView = this.findViewById<TextView>(R.id.itemId);
        itemIdTextView.text = demo.credential;

        this.findViewById<TableRow>(R.id.verifyrow).visibility = View.VISIBLE;
        this.findViewById<TableRow>(R.id.statusrow).visibility = View.VISIBLE;
    }

    fun verifyButton_click(view: View) {
        demo.verifyItem()
        this.findViewById<TextView>(R.id.verifyStatus).text = demo.result
    }

    fun makeInvisible() {
        this.findViewById<TableRow>(R.id.namerow).visibility = View.INVISIBLE;
        this.findViewById<TableRow>(R.id.dobrow).visibility = View.INVISIBLE;
        this.findViewById<TableRow>(R.id.licenserow).visibility = View.INVISIBLE;
        this.findViewById<TableRow>(R.id.issrow).visibility = View.INVISIBLE;
        this.findViewById<TableRow>(R.id.exprow).visibility = View.INVISIBLE;
        this.findViewById<TableRow>(R.id.issuerow).visibility = View.INVISIBLE;
        this.findViewById<TableRow>(R.id.itemrow).visibility = View.INVISIBLE;
        this.findViewById<TableRow>(R.id.verifyrow).visibility = View.INVISIBLE;
        this.findViewById<TableRow>(R.id.statusrow).visibility = View.INVISIBLE;

    }
}