import React, {useEffect} from 'react';
import {useContext} from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import {GlobalContext} from '../../context/Provider';
import getOrderItems from '../../context/actions/getOrderItems';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';
import NewOrderGrocery from '../../components/NewOrder/Grocery';
import NewOrderMedicine from '../../components/NewOrder/Medicine';
import OrderItemsComponent from '../../components/OrderItems';

const NewOrder = ({}) => {
  const route = useRoute();
  const orderId = route.params.orderId;
  const chosenStoreDetails = route.params.item;
  const category = route.params.category;
  //const storeId = route.params.storeId;
  console.log('in new order screen. chosen store  is:>> ', chosenStoreDetails);
  // console.log('in new order screen. category  is:>> ', category);

  const {setOptions, toggleDrawer} = useNavigation();
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);

  // const OrderScreen = NewOrderGrocery;
  let OrderScreen;
  switch (category) {
    case 'grocery':
      //OrderScreen = NewOrderGrocery;
      OrderScreen = OrderItemsComponent;
      break;
    case 'medicine':
      OrderScreen = NewOrderMedicine;
      //OrderScreen = NewOrderGrocery;
      break;
    case 'vegetable':
      OrderScreen = NewOrderGrocery;
      break;
    case 'fruit':
      OrderScreen = NewOrderGrocery;
      break;

    default:
      OrderScreen = NewOrderGrocery;
      break;
  }

  const {
    data: dataGetOrderItems,
    loading: loadingGetOrderItems,
    //error: errorGetOrderItems,
  } = orderItemsState.getOrderItems;

  console.log(
    'in new order screen. getorderitems in orderitemsstate is ',
    orderItemsState.getOrderItems,
  );
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

  return (
    // <NewOrderGrocery
    <OrderScreen
      // orderStatusDetails={orderStatusDetails}
      orderId={orderId}
      chosenStoreDetails={chosenStoreDetails}
      dataOrderItems={dataGetOrderItems}
      loadingGetOrderItems={loadingGetOrderItems}
    />
  );
};

export default NewOrder;
