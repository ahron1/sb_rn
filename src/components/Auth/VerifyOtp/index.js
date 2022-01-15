import React, {useContext, useState} from 'react';
import {Image, Text, View} from 'react-native';

import styles from './styles';
import colors from '../../../assets/theme/colors';
import AppTextInput from '../../common/AppTextInput';
import CustomButton from '../../common/CustomButton';
import {GlobalContext} from '../../../context/Provider';
import phoneNumberOtpSubmit from '../../../context/actions/auth/phoneNumberOtpSubmit';
import Container from '../../common/Container';

export default function VerifyOtp() {
  const {authDispatch, authState} = useContext(GlobalContext);
  const {confirmationMethod} = authState;
  const {
    // data: dataPhoneNumberOtpSubmit,
    //error: errorPhoneNumberOtpSubmit,
    loading: loadingPhoneNumberOtpSubmit,
  } = authState.phoneNumberOtpSubmit;

  const [otpCode, setOtpCode] = useState('');

  const submitOtpCode = () => {
    // console.log('submit button touched with code :>> ', otpCode);
    phoneNumberOtpSubmit({otpCode, confirmationMethod})(authDispatch);
  };

  return (
    <Container>
      <View style={styles.screen}>
        <View style={styles.welcomeSection}>
          <Image
            height={1}
            width={1}
            source={require('../../../assets/images/logo_storebhai.png')}
            style={styles.logoImage}
          />
          <Text style={styles.welcomeText}>Welcome to Storebhai </Text>
        </View>

        <View style={styles.numberSection}>
          <Text style={styles.enterNumber}>Confirm your OTP code:</Text>
          <AppTextInput
            style={styles.input}
            placeholder="123456"
            keyboardType="numeric"
            maxLength={6}
            autoFocus
            value={otpCode}
            onChangeText={setOtpCode}
          />
        </View>

        <View style={styles.buttonSection}>
          <CustomButton
            style={styles.button}
            disabled={loadingPhoneNumberOtpSubmit}
            backgroundColor={colors.color1_4}
            loading={loadingPhoneNumberOtpSubmit}
            title="Submit"
            onPress={submitOtpCode}
          />
        </View>
      </View>
    </Container>
  );
}
