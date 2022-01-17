/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    'Message handled in the background!',
    JSON.stringify(remoteMessage),
  );
});

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Main);
