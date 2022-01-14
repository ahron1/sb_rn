import React, {useEffect} from 'react';
import {useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import OrderItemsComponent from '../../components/OrderItems';
import {GlobalContext} from '../../context/Provider';
import getOrderItems from '../../context/actions/getOrderItems';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

const OrderItems = () => {
  // const {params: {orderId = {}} = {}} = useRoute();
  const route = useRoute();
  // const orderStatusDetails = route.params;
  // const {orderId} = orderStatusDetails;
  const orderId = route.params.orderId;
  const chosenStoreDetails = route.params.item;
  console.log(
    //'in order items screen. chosen store  is:>> ',
    'in order items screen. order params  is:>> ',
    route.params,
  );

  const {setOptions, toggleDrawer} = useNavigation();
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);

  const {data: dataGetOrderItems, loading: loadingGetOrderItems} =
    orderItemsState.getOrderItems;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      chosenStoreDetails={chosenStoreDetails}
      dataOrderItems={dataGetOrderItems}
      loadingGetOrderItems={loadingGetOrderItems}
    />
  );
};

export default OrderItems;
