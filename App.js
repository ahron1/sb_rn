/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import GlobalProvider, {GlobalContext} from './src/context/Provider';
import AppNavContainer from './src/navigations';
import {Alert} from 'react-native';
// import {GlobalContext} from '../../context/Provider';

const App = () => {
  const {authDispatch, authState} = useContext(GlobalContext);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new foreground FCM message arrived!',
        JSON.stringify(remoteMessage.data.data_item1),
      );
    });

    return unsubscribe;
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  // const fcmToken = await messaging().getToken();
  // if (fcmToken) {
  // console.log('fcm token is :> ', fcmToken);
  // console.log('fcm messaging() object is :> ', messaging());
  // }
  // }, []);

  useEffect(() => {
    const unsubscribe = () => {
      messaging().onTokenRefresh(async token => {
        Alert.alert('Token was refreshed', JSON.stringify(token));
      });
    };

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.data,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);

  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
};

export default App;
