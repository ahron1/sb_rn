import React, {useContext, useState} from 'react';
import {Image, Text, View} from 'react-native';

import {GlobalContext} from '../../../context/Provider';
import phoneNumberSignInSubmit from '../../../context/actions/auth/phoneNumberSignInSubmit';
import AppTextInput from '../../common/AppTextInput';
import CustomButton from '../../common/CustomButton';
import styles from './styles';
import colors from '../../../assets/theme/colors';
import Container from '../../../components/common/Container';

export default function PhoneNumber() {
  const {authDispatch, authState} = useContext(GlobalContext);
  const {
    // data: dataPhoneNumberSignInSubmit,
    error: errorPhoneNumberSignInSubmit,
    loading: loadingPhoneNumberSignInSubmit,
  } = authState.phoneNumberSignInSubmit;
  const [phoneNumber, setPhoneNumber] = useState(null);

  const submitPhoneNumber = () => {
    const phoneNumberWithCode = '+91' + phoneNumber;
    console.log('submit button touched with number :>> ', phoneNumberWithCode);
    phoneNumberSignInSubmit(phoneNumberWithCode)(authDispatch);
  };

  return (
    <Container>
      <View style={styles.screen}>
        <View style={styles.welcomeSection}>
          <Image
            height={1}
            width={1}
            source={require('../../../assets/images/logo3.png')}
            style={styles.logoImage}
          />
          <Text style={styles.welcomeText}>Welcome to Everystore! </Text>
        </View>
        <View style={styles.stepSection}>
          <Text style={styles.introText}>
            Step 1: Send your list to your local store{'\n'}
          </Text>
          <Text style={styles.introText}>
            Step 2: Store confirms prices and availability {'\n'}
          </Text>
          <Text style={styles.introText}>
            Step 3: Pickup or delivery by store.{'\n'}
          </Text>
        </View>
        <View style={styles.numberSection}>
          <Text style={styles.enterNumber}>Enter your phone number:</Text>
          <AppTextInput
            style={styles.textInput}
            placeholder="9876543210"
            keyboardType="phone-pad"
            maxLength={10}
            autoFocus
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={styles.buttonSection}>
          <CustomButton
            style={styles.button}
            backgroundColor={colors.color1_4}
            disabled={loadingPhoneNumberSignInSubmit}
            loading={loadingPhoneNumberSignInSubmit}
            title="Log In"
            // onPress={() => props.onSubmit(phoneNumber)}
            // onPress={() => phoneNumberSignInSubmit(phoneNumber)(authDispatch)}
            onPress={submitPhoneNumber}
          />
        </View>
      </View>
    </Container>
  );
}
