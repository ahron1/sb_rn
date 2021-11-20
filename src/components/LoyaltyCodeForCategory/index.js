import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {View, Text, Alert} from 'react-native';
import AppModal from '../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import CustomButtonSmall from '../common/CustomButtonSmall';
import {CHOOSESTORE} from '../../constants/routeNames';
import addLoyaltyCode from '../../context/actions/auth/addLoyaltyCode';

const LoyaltyCodeForCategory = ({
  orderId,
  modalVisibleLoyalty,
  setModalVisibleLoyalty,
  storesList,
  category,
  // userLoyaltyCode,
}) => {
  const {navigate} = useNavigation();
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);
  const [formCode, setFormCode] = useState({});
  const [formErrorsCode, setFormErrorsCode] = useState({});
  const [enterCode, setEnterCode] = useState(false);
  const [
    storesServingCategoryLoyalCustomer,
    setStoresServingCategoryLoyalCustomer,
  ] = useState();
  const {authState, authDispatch} = useContext(GlobalContext);

  // the useeffect for updating the list of stores doesn't work
  /*
  useEffect(() => {
    console.log(
      'updated user loyalty codes in useeffect  ',
      authState.loyalty_code.code,
    );
    const foo = authState.loyalty_code.code.includes(category)
      ? storesList.filter(function (store) {
          return (
            store.loyalty_code.filter(code => {
              authState.loyalty_code.code.includes(code);
            }).length == true
          );
        })
      : storesList;

    setStoresServingCategoryLoyalCustomer(foo);
  }, [authState.loyalty_code.code]);
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
          loading={orderItemsState.addOrderItem.loading}
          disabled={orderItemsState.addOrderItem.loading}
          style={styles.buttonSection}
          backgroundColor={colors.color1_4}
        />
        <CustomButtonSmall
          title="NO"
          onPress={() => {
            // console.log('NO');
            setModalVisibleLoyalty(false);
            navigate(CHOOSESTORE, {
              storesServingCategory: storesList,
              category: category,
            });
          }}
          loading={orderItemsState.addOrderItem.loading}
          disabled={orderItemsState.addOrderItem.loading}
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
                // loading={orderItemsState.addOrderItem.loading}
                // disabled={orderItemsState.addOrderItem.loading}
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
