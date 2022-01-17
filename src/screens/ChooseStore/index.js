import {useRoute, useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import ChooseStoreComponent from '../../components/ChooseStore';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

const ChooseStore = () => {
  const route = useRoute();
  const {setOptions, toggleDrawer} = useNavigation();

  if (route.params) {
    /*
    console.log(
      'in choose store screen. route stores is:>> ',
      route.params.storesData,
    );
    console.log(
      'in choose store screen. route category is:>> ',
      route.params.category,
    );
    */
    // if (route.params.orderId) {
    // orderId = route.params.orderId;
  }
  useEffect(() => {
    setOptions({
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

  return (
    <ChooseStoreComponent
      storesData={route.params.storesData}
      category={route.params.category}
    />
  );
};

export default ChooseStore;
