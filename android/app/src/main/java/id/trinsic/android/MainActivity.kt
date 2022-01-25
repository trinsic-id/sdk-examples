package id.trinsic.android

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.pm.PackageManager
import android.os.Bundle
import android.text.InputType
import android.view.View
import android.view.inputmethod.EditorInfo
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import org.json.JSONObject
import java.util.*


class MainActivity : AppCompatActivity() {
    val demo = DriversLicenseDemo()
    var credentialId: String? = null

    var mGearPropertyView: VehiclePropertyView? = null
    var mSpeedPropertyView: VehiclePropertyView? = null
    var mBatteryLevelPropertyView: VehiclePropertyView? = null
    var mFuelDoorOpenPropertyView: VehiclePropertyView? = null

    private var mCarPropertyManager: CarPropertyManager? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
        val emailEditText = this.findViewById<EditText>(R.id.email)
        emailEditText.imeOptions = EditorInfo.IME_ACTION_DONE
        emailEditText.setRawInputType(InputType.TYPE_CLASS_TEXT)

        // Request dangerous permissions only
        // Request dangerous permissions only
        val dangPermToRequest: List<String> = checkDangerousPermissions()

        if (dangPermToRequest.isEmpty()) {
            initCarPropertyManager()
        } else {
            requestDangerousPermissions(dangPermToRequest)
            // CB:
            // onRequestPermissionsResult()
        }
    }

    fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String?>?,
        grantResults: IntArray?
    ) {
        if (requestCode == REQUEST_CODE_ASK_PERMISSIONS) {
            //all permissions have been granted
            if (!Arrays.asList(grantResults).contains(PackageManager.PERMISSION_DENIED)) {
                initCarPropertyManager()
                initGUI()
            }
        }
    }

    private fun checkDangerousPermissions(): List<String> {
        val permissions: MutableList<String> = ArrayList()
        if (checkSelfPermission(Car.PERMISSION_SPEED) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Car.PERMISSION_SPEED)
        }
        if (checkSelfPermission(Car.PERMISSION_ENERGY) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Car.PERMISSION_ENERGY)
        }
        return permissions
    }

    private fun requestDangerousPermissions(permissions: List<String>) {
        requestPermissions(permissions.toTypedArray(), REQUEST_CODE_ASK_PERMISSIONS)
    }

    private fun initCarPropertyManager() {
        mCarPropertyManager =
            Car.createCar(this).getCarManager(Car.PROPERTY_SERVICE) as CarPropertyManager
        Log.d(TAG, "Test CarPropertyManager getters:")
        Log.d(
            TAG,
            "GEAR_SELECTION: getIntProperty(" + mCarPropertyManager.getIntProperty(
                VehiclePropertyIds.GEAR_SELECTION,
                0
            ).toString() + ")"
        )
        Log.d(TAG, "Test CarPropertyManager callbacks:")
        mCarPropertyManager.registerCallback(object : CarPropertyEventCallback() {
            fun onChangeEvent(carPropertyValue: CarPropertyValue) {
                Log.d(
                    TAG,
                    "GEAR_SELECTION: onChangeEvent(" + carPropertyValue.getValue().toString() + ")"
                )
                mGearPropertyView.setPropValue(java.lang.String.valueOf(carPropertyValue.getValue()))
            }

            fun onErrorEvent(propId: Int, zone: Int) {
                Log.d(TAG, "GEAR_SELECTION: onErrorEvent($propId, $zone)")
            }
        }, VehiclePropertyIds.GEAR_SELECTION, CarPropertyManager.SENSOR_RATE_NORMAL)
        mCarPropertyManager.registerCallback(object : CarPropertyEventCallback() {
            fun onChangeEvent(carPropertyValue: CarPropertyValue) {
                Log.d(
                    TAG,
                    "PERF_VEHICLE_SPEED: onChangeEvent(" + carPropertyValue.getValue()
                        .toString() + ")"
                )
                mSpeedPropertyView.setPropValue(java.lang.String.valueOf(carPropertyValue.getValue()))
            }

            fun onErrorEvent(propId: Int, zone: Int) {
                Log.d(TAG, "PERF_VEHICLE_SPEED: onErrorEvent($propId, $zone)")
            }
        }, VehiclePropertyIds.PERF_VEHICLE_SPEED, CarPropertyManager.SENSOR_RATE_NORMAL)
        mCarPropertyManager.registerCallback(object : CarPropertyEventCallback() {
            fun onChangeEvent(carPropertyValue: CarPropertyValue) {
                Log.d(
                    TAG,
                    "EV_BATTERY_LEVEL: onChangeEvent(" + carPropertyValue.getValue()
                        .toString() + ")"
                )
                mBatteryLevelPropertyView.setPropValue(java.lang.String.valueOf(carPropertyValue.getValue()))
            }

            fun onErrorEvent(propId: Int, zone: Int) {
                Log.d(TAG, "EV_BATTERY_LEVEL: onErrorEvent($propId, $zone)")
            }
        }, VehiclePropertyIds.EV_BATTERY_LEVEL, CarPropertyManager.SENSOR_RATE_ONCHANGE)
        mCarPropertyManager.registerCallback(object : CarPropertyEventCallback() {
            fun onChangeEvent(carPropertyValue: CarPropertyValue) {
                Log.d(
                    TAG,
                    "FUEL_DOOR_OPEN: onChangeEvent(" + carPropertyValue.getValue().toString() + ")"
                )
                mFuelDoorOpenPropertyView.setPropValue(java.lang.String.valueOf(carPropertyValue.getValue()))
            }

            fun onErrorEvent(propId: Int, zone: Int) {
                Log.d(TAG, "FUEL_DOOR_OPEN: onErrorEvent($propId, $zone)")
            }
        }, VehiclePropertyIds.FUEL_DOOR_OPEN, CarPropertyManager.SENSOR_RATE_ONCHANGE)
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
        // Get the current car speed
        val carSpeed = 100; // kph, because legal ;)
        throw NotImplementedError()
    }
}