/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import GlobalProvider from './src/context/Provider';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavContainer from './src/navigations';
import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native';

const App = () => {
  PushNotification.createChannel(
    {
      channelId: 'notification_channel_1', // (required)
      channelName: 'notification_channel_1', // (required)
      playSound: true, // (optional) default: true
      soundName: 'default',
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const notificationHelper = remoteMessage => {
    // console.log('FCM Notification', JSON.stringify(remoteMessage));

    if (remoteMessage.data.alert_title && remoteMessage.data.alert_body) {
      Alert.alert(
        remoteMessage.data.alert_title,
        remoteMessage.data.alert_body,
      );
    }
  };

  // assume remoteMessage object contains 1)notification 2)data

  //foreground notification
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: 'notification_channel_1',
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        largeIconUrl: remoteMessage.notification.android.imageUrl,
      });
      notificationHelper(remoteMessage);
    });
    return unsubscribe;
  }, []);

  //foreground notification
  // useEffect(() => {
  // const unsubscribe = messaging().onMessage(async remoteMessage => {
  // if (remoteMessage) {
  // notificationHelper(remoteMessage);
  // }
  // });
  //
  // return unsubscribe;
  // }, []);

  // background notification - from app background state
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        notificationHelper(remoteMessage);
      }
    });
  }, []);

  // initial notification - from app quit state
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          notificationHelper(remoteMessage);
        }
      });
  }, []);

  return (
    <GlobalProvider>
      <PaperProvider>
        <AppNavContainer />
      </PaperProvider>
    </GlobalProvider>
  );
};

export default App;
