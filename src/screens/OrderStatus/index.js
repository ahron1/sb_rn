import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import OrderStatusComponent from '../../components/OrderStatus';
import {useRoute} from '@react-navigation/core';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';
import getDateTime from '../../helpers/dateTimeString';

const OrderStatus = ({navigation}) => {
  const {setOptions, toggleDrawer} = useNavigation();

  const route = useRoute();
  console.log('in order status screen. params are:>> ', route.params);
  const {
    orderStatusCode,
    orderColorCode,
    storeName,
    orderId,
    time_200_customer_sent,
  } = route.params;

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <NavMenuPressable
          onPress={() => {
            toggleDrawer();
          }}>
          <NavMenuComponent />
        </NavMenuPressable>
      ),
    });
  }, [setOptions, toggleDrawer]);

  return (
    <OrderStatusComponent
      navigation={navigation}
      orderStatusCode={orderStatusCode}
      orderColorCode={orderColorCode}
      orderId={orderId}
      storeName={storeName}
      // orderSentTime={orderSentTime}
      orderSentTime={getDateTime(new Date(time_200_customer_sent))}
    />
  );
};

export default OrderStatus;
