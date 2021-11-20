import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useEffect} from 'react';
import {Text, Pressable, View} from 'react-native';
import ChooseStoreComponent from '../../components/ChooseStore';
import {GlobalContext} from '../../context/Provider';
import {useFocusEffect} from '@react-navigation/native';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';
import getStores from '../../context/actions/getStores';
import getDefaultStore from '../../context/actions/getDefaultStore';

const ChooseStore = () => {
  const route = useRoute();

  if (route.params) {
    /*
    console.log('in choose store screen. route stores is:>> ', route.params.storesServingCategory);
    console.log(
      'in choose store screen. route category is:>> ',
      route.params.category,
    );
    */
    // if (route.params.orderId) {
    // orderId = route.params.orderId;
  }

  return (
    <ChooseStoreComponent storesData={route.params.storesServingCategory} />
  );
};

export default ChooseStore;
