import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CreateWalletRequest, TrinsicService } from "@trinsic/trinsic";

interface DemoData {
  authToken: string;
  accountInfo: string;
}

async function fetchAuthToken(): Promise<DemoData> {
  try {
    const trinsic = new TrinsicService();
    console.log("Service connection", trinsic);
    const myKey = (await trinsic.provider().getOberonKey()).key ?? "";
    console.log("Oberon key", myKey);
    const walletService = trinsic.wallet();
    const request = CreateWalletRequest.fromPartial({ ecosystemId: "default" });
    console.log(walletService, CreateWalletRequest.encode(request).finish());
    const createWalletResponse = await walletService.createWallet(request);
    console.log("Wallet", createWalletResponse);
    trinsic.setAuthToken(createWalletResponse.authToken!);
    const accountInfo = await trinsic.wallet().getMyInfo({});
    console.log("Account information", accountInfo);
    return {
      authToken: createWalletResponse.authToken!,
      accountInfo: JSON.stringify(accountInfo, null, 3)
    }
  } catch (e: any) {
    console.error("Uncaught error", e.stack);
    return { authToken: "", accountInfo: "" };
  }
}

export default function App() {
  const [info, setInfo] = useState({ accountInfo: "", authToken: "" });
  return (
    <View style={styles.container}>
      <Text style={{ backgroundColor: "white", width: "50%", color: "red" }}>
        Authentication token: {info.authToken}
      </Text>
      <Text>
        {info.authToken !== "" && info.accountInfo}
        {info.authToken === "" && "We're getting your account information"}
      </Text>
      <StatusBar style="auto" />
      <Button title="Get Auth Token" onPress={async () => {
        console.log("Button press");
        const newData = await fetchAuthToken();
        console.log("New data", newData);
        setInfo(newData);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
