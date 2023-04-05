/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ChatBubble } from 'react-native-vdotok-plugin';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  let user = {
    "auth_token": "15c2146f827240943b1eb64d0521c272",
    "authorization_token": "019e56d14a3f081dd49c2f7ec399f9f2",
    "created_datetime": "1680518334",
    "email": "adil1@gmail.com",
    "full_name": "Adil1",
    "media_server_map": {
        "complete_address": "wss://signalling.vdotok.com:8443/call",
        "end_point": "call",
        "host": "signalling.vdotok.com",
        "port": "8443",
        "protocol": "wss"
    },
    "message": "Login Successful",
    "messaging_server_map": {
        "complete_address": "wss://messaging.vdotok.com:443",
        "host": "messaging.vdotok.com",
        "port": "443",
        "protocol": "wss"
    },
    "phone_num": "923667427490",
    "process_time": 82,
    "profile_pic": "",
    "ref_id": "cc8a9d0efeeb61ac43c61d3e249a52d5",
    "status": 200,
    "user_id": 616,
    "username": "Adil1"
}
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <ChatBubble
        projectID={"552LYVH4"}
        tenantUrl={"https://tenant.vdotok.com/API/v0"}
        userData={user}
        // primaryColor={'red'}
        // receiverBubbleTextColor={'white'}
        // senderBubbleTextColor={'green'}
        bubbleStyle={{ bottom: 55 }}
      // title={"Zubair"}
      // bubbleContent={ }
      // senderBubbleBackgroundColor={'red'}
      // receiverBubbleBackgroundColor={"yellow"}

      />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
