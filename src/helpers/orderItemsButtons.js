import React from 'react';
import {Text, View} from 'react-native';
import FloatingAddButton from '../components/common/FloatingAddButton';
import FloatingSendButton from '../components/common/FloatingSendButton';

const OrderItemsButtons = ({orderStatusCode, setModalVisibleAddItem}) => {
  //how to get setmodalvisible in this component????
  // const OrderItemsButtons = orderStatusCode => {
  console.log(
    'in order items component. orderstatuscode is:>> ',
    orderStatusCode,
  );
  var buttons;
  switch (orderStatusCode) {
    case 'status_500_customer_received':
      buttons = (
        <>
          <View>
            <View>
              <FloatingSendButton
                buttonText="Send order"
                onPress={() => {
                  console.log('in order items component. send pressed');
                  setModalVisibleAddItem(true);
                }}
              />
              <FloatingAddButton
                buttonText="Add item"
                onPress={() => {
                  console.log('in order items component. + pressed');
                  setModalVisibleAddItem(true);
                }}
              />
            </View>
          </View>
        </>
      );
      break;

    default:
      buttons = (
        <>
          <View>
            <View>
              <FloatingSendButton
                buttonText="Send order"
                onPress={() => {
                  console.log('in order items component. send pressed');
                  setModalVisibleAddItem(true);
                }}
              />
              <FloatingAddButton
                buttonText="Add item"
                onPress={() => {
                  console.log('in order items component. + pressed');
                  setModalVisibleAddItem(true);
                }}
              />
            </View>
          </View>
        </>
      );
  }

  return buttons;
};

const foo = () => {
  const x = (
    <View>
      <Text>foobar</Text>
    </View>
  );
  return x;
};

// export default OrderItemsButtons;
// export default foo;
