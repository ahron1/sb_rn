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
import NewOrderGrocery from '../../components/NewOrder/Grocery';

const NewOrder = ({navigation}) => {
  const route = useRoute();
  const orderId = route.params.orderId;
  const chosenStoreDetails = route.params.item;
  const category = route.params.category;
  // console.log('in new order screen. chosen store  is:>> ', chosenStoreDetails);
  // console.log('in new order screen. category  is:>> ', category);

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

  //TODO / TOTEST:
  useEffect(() => {
    // console.log(
    // 'in order items scree. there are now ',
    // dataGetOrderItems.length + ' items in the order',
    // );
  }, [dataGetOrderItems]);

  return (
    <NewOrderGrocery
      // orderStatusDetails={orderStatusDetails}
      orderId={orderId}
      chosenStoreDetails={chosenStoreDetails}
      dataOrderItems={dataGetOrderItems}
      loadingGetOrderItems={loadingGetOrderItems}
    />
  );
};

export default NewOrder;
