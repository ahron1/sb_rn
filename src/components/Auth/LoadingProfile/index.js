import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';

import {GlobalContext} from '../../../context/Provider';

export default function LoadingProfile() {
  const {authDispatch, authState} = useContext(GlobalContext);
  const {confirmationMethod} = authState;
  const {
    // data: dataPhoneNumberOtpSubmit,
    error: errorPhoneNumberOtpSubmit,
    loading: loadingPhoneNumberOtpSubmit,
  } = authState.phoneNumberOtpSubmit;

  const [otpCode, setOtpCode] = useState('');

  //TODO --------------
  // const updateCredentials = {phoneNumber, firebase_UID, FCM_token};
  // write to async store and send to server.

  return (
    <View style={styles.screen}>
      <Text>Please wait. Loading... </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: '5%',
  },
  text: {
    fontSize: 25,
  },
});
