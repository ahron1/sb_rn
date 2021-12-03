import {useRoute} from '@react-navigation/core';
import React from 'react';
import ChooseStoreComponent from '../../components/ChooseStore';
const ChooseStore = () => {
  const route = useRoute();

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

  return (
    <ChooseStoreComponent
      storesData={route.params.storesData}
      category={route.params.category}
    />
  );
};

export default ChooseStore;
