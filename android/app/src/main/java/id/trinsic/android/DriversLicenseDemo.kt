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
import trinsic.services.verifiablecredentials.v1.SendRequest
import java.lang.reflect.Type

class DriversLicenseDemo {
    val service = TrinsicService(null)

    private lateinit var allison: LoginResponse
    private lateinit var allisonUnprotected: String
    private lateinit var credentialProofJson: String

    fun signin(email: String) {
        allison = service.account().login(
            LoginRequest.newBuilder().setEmail(email).setEcosystemId("default").build()
        ).get()
        Log.d("Login", "Login started, check email for code")
    }

    fun unprotectAccount(code: String) {
        allisonUnprotected = service.account().loginConfirm(allison.challenge, code).get()
        Log.d("Login", "Login complete, account unprotected")
        service.setAuthToken(allisonUnprotected)
    }

    fun parseJson(jsonString: String): Map<String, Any> {
        val empMapType: Type = object : TypeToken<Map<String, Any>>() {}.type
        return Gson().fromJson(jsonString, empMapType)
    }

    fun getLatestCredential(): String {
        // Note - I test this query on the python side where the iteration time is easier
        val query =
            "SELECT * FROM c WHERE ARRAY_CONTAINS(c.data.type, 'Iso18013DriversLicenseCredential') ORDER BY c.data.proof.created DESC"
        val walletContents =
            service.wallet().searchWallet(SearchRequest.newBuilder().setQuery(query).build()).get()
        return walletContents.itemsList.first() ?: ""
    }

    fun createProof(credentialFrameString: String, itemId: String): String {
        // SHARE CREDENTIAL
        val createProofResponse = service.credential().createProof(
            CreateProofRequest.newBuilder()
                .setDocumentJson(credentialFrameString).setItemId(itemId).build()
        ).get()
        this.credentialProofJson = createProofResponse.proofDocumentJson
        return this.credentialProofJson
    }

    fun sendCredential(sendToEmail: String) {
        service.credential().send(
            SendRequest.newBuilder().setEmail(sendToEmail)
                .setDocumentJson(this.credentialProofJson).build()
        )
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
}