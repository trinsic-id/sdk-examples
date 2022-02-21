package id.trinsic.android

import android.util.Log
import com.google.gson.Gson
import com.google.protobuf.Value
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import trinsic.TrinsicUtilities
import trinsic.services.AccountService
import trinsic.services.CredentialsService
import trinsic.services.WalletService
import trinsic.services.account.v1.AccountOuterClass

class DriversLicenseDemo {
    val accountService = AccountService(null)
    val walletService = WalletService(null)
    val credentialsService = CredentialsService(null)

    private lateinit var allison: AccountOuterClass.AccountProfile
    private lateinit var allisonUnprotected: AccountOuterClass.AccountProfile
    private lateinit var credentialProof: Map<String, Any>

    fun signin(email: String) {
        allison = accountService.signIn(AccountOuterClass.AccountDetails.newBuilder().setEmail(email).build()).get().profile
        Log.d("Login","Login started, check email for code")
    }

    fun unprotectAccount(code: String) {
        allisonUnprotected = accountService.unprotect(allison, code)
        Log.d("Login","Login complete, account unprotected")
        walletService.profile = allisonUnprotected
        accountService.profile = allisonUnprotected
        credentialsService.profile = allisonUnprotected
    }

    fun getLatestCredential(): Map<String, Value> {
        val walletContents = walletService.search(null).get()
        val latestCredJson = walletContents.itemsList[walletContents.itemsCount-1].jsonStruct
        return latestCredJson.fieldsMap
    }

    fun createProof(credentialFrameString: String, itemId: String): Map<String, Any> {
        // SHARE CREDENTIAL
        val proofRequestJson = Gson().fromJson(
            credentialFrameString,
            java.util.HashMap::class.java
        )
        val proof = credentialsService.createProof(itemId, proofRequestJson).get()
        println("Proof: $proof")
        this.credentialProof = proof.mapKeys { x -> x.key.toString() }
        return this.credentialProof
    }

    fun sendCredential(sendToEmail: String) {
        val hashMap = java.util.HashMap<Any, Any>();
        this.credentialProof.forEach { (t, u) -> hashMap[t] = u }
        val result = credentialsService.send(hashMap, sendToEmail).get()
        Log.d("Send Proof", "Send Proof Result $result")
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