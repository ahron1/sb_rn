import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import AppModal from '../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import {useNavigation} from '@react-navigation/native';
import addOrderItem from '../../context/actions/addOrderItem';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import RadioGroup from 'react-native-radio-buttons-group';
import sendOrder from '../../context/actions/sendOrder';
import {ALLORDERS} from '../../constants/routeNames';

const OrderSend = ({
  orderId,
  selectedStoreDetails,
  modalVisibleOrderFinal,
  setModalVisibleOrderFinal,
}) => {
  const {storeId, storeName, offersDelivery, offersPickup} =
    selectedStoreDetails;
  const {navigate} = useNavigation();
  const {ordersDispatch, ordersState} = useContext(GlobalContext);
  const [formOrderSend, setFormOrderSend] = useState({});

  // let radioButtonsData;

  const radioButtonsData =
    // offersDelivery === true && offersPickup === true
    offersDelivery && offersPickup
      ? [
          {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Pickup',
            value: 'pickup',
            labelStyle: {fontSize: 18, paddingVertical: 10},
          },
          {
            id: '2',
            label: 'Delivery',
            value: 'delivery',
            labelStyle: {fontSize: 18, paddingVertical: 10},
          },
        ]
      : // : offersDelivery === true && offersPickup === false
      offersDelivery && !offersPickup
      ? [
          {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Pickup',
            value: 'pickup',
            disabled: true,
            labelStyle: {fontSize: 18, paddingVertical: 10},
          },
          {
            id: '2',
            label: 'Delivery',
            value: 'delivery',
            selected: true,
            labelStyle: {fontSize: 18, paddingVertical: 10},
          },
        ]
      : // : offersPickup === true && offersDelivery === false
      offersPickup && !offersDelivery
      ? [
          {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Pickup',
            value: 'pickup',
            selected: true,
            labelStyle: {fontSize: 18, paddingVertical: 10},
          },
          {
            id: '2',
            label: 'Delivery',
            value: 'delivery',
            disabled: true,
            labelStyle: {fontSize: 18, paddingVertical: 10},
          },
        ]
      : [
          {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Pickup',
            value: 'pickup',
            disabled: true,
            labelStyle: {fontSize: 18, paddingVertical: 10},
          },
          {
            id: '2',
            label: 'Delivery',
            value: 'delivery',
            disabled: true,
            labelStyle: {fontSize: 18, paddingVertical: 10},
          },
        ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  useEffect(() => {
    setRadioButtons(radioButtonsData);
  }, [selectedStoreDetails]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }
  const onSubmitSendOrder = ({name, value, isRequired}) => {
    let isPickup;
    let isDelivery;
    if (radioButtons[0].selected || radioButtons[1].selected) {
      if (radioButtons[0].selected) {
        // console.log(' . pickup ');
        isPickup = true;
        isDelivery = false;
      } else if (radioButtons[1].selected) {
        // console.log(' . delivery ');
        isPickup = false;
        isDelivery = true;
      }
      // console.log(
      // 'A OK, will create new order using: >> ',
      // orderId,
      // storeId,
      // isPickup,
      // isDelivery,
      // ' comment is : ',
      // formOrderSend.orderComment,
      // );
      sendOrder({orderId, storeId, isPickup, isDelivery, formOrderSend})(
        ordersDispatch,
      )(() => {
        // console.log(
        // 'in order items components. successfully sent order. going back to all orders',
        // );
        Alert.alert(
          'Order sent!',
          'Your order has been sent to the store.\n\nWait for the store to respond.',
        );
        navigate(ALLORDERS);
        setModalVisibleOrderFinal(false);
      });
    } else {
      Alert.alert(
        'Pickup or delivery?',
        'Please choose either pickup nor delivery and then touch OK',
      );
    }
  };

  const onChangeOrderComment = ({name, value, isRequired}) => {
    setFormOrderSend({...formOrderSend, [name]: value});
  };
  const placeHolderText =
    'Your instruction about delivery/pickup times, or comments about anything else. \n\nOtherwise just press ok';

  return (
    <AppModal
      modalVisible={modalVisibleOrderFinal}
      setModalVisible={setModalVisibleOrderFinal}
      modalTitle={'Send order'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        // console.log('modal closed');
        setFormOrderSend({});
      }}
      modalBody={
        <View>
          {/* <View style={styles.introSection}>
            <Text style={styles.introText}>
              Enter the item and quantity you want to order:
            </Text>
          </View> */}
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            label="foo"
          />
          <View>
            <AppTextInput
              label="Order comments (optional):"
              placeholder={placeHolderText}
              textAlignVertical="top"
              maxLength={140}
              value={formOrderSend.orderComment || ''}
              onChangeText={value => {
                onChangeOrderComment({
                  name: 'orderComment',
                  value,
                  isRequired: false,
                });
              }}
            />
          </View>

          <CustomButtonMedium
            title="OK"
            onPress={onSubmitSendOrder}
            style={styles.buttonSection}
            loading={ordersState.sendOrder.loading}
            disabled={ordersState.sendOrder.loading}
            backgroundColor={colors.color1_4}
          />
        </View>
      }
    />
  );
};

export default OrderSend;
