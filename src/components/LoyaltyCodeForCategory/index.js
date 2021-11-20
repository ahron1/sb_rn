import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import AppModal from '../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import addOrderItem from '../../context/actions/addOrderItem';
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
  userLoyaltyCode,
}) => {
  const {navigate} = useNavigation();
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);
  const [formCode, setFormCode] = useState({});
  const [formErrorsCode, setFormErrorsCode] = useState({});
  const [enterCode, setEnterCode] = useState(false);
  const {authState, authDispatch} = useContext(GlobalContext);
  // console.log('in loyalty modal, category is ', category);
  // console.log('in loyalty modal, stores list is ', storesList);

  const onSubmitCode = ({name, value, isRequired}) => {
    const code = formCode.codeValue;
    console.log(
      'in loyalty code modal. ok clicked with code ',
      // formCode.codeValue,
      code,
    );
    if (!formCode.codeValue) {
      setFormErrorsCode(prev => {
        return {
          ...prev,
          itemName: 'Please enter the Loyalty Code',
        };
      });
    }
    // setModalVisibleLoyalty(false);
    addLoyaltyCode(code, category)(authDispatch)(() =>
      setModalVisibleLoyalty(false),
    );

    /*
    const temp = {};
    temp[category] = formCode.codeValue;
    userLoyaltyCode.push(temp);

    console.log('A OK, will add new code. usercode is now: ', userLoyaltyCode);
    console.log(
      'stores matching entered code: ',
      storesList.filter(function (store) {
        console.log(
          'in choosecategory - matching codes in  ',
          store.loyalty_code,
          ' and ',
          userLoyaltyCode,
        );
        console.log(
          'XXXXXX  user loyalty code includes ',
          category,
          ' ',
          userLoyaltyCode.includes(category),
        );
        return (
          store.loyalty_code.filter(code => userLoyaltyCode.includes(code))
            .length == true
        );
      }),
    );

    const storesServingCategoryLoyalCustomer = userLoyaltyCode.includes(
      category,
    )
      ? storesList.filter(function (store) {
          console.log(
            'in choosecategory - matching codes in  ',
            store.loyalty_code,
            ' and ',
            userLoyaltyCode,
          );
          console.log(
            'XXXXXX  user loyalty code includes ',
            category,
            ' ',
            userLoyaltyCode.includes(category),
          );
          return (
            store.loyalty_code.filter(code => userLoyaltyCode.includes(code))
              .length == true
          );
        })
      : storesList;

    navigate(CHOOSESTORE, {
      storesServingCategory: storesServingCategoryLoyalCustomer,
      category: category,
    });
    */
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
            console.log('yes');
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
            console.log('NO');
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
                  maxLength={8}
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
