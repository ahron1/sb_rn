import React, {useContext, useState, useEffect} from 'react';
import {Text, View, Alert} from 'react-native';
import AppModal from '../common/AppModal';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import styles from './styles';
import userAddressUpdate from '../../context/actions/auth/userAddressUpdate';
import {GlobalContext} from '../../context/Provider';
import {getGeoAddressLine2} from '../../helpers/geoHelpers';
import Geocoder from 'react-native-geocoding';
import {Formik} from 'formik';
import * as yup from 'yup';
import colors from '../../assets/theme/colors';

const AddressForm = ({
  modalVisibleAddAddress,
  setModalVisibleAddAddress,
  // firebaseUid,
  geoAddress,
  systemLocation,
  setLoadingEditAddressWrapper,
  // setStoredAddress,
}) => {
  const [formAddAddress, setFormAddAddress] = useState({});
  const [formErrorsAddAddress, setFormErrorsAddAddress] = useState({});
  const [submitIntent, setSubmitIntent] = useState(false);
  const {authState, authDispatch} = useContext(GlobalContext);
  const {
    geoPincode,
    geoState,
    geoCity,
    geoRoute,
    geoSubLocalityL1,
    geoSubLocalityL2,
  } = geoAddress;

  // console.log('in address form. address is ', geoAddress);

  const geoAddressLine2 = getGeoAddressLine2(
    geoRoute,
    geoSubLocalityL1,
    geoSubLocalityL2,
  );

  const addressValidationSchema = yup.object().shape({
    addressLine1: yup.string().required('Enter first line of your address'),
    addressLine2: yup
      .string()
      // .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Enter second line of your address'),
    city: yup.string().required('Enter your city'),
    state: yup.string().required('Enter you state'),
    pincode: yup.string().required('Enter your pincode'),
  });

  // console.log('in address form. returned address line 2', geoAddressLine2);
  const submitFormik = async values => {
    // console.log('formik submitted. values are:>> ', values);
    const userAddress = values;
    const geoAccuracy = systemLocation.accuracy;
    const systemCoordinates = {
      latitude: systemLocation.latitude,
      longitude: systemLocation.longitude,
    };
    var addressString = (
      values.addressLine1 +
      ' ' +
      values.addressLine2 +
      ' ' +
      values.city +
      ' ' +
      values.pincode +
      ' ' +
      values.state
    ).replace('\n', ' ');

    // console.log(
    // 'in address form useeffect to submit. total address string is:>>  ',
    // addressString,
    // );
    Geocoder.from(addressString)
      .then(json => {
        // const userCoordinates = json.results[0].geometry.location;
        const userCoordinates = {
          latitude: json.results[0].geometry.location.lat,
          longitude: json.results[0].geometry.location.lng,
        };
        // console.log(
        // ' will now update server. coordinates of address, ',
        // addressString,
        // ' are: ',
        // userCoordinates,
        // );
        // console.log(
        // 'will update server. user address being submitted is >>> ',
        // userAddress,
        // );
        userAddressUpdate({userAddress, userCoordinates, geoAccuracy})(
          authDispatch,
        )(() => {
          setModalVisibleAddAddress(false);
          setLoadingEditAddressWrapper(false);
        });
      })
      .catch(error => {
        console.warn(error);
        //error will also be thrown if quota is exceeded. That situation is handled.
        Alert.alert(
          'Check',
          'We cannot confirm if the address you entered is valid. ' +
            '\n\nIf you want to update it, touch Make changes. If you are sure it is correct, touch Continue. ',
          [
            {
              text: 'Make changes',
            },
            {
              text: 'Continue',
              onPress: () => {
                userAddressUpdate({
                  userAddress,
                  userCoordinates: systemCoordinates,
                  geoAccuracy,
                })(authDispatch)(() => {
                  setModalVisibleAddAddress(false);
                  setLoadingEditAddressWrapper(false);
                });
              },
            },
          ],
        );
      });
  };

  return (
    <AppModal
      modalVisible={modalVisibleAddAddress}
      setModalVisible={setModalVisibleAddAddress}
      modalTitle={'Update Address'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        // console.log('modal closed');
        setFormErrorsAddAddress({});
        setFormAddAddress({});
        setLoadingEditAddressWrapper(false);
      }}
      modalBody={
        <>
          <View>
            <View style={styles.introSection}>
              <Text style={styles.introText}>Enter your complete address:</Text>
            </View>
            <Formik
              initialValues={{
                addressLine1: '',
                addressLine2: geoAddressLine2,
                city: geoCity,
                pincode: geoPincode,
                state: geoState,
              }}
              validationSchema={addressValidationSchema}
              // onSubmit={values => console.log(values)}>
              onSubmit={values => submitFormik(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
                isValid,
              }) => {
                useEffect(() => {
                  setFieldValue('city', geoCity);
                }, [geoCity]);
                useEffect(() => {
                  setFieldValue('state', geoState);
                }, [geoState]);
                useEffect(() => {
                  setFieldValue('pincode', geoPincode);
                }, [geoPincode]);
                useEffect(() => {
                  setFieldValue('addressLine2', geoAddressLine2);
                }, [geoAddressLine2]);

                return (
                  <View>
                    <AppTextInput
                      style={styles.input}
                      label="Address Line 1:"
                      autoCapitalize="words"
                      maxLength={60}
                      placeholder="House number, Apartment name"
                      onChangeText={handleChange('addressLine1')}
                      onBlur={handleBlur('addressLine1')}
                      value={values.addressLine1}
                    />
                    {errors.addressLine1 && touched.addressLine1 && (
                      <Text style={styles.errorText}>
                        {errors.addressLine1}
                      </Text>
                    )}
                    <AppTextInput
                      style={styles.input}
                      label="Address Line 2:"
                      maxLength={60}
                      autoCapitalize="words"
                      placeholder="Street and/or Area name"
                      onChangeText={handleChange('addressLine2')}
                      onBlur={handleBlur('addressLine2')}
                      value={values.addressLine2}
                    />
                    {errors.addressLine2 && touched.addressLine2 && (
                      <Text style={styles.errorText}>
                        {errors.addressLine2}
                      </Text>
                    )}

                    <AppTextInput
                      style={styles.input}
                      label="City:"
                      autoCapitalize="words"
                      maxLength={30}
                      placeholder="City"
                      onChangeText={handleChange('city')}
                      onBlur={handleBlur('city')}
                      value={values.city}
                    />
                    {errors.city && touched.city && (
                      <Text style={styles.errorText}>{errors.city}</Text>
                    )}

                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 2}}>
                        <AppTextInput
                          style={styles.input}
                          label="Pincode:"
                          keyboardType="numeric"
                          placeholder="Pincode"
                          maxLength={6}
                          onChangeText={handleChange('pincode')}
                          onBlur={handleBlur('pincode')}
                          value={values.pincode}
                        />

                        {errors.pincode && touched.pincode && (
                          <Text style={styles.errorText}>{errors.pincode}</Text>
                        )}
                      </View>
                      <View style={{flex: 4}}>
                        <AppTextInput
                          style={styles.input}
                          label="State:"
                          autoCapitalize="words"
                          placeholder="State"
                          onChangeText={handleChange('state')}
                          onBlur={handleBlur('state')}
                          value={values.state}
                        />
                        {errors.state && touched.state && (
                          <Text style={styles.errorText}>{errors.state}</Text>
                        )}
                      </View>
                    </View>
                    <CustomButtonMedium
                      style={styles.buttonSection}
                      title="OK"
                      // disabled={!isValid}
                      backgroundColor={colors.color1_4}
                      onPress={handleSubmit}
                      loading={authState.userAddressUpdate.loading}
                      disabled={authState.userAddressUpdate.loading}
                    />
                  </View>
                );
              }}
            </Formik>
          </View>
        </>
      }
    />
  );
};

export default AddressForm;
