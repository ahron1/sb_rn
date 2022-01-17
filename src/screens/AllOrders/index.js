import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {useContext} from 'react';
import AllOrdersComponent from '../../components/AllOrders';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';
import getOrders from '../../context/actions/getOrders';
import {GlobalContext} from '../../context/Provider';

const AllOrders = ({navigation}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  const {ordersDispatch, ordersState} = useContext(GlobalContext);

  const {
    data: dataGetOrders,
    loading: loadingGetOrders,
    error: errorGetOrders,
  } = ordersState.getOrders;
  // console.log('in all orders screen. data get orders is:>> ', dataGetOrders);

  // const getFcmToken = async () => {
  // const fcmToken = await messaging().getToken();
  // if (fcmToken) {
  // console.log('fcm token is :> ', fcmToken);
  // }
  // };

  useEffect(() => {
    setOptions({
      //headerLeft: () => (
      headerRight: () => (
        <NavMenuPressable
          onPress={() => {
            toggleDrawer();
          }}>
          <NavMenuComponent />
        </NavMenuPressable>
      ),
    });
  }, [setOptions, toggleDrawer]);

  // const dataGetOrders = [];

  useEffect(() => {
    // console.log('navigating to  all orders screen.');
    const unsubscribe = navigation.addListener('focus', () => {
      getOrders()(ordersDispatch);
    });
    return unsubscribe;
    // the navigation in the dep array is to trigger a reload/sort on navigating back to this screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, dataGetOrders]);

  return (
    <AllOrdersComponent
      dataAllOrders={dataGetOrders}
      loadingGetOrders={loadingGetOrders}
      errorGetOrders={errorGetOrders}
    />
  );
};

export default AllOrders;
