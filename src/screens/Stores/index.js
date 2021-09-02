import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useEffect} from 'react';
import {Text, Pressable, View} from 'react-native';
import StoresComponent from '../../components/Stores';
import {GlobalContext} from '../../context/Provider';
import {useFocusEffect} from '@react-navigation/native';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';
import getStores from '../../context/actions/getStores';
import getDefaultStore from '../../context/actions/getDefaultStore';

const Stores = ({navigation}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  const {authState} = useContext(GlobalContext);
  const {storesDispatch, storesState} = useContext(GlobalContext);
  const route = useRoute();

  let orderId = 0;
  if (route.params) {
    // console.log('in stores screen. route is:>> ', route);
    if (route.params.orderId) {
      orderId = route.params.orderId;
    }
  }
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
    // the navigation in the dep array is to trigger a reload/sort on navigating back to this screen
    // console.log('navigating to stores screen.');
    const unsubscribe = navigation.addListener('focus', () => {
      if (authState.latitude && authState.longitude) {
        // console.log('in stores screen. will call getstores');
        if (orderId) {
          // console.log(
          // 'navigated from order items screen. order id is:>> ',
          // orderId,
          // );
          getDefaultStore()(storesDispatch);
        } else {
          // console.log('navigated from menu . order id is:>>  ', orderId);
          getStores()(storesDispatch);
        }
      } else {
        // console.log(
        // 'in stores screen. address not updated. will not call getstores',
        // );
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <StoresComponent
      // storesLoading={storesState.getStores.loading}
      storesLoading={
        orderId
          ? storesState.getDefaultStore.loading
          : storesState.getStores.loading
      }
      // storesData={storesState.getStores.data}
      storesData={
        orderId ? storesState.getDefaultStore.data : storesState.getStores.data
      }
      orderId={orderId}
    />
  );
};

export default Stores;
