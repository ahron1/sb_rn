import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import AppModal from '../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import RadioGroup from 'react-native-radio-buttons-group';
import {ALLORDERS} from '../../constants/routeNames';
import orderPayment from '../../context/actions/orderPayment';
import Icon from '../common/Icon';

const MakePayment = ({
  orderId,
  customerId,
  storeId,
  total,
  setModalVisibleMakePayment,
  modalVisibleMakePayment,
}) => {
  // console.log(
  // 'in ordersend component. order details is:>> customer id ',
  // customerId,
  // ' order id ',
  // orderId,
  // ' store id ',
  // storeId,
  // );
  //todo - use storeid and customer id to check payment options for store
  // and if the store offers credit to the customer.
  // right now it is just hardcoded in the frontend.
  const {navigate} = useNavigation();
  const {ordersDispatch, ordersState} = useContext(GlobalContext);

  const label2 = 'Pay online \n(not yet available for this store)';
  const label1 = 'Pay store directly \n(by cash or other method)';
  const label3 =
    'Add order amount to credit book.\n(not yet available for this store)';
  const radioButtonsData = [
    {
      id: '1',
      label: label1,
      value: 'payment_cash',
      selected: true,
      labelStyle: {fontSize: 18},
    },
    {
      id: '2',
      label: label2,
      value: 'payment_online',
      disabled: true,
      labelStyle: {fontSize: 18},
    },
    {
      id: '3',
      label: label3,
      value: 'payment_credit',
      disabled: true,
      labelStyle: {fontSize: 18},
    },
  ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  // useEffect(() => {
  // setRadioButtons(radioButtonsData);
  // }, [selectedStoreDetails]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }
  const onSubmitMakePayment = () => {
    let isPaymentCredit;
    let isPaymentOnline;
    let isPaymentCash;
    if (
      radioButtons[0].selected ||
      radioButtons[1].selected ||
      radioButtons[2].selected
    ) {
      if (radioButtons[0].selected) {
        // console.log(' . cash ');
        isPaymentCash = true;
        isPaymentOnline = false;
        isPaymentCredit = false;
      } else if (radioButtons[1].selected) {
        // console.log(' . online ');
        isPaymentCash = false;
        isPaymentOnline = true;
        isPaymentCredit = false;
      } else if (radioButtons[2].selected) {
        // console.log(' . credit ');
        isPaymentCash = false;
        isPaymentOnline = false;
        isPaymentCredit = true;
      }

      // console.log(
      // 'A OK, will create new order using: >> ',
      // orderId,
      // ' cash ',
      // isPaymentCash,
      // ' credit ',
      // isPaymentCredit,
      // ' online ',
      // isPaymentOnline,
      // );
      orderPayment({
        orderId,
        isPaymentCash,
        isPaymentOnline,
        isPaymentCredit,
        total,
      })(ordersDispatch)(() => {
        // console.log(
        // 'in order items components. successfully confirmed order payment. going back to all orders',
        // );
        Alert.alert(
          'Thank you ',
          'Thank you for confirming the payment. \n\nHope you had a good experience. \n\nEnjoy your products. .',
        );
        navigate(ALLORDERS);
        setModalVisibleMakePayment(false);
      });
    } else {
      Alert.alert('Payment method', 'Please choose your payment method');
    }
  };

  return (
    <AppModal
      modalVisible={modalVisibleMakePayment}
      setModalVisible={setModalVisibleMakePayment}
      modalTitle={'Make payment'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        // console.log('modal closed');
        // setFormErrorsOrderSend({});
        // setFormOrderSend({});
      }}
      modalBody={
        <View>
          <View style={styles.listRow}>
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitle]}>Step 1: </Text>
              <Text style={[styles.rowItemContent]}>
                Check the items you received
              </Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitle]}>Step 2: </Text>
              <Text style={[styles.rowItemContent]}>
                Choose a payment method
              </Text>
            </View>
            <View style={styles.textSection}>
              <Text style={styles.textBold}>
                Payment amount due is
                <>
                  {' '}
                  <Icon
                    type="materialCommunity"
                    name="currency-inr"
                    style={styles.price}
                  />
                </>
                <Text style={styles.price}>{total}</Text>
              </Text>
            </View>
          </View>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            label="payment"
          />

          <View>
            <View style={styles.textSection}>
              <Text style={styles.textBold}>
                After paying the seller, press OK to confirm.
              </Text>
            </View>

            <CustomButtonMedium
              title="OK"
              onPress={onSubmitMakePayment}
              style={styles.buttonSection}
              loading={ordersState.payOrder.loading}
              disabled={ordersState.payOrder.loading}
              backgroundColor={colors.color1_4}
            />
          </View>
        </View>
      }
    />
  );
};

export default MakePayment;
