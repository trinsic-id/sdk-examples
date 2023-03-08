package id.trinsic.android

import android.util.Log
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import trinsic.services.TrinsicService
import trinsic.services.account.v1.LoginRequest
import trinsic.services.account.v1.LoginResponse
import trinsic.services.universalwallet.v1.SearchRequest
import trinsic.services.verifiablecredentials.v1.CreateProofRequest
import trinsic.services.verifiablecredentials.v1.IssueFromTemplateRequest
import trinsic.services.verifiablecredentials.v1.SendRequest
import trinsic.services.verifiablecredentials.v1.VerifyProofRequest
import java.lang.reflect.Type

class DriversLicenseDemo {
    val service = TrinsicService(null)

    private lateinit var profile: LoginResponse
    private lateinit var email: String

    lateinit var authToken: String
    lateinit var result: String
    lateinit var credential: String

    fun login(email: String) {
        profile = service.account().login(
            LoginRequest.newBuilder().setEmail(email).setEcosystemId("default").build()
        ).get()
        this.email = email
        Log.d("Login", "Login started, check email for code")
    }

    fun loginConfirm(code: String) {
        authToken = service.account().loginConfirm(profile.challenge, code).get()
        Log.d("Login", "Login complete, account unprotected")
        service.setAuthToken(authToken)
    }

    @Throws(JSONException::class)
    fun JSONObject.toMap(): Map<String, Any> {
        val map = mutableMapOf<String, Any>()
        val keysItr: Iterator<String> = this.keys()
        while (keysItr.hasNext()) {
            val key = keysItr.next()
            var value: Any = this.get(key)
            when (value) {
                is JSONArray -> value = value.toList()
                is JSONObject -> value = value.toMap()
            }
            map[key] = value
        }
        return map
    }

    @Throws(JSONException::class)
    fun JSONArray.toList(): List<Any> {
        val list = mutableListOf<Any>()
        for (i in 0 until this.length()) {
            var value: Any = this[i]
            when (value) {
                is JSONArray -> value = value.toList()
                is JSONObject -> value = value.toMap()
            }
            list.add(value)
        }
        return list
    }

    fun issueDriversLicense(
        name: String,
        dob: String,
        licenseNumber: String,
        iss: String,
        exp: String
    ) {
        val templateId = "https://schema.trinsic.cloud/default/driverslicensesdksample";

        val valuesMap = HashMap<String, String>();
        valuesMap["name"] = name;
        valuesMap["dob"] = dob;
        valuesMap["licenseNumber"] = licenseNumber;
        valuesMap["iss"] = iss;
        valuesMap["exp"] = exp;

        val valuesJson = Gson().toJson(valuesMap);
        Log.i("DEMO", valuesJson);

        val issueResponse = service.credential().issueFromTemplate(
            IssueFromTemplateRequest.newBuilder()
                .setTemplateId(templateId)
                .setValuesJson(valuesJson)
                .build())
            .get();

        credential = issueResponse.documentJson

        service.credential().send(
            SendRequest.newBuilder()
                .setDocumentJson(credential)
                .setEmail(email)
                .build());

        Log.i("DEMO", credential);
    }

    fun verifyItem() {
        val createProofResponse = service.credential().createProof(
            CreateProofRequest.newBuilder()
                .setDocumentJson(credential)
                .build())
            .get();

        val verifyProofResponse = service.credential().verifyProof(
            VerifyProofRequest.newBuilder()
                .setProofDocumentJson(createProofResponse.proofDocumentJson).build())
            .get();

        Log.i("DEMO", Gson().toJson(verifyProofResponse));


        if (verifyProofResponse.isValid) {
            result = "Credential was verified!";
        } else {
            result = "Credential rejected.";
        }
    }
}