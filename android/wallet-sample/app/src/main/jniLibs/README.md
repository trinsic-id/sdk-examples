# Downloading Okapi Binaries

1. The folder structure (and sample binaries) are included. Please download the latest okapi binaries from here: [Okapi - Build Platform Libraries](https://github.com/trinsic-id/okapi/actions/workflows/build-libs.yml)
2. Extract the `android` archive and place the appropriate binaries under the corresponding processor architecture folder
3. Ensure you have libjnidispatch.so (correct processor architecture) in the same folder [Stack Overflow](https://stackoverflow.com/questions/47800043/android-arm-libjnidispatch-so-not-found-error/47808813)
4. Download appropriate [jar file from here](https://github.com/java-native-access/jna/tree/master/lib/native)
5. Extract it (7-zip works) and find the `libjnidispatch.so` in the root. Copy it to the corresponding processor architecture folder
