import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import {GlobalContext} from '../../context/Provider';
import PhoneNumber from '../../components/Auth/PhoneNumber';
import VerifyOtp from '../../components/Auth/VerifyOtp';
import ProfileComponent from '../../components/Profile';
import credUpdate from '../../context/actions/auth/credUpdate';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';
import getUserDetails from '../../context/actions/auth/getUserDetails';
import LoadingView from '../../components/LoadingView';

const Profile = () => {
  const {authDispatch, authState} = useContext(GlobalContext);
  const {
    numberChecked,
    numberAuthenticated,
    credUpdated,
    getUserDetails: getUserDetailsState,
    credUpdate: credUpdateState,
  } = authState;
  const {setOptions, toggleDrawer} = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [fireBaseUid, setFireBaseUid] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (auth().currentUser) {
      const user = auth().currentUser;
      //console logging the user value to refresh the stale data
      // console.log(
      // 'auth() current user exists. setting state. current user is:>> ',
      // user,
      // );
      setFireBaseUid(user.uid);
      setPhoneNumber(user.phoneNumber);
      user
        .getIdToken()
        //this is the token that should be used for UID auth.
        .then(token => console.info('got users token' + token));
      messaging()
        .getToken()
        .then(token => {
          //console logging the token value to ensure it is set/refreshed.
          // console.log('in profile screen, fcm token is :>> ', token);
          setFcmToken(token);
        });
    } else {
      // console.log('auth() current user doesnt exist. not setting state');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth().currentUser]);

  // Handle user state changes
  const onAuthStateChanged = user => {
    if (user) {
      // console.log('in profile screen. onauthstatechanged. ');
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    const subscriber = () => {
      auth().onAuthStateChanged(onAuthStateChanged);
    };
    return subscriber(); // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (fireBaseUid && phoneNumber && fcmToken) {
      // console.log('in profile screen. now calling credupdate');
      credUpdate({fireBaseUid, phoneNumber, fcmToken})(authDispatch);
    } else {
      // console.log('in profile screen. creds not yet ready to call credupdate');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireBaseUid, phoneNumber, fcmToken]);

  useEffect(() => {
    AsyncStorage.getItem('@creds').then(item => {
      if (!item) {
        // console.log('firebaseuid doesnt exist in asyncstorage');
        if (credUpdated) {
          // console.log('now calling asyncstorage set');
          AsyncStorage.setItem(
            '@creds',
            JSON.stringify({
              fireBaseUid: fireBaseUid,
              phoneNumber: phoneNumber,
              fcmToken: fcmToken,
            }),
          ).then(() => {
            // console.log('in profile screen, dispatching getuserdetails');
            getUserDetails()(authDispatch);
            // console.log(
            // 'in profile screen, credentials updated server side, now storing to asyncstorage',
            // );
          });
        } else {
          // console.log(
          // 'credentials not yet updated server side, not storing to asyncstorage',
          // );
        }
      } else {
        // console.log(
        // 'in profile screen, credentials already exists in asyncstorage',
        // );
        // console.log('in profile screen, dispatching getuserdetails');
        getUserDetails()(authDispatch);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credUpdated]);

  useEffect(() => {
    setOptions({
      //headerLeft: () => (
      headerRight: () => (
        <NavMenuPressable
          onPress={() => {
            toggleDrawer();
          }}>
          <NavMenuComponent />
        </NavMenuPressable>
      ),
    });
  }, [setOptions, toggleDrawer]);

  if (
    getUserDetailsState.loading ||
    credUpdateState.loading //||
  ) {
    return <LoadingView />;
  }

  if (numberAuthenticated) {
    if (authenticated) {
      // console.log('in profile screen');
      return <ProfileComponent />;
    }
  }
  if (numberChecked) {
    return <VerifyOtp />;
  }
  return <PhoneNumber />;
};

export default Profile;
