import React, {useContext, useState} from 'react';
import {Image, View, Text} from 'react-native';
import {GlobalContext} from '../../../context/Provider';
import phoneNumberSignInSubmit from '../../../context/actions/auth/phoneNumberSignInSubmit';
import AppTextInput from '../../common/AppTextInput';
import CustomButton from '../../common/CustomButton';
import styles from './styles';
import colors from '../../../assets/theme/colors';
import Container from '../../../components/common/Container';
import {} from 'react-native-paper';
import {
  Button,
  Headline,
  Paragraph,
  Subheading,
  Text as PaperText,
  Title,
} from 'react-native-paper';

export default function PhoneNumber() {
  const {authDispatch, authState} = useContext(GlobalContext);
  const {
    // data: dataPhoneNumberSignInSubmit,
    //error: errorPhoneNumberSignInSubmit,
    loading: loadingPhoneNumberSignInSubmit,
  } = authState.phoneNumberSignInSubmit;
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [showIntro, setShowIntro] = useState(true);

  const submitPhoneNumber = () => {
    const phoneNumberWithCode = '+91' + phoneNumber;
    // console.log('submit button touched with number :>> ', phoneNumberWithCode);
    phoneNumberSignInSubmit(phoneNumberWithCode)(authDispatch);
  };

  if (showIntro) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{width: '50%', alignItems: 'center'}}>
        <Headline>Headline</Headline>
        <Subheading>Subheading</Subheading>
        <Title>Title</Title>
        <Paragraph>Paragraph</Paragraph>
        <Text>RN Default Text</Text>
        <PaperText> Paper Text</PaperText>
        <Button
          icon="login"
          mode="contained"
          onPress={() => {
            console.log('Pressed');
            setShowIntro(false);
          }}>
          Login
        </Button>
      </View>
    );
  } else {
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
          <View style={styles.stepSection}>
            <Text style={styles.introTextTitle}>Step 1:</Text>
            <Text style={styles.introText}>
              Send order to local store.{'\n'}
            </Text>
            <Text style={styles.introTextTitle}>Step 2:</Text>
            <Text style={styles.introText}>
              Store checks price and availability. {'\n'}
            </Text>
            <Text style={styles.introTextTitle}>Step 3:</Text>
            <Text style={styles.introText}>
              Pickup or delivery by store.{'\n'}
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
}
