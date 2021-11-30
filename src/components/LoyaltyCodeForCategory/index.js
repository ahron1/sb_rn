import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {View, Text, Alert} from 'react-native';
import AppModal from '../common/AppModal';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import CustomButtonSmall from '../common/CustomButtonSmall';
import {CHOOSESTORE} from '../../constants/routeNames';
import addLoyaltyCode from '../../context/actions/auth/addLoyaltyCode';

const LoyaltyCodeForCategory = ({
  modalVisibleLoyalty,
  setModalVisibleLoyalty,
  storesList,
  category,
  // userLoyaltyCode,
}) => {
  const {navigate} = useNavigation();
  const [formCode, setFormCode] = useState({});
  const [formErrorsCode, setFormErrorsCode] = useState({});
  const [enterCode, setEnterCode] = useState(false);
  const {authState, authDispatch} = useContext(GlobalContext);

  // console.log('in loyalty code modal, stores list is ', storesList);

  // the useeffect for updating the list of stores doesn't work.
  // very strange the same code works in the choosecategory component.
  /*
  useEffect(() => {
    console.log(
      'updated user loyalty codes in useeffect  ',
      authState.loyalty_code.code,
    );

    const foo =
      storesList && authState.loyalty_code.code.includes(category)
        ? storesList.filter(store => {
            store.loyalty_code.filter(code => {
              authState.loyalty_code.code.includes(code);
            }).length > 0;
          })
        : [];

    const goo = authState.loyalty_code.code.includes(category)
      ? storesList.filter(function (store) {
          console.log('stores codes are  ', store.loyalty_code);
          console.log(
            '------- stores codes filtered are  ',
            store.loyalty_code.filter(code =>
              authState.loyalty_code.code.includes(code),
            ).length > 0,
          );
          return (
            store.loyalty_code.filter(function (code) {
              console.log('code is ', code);
              console.log('array  is ', authState.loyalty_code.code);
              console.log(
                'array contains code is ',
                authState.loyalty_code.code.includes(code),
              );
              authState.loyalty_code.code.includes(code);
            }).length > 0
          );
        })
      : storesList;

    setStoresCategoryLoyalCustomer(foo);
    console.log('=============', storesCategoryLoyalCustomer);
  }, [storesList, authState.loyalty_code.code]);
  */

  const onSubmitCode = ({name, value, isRequired}) => {
    const loyaltyCode = formCode.codeValue.toUpperCase();
    if (!formCode.codeValue) {
      setFormErrorsCode(prev => {
        return {
          ...prev,
          itemName: 'Please enter the Loyalty Code',
        };
      });
    }
    addLoyaltyCode({loyaltyCode, category})(authDispatch)(() => {
      setModalVisibleLoyalty(false);

      /*
      // the useeffect for updating the list of stores doesn't work.
      navigate(CHOOSESTORE, {
        storesServingCategory: storesServingCategoryLoyalCustomer,
        category: category,
      });
      */

      // since the useeffect for updating the list of stores doesn't work, the workaround below is used
      Alert.alert(
        'Your code has been entered. \nPlease select the category again to activate the code',
      );
      navigate.goBack();

      setModalVisibleLoyalty(false);
    });
  };

  const onChangeCode = ({name, value, isRequired}) => {
    setFormCode({...formCode, [name]: value});

    if (value === '') {
      if (isRequired) {
        setFormErrorsCode(prev => {
          return {...prev, [name]: 'This field is required'};
        });
      }
    } else {
      setFormErrorsCode(prev => {
        return {...prev, [name]: null};
      });
    }
  };

  const Buttons1 = () => {
    return (
      <View>
        <CustomButtonSmall
          title="YES"
          onPress={() => {
            // console.log('yes');
            setEnterCode(true);
          }}
          style={styles.buttonSection}
          backgroundColor={colors.color1_4}
        />
        <CustomButtonSmall
          title="NO"
          onPress={() => {
            // console.log('NO');
            setModalVisibleLoyalty(false);
            navigate(CHOOSESTORE, {
              storesData: storesList,
              category: category,
            });
          }}
          style={styles.buttonSection}
          backgroundColor={colors.color1_4}
        />
      </View>
    );
  };

  return (
    <AppModal
      modalVisible={modalVisibleLoyalty}
      setModalVisible={setModalVisibleLoyalty}
      modalTitle={'Loyalty Code'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        setFormErrorsCode({});
        setFormCode({});
        setEnterCode(false);
      }}
      modalBody={
        <View>
          <View style={styles.introSection}>
            <Text style={styles.introText}>Do you have a loyalty code?</Text>
          </View>

          {!enterCode && <Buttons1 />}

          {enterCode && (
            <View>
              <View>
                <Text />
              </View>
              <View>
                <AppTextInput
                  label="Please enter your Loyalty Code"
                  autoFocus={true}
                  placeholder="CODE"
                  maxLength={20}
                  value={formCode.codeValue || ''}
                  onChangeText={value => {
                    onChangeCode({name: 'codeValue', value, isRequired: true});
                  }}
                  error={formErrorsCode.codeValue}
                />
              </View>
              <CustomButtonMedium
                title="OK"
                onPress={onSubmitCode}
                loading={authState.loyalty_code.loading}
                disabled={authState.loyalty_code.loading}
                style={styles.buttonSection}
                backgroundColor={colors.color1_4}
              />
            </View>
          )}
        </View>
      }
    />
  );
};

export default LoyaltyCodeForCategory;
