package id.trinsic.android

import android.util.Log
import com.google.gson.Gson
import com.google.gson.internal.LinkedTreeMap
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import trinsic.services.AccountService
import trinsic.services.TrinsicService
import trinsic.services.account.v1.AccountDetails
import trinsic.services.account.v1.AccountOuterClass
import trinsic.services.account.v1.SignInRequest
import trinsic.services.universalwallet.v1.SearchRequest
import trinsic.services.universalwallet.v1.UniversalWalletOuterClass
import trinsic.services.verifiablecredentials.v1.CreateProofRequest
import trinsic.services.verifiablecredentials.v1.SendRequest
import trinsic.services.verifiablecredentials.v1.VerifiableCredentials

class DriversLicenseDemo {
    val service = TrinsicService(null)

    private lateinit var allison: String
    private lateinit var allisonUnprotected: String
    private lateinit var credentialProof: Map<String, Any>

    fun signin(email: String) {
        allison = service.account().signIn(
            SignInRequest.newBuilder()
                .setDetails(AccountDetails.newBuilder().setEmail(email).build())
                .build()
        ).get()
        Log.d("Login", "Login started, check email for code")
    }

    fun unprotectAccount(code: String) {
        allisonUnprotected = AccountService.unprotect(allison, code)
        Log.d("Login", "Login complete, account unprotected")
        service.setProfile(allisonUnprotected)
    }

    fun getLatestCredential(): HashMap<*, *> {
        val walletContents =
            service.wallet().search(SearchRequest.getDefaultInstance()).get()
        val driversLicenseCred = walletContents.itemsList.map { jsonString: String ->
            Gson().fromJson(jsonString, HashMap::class.java)
        }.sortedBy { jsonData: Map<*, *> ->
            ((jsonData["data"] as Map<*, *>)["proof"] as Map<*, *>)["created"] as String
        }.last { jsonData: Map<*, *> ->
            val data = jsonData["data"] as Map<*, *>
            val typeList = data["type"] as List<*>
            typeList.any { x ->
                x == "Iso18013DriversLicenseCredential"
            }
        }

        return driversLicenseCred
    }

    fun createProof(credentialFrameString: String, itemId: String): Map<String, Any> {
        // SHARE CREDENTIAL
        val createProofResponse = service.credential().createProof(
            CreateProofRequest.newBuilder()
                .setDocumentJson(credentialFrameString).setItemId(itemId).build()
        ).get()
        val proof =
            Gson().fromJson(createProofResponse.proofDocumentJson, java.util.HashMap::class.java)
        println("Proof: $proof")
        this.credentialProof = proof.mapKeys { x -> x.key.toString() }
        return this.credentialProof
    }

    fun sendCredential(sendToEmail: String) {
        val hashMap = java.util.HashMap<Any, Any>()
        this.credentialProof.forEach { (t, u) -> hashMap[t] = u }
        val docJson = Gson().toJson(hashMap)
        service.credential().send(
            SendRequest.newBuilder().setEmail(sendToEmail)
                .setDocumentJson(docJson).build()
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