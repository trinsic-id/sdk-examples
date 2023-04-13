import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TrinsicService} from "@trinsic/trinsic";

const trinsicService = new TrinsicService();

export default function App() {
  const [info, setInfo] = useState({ accountInfo: "", authToken: "" });
  useEffect(() => {
    const fetchAuthToken = async () => {
      const createWalletResponse = await trinsicService.wallet().createWallet({ecosystemId:"default"});
      trinsicService.setAuthToken(createWalletResponse.authToken!);
      const accountInfo = await trinsicService.wallet().getMyInfo({});
      setInfo({
        accountInfo: JSON.stringify(accountInfo, null, 4),
        authToken: createWalletResponse.authToken!,
    });
    };
    fetchAuthToken().catch((e) => console.error(e));
  }, []);
  return (
    <View style={styles.container}>
      <Text>
        {info.authToken !== "" && (
            <div style={{ backgroundColor: "white", width: "50%", color: "red" }}>
            <pre
                style={{
                  textAlign: "left",
                  paddingLeft: "15px",
                  fontSize: "1rem",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                  whiteSpace: "pre-wrap",
                }}
            >
              {info.accountInfo}
              <br />
              Authentication token: {info.authToken}
            </pre>
            </div>
        )}
        {info.authToken === "" && (
            <div>
              <p>We're getting your account information</p>
            </div>
        )}
      </Text>
      <StatusBar style="auto" />
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
