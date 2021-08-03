import React, {useEffect} from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Text, Pressable, View} from 'react-native';
import OrderItemsComponent from '../../components/OrderItems';
import {GlobalContext} from '../../context/Provider';
import getOrderItems from '../../context/actions/getOrderItems';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

const OrderItems = ({navigation}) => {
  // const {params: {orderId = {}} = {}} = useRoute();
  const route = useRoute();
  // const orderStatusDetails = route.params;
  // const {orderId} = orderStatusDetails;
  const orderId = route.params.orderId;
  // console.log('in order items screen. order id is:>> ', orderId);

  const {setOptions, toggleDrawer} = useNavigation();
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);

  const {
    data: dataGetOrderItems,
    loading: loadingGetOrderItems,
    error: errorGetOrderItems,
  } = orderItemsState.getOrderItems;

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

  useEffect(() => {
    getOrderItems(orderId)(orderItemsDispatch);
  }, []);

  // useEffect(() => {
  // console.log('navigating to  all orders screen.');
  // const unsubscribe = navigation.addListener('focus', () => {
  // getOrderItems(orderId)(orderItemsDispatch);
  // });
  // return unsubscribe;
  // }, [navigation, dataGetOrderItems]);

  //TODO / TOTEST:
  useEffect(() => {
    // console.log(
    // 'in order items scree. there are now ',
    // dataGetOrderItems.length + ' items in the order',
    // );
  }, [dataGetOrderItems]);

  return (
    <OrderItemsComponent
      // orderStatusDetails={orderStatusDetails}
      orderId={orderId}
      dataOrderItems={dataGetOrderItems}
      loadingGetOrderItems={loadingGetOrderItems}
    />
  );
};

export default OrderItems;
