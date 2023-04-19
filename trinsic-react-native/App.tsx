import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {CreateWalletRequest, TrinsicService} from "./src";
import {BrowserProvider} from "./src/providers";
import {NodeReactNativeHttpTransport} from "./NodeReactNativeTransport";

interface DemoData {
  authToken: string;
  accountInfo: string;
}

async function fetchAuthToken(): Promise<DemoData> {
    try {
        BrowserProvider.overrideTransport = NodeReactNativeHttpTransport();
        const trinsicService = new TrinsicService();
        console.log("Service connection", trinsicService);
        console.log(await trinsicService.provider().getOberonKey());
        const walletService = trinsicService.wallet();
        const request = CreateWalletRequest.fromPartial({ecosystemId:"default"});
        console.log(walletService, CreateWalletRequest.encode(request).finish());
        const createWalletResponse = await walletService.createWallet(request);
        console.log("Wallet", createWalletResponse);
        trinsicService.setAuthToken(createWalletResponse.authToken!);
        const accountInfo = await trinsicService.wallet().getMyInfo({});
        console.log("Account information", accountInfo);
        return {
            authToken: createWalletResponse.authToken!,
            accountInfo: JSON.stringify(accountInfo, null, 3)
        }
    } catch (e: any) {
        console.error("Uncaught error", e.stack);
        return { authToken: "", accountInfo: ""};
    }
}

  export default function App() {
    const [info, setInfo] = useState({accountInfo: "", authToken: ""});
  return (
      <View style={styles.container}>
        <Text style={{backgroundColor: "white", width: "50%", color: "red"}}>
          Authentication token: {info.authToken}
        </Text>
        <Text>
          {info.authToken !== "" && info.accountInfo}
          {info.authToken === "" && "We're getting your account information"}
        </Text>
        <StatusBar style="auto"/>
        <Button title="Get Auth Token" onPress={async () =>  {
            console.log("Button press");
            const newData = await fetchAuthToken();
            console.log("New data", newData);
            setInfo(newData);
        }}/>
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
