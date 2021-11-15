import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import ChooseCategoryComponent from '../../components/ChooseCategory';
import getStores from '../../context/actions/getStores';
import {GlobalContext} from '../../context/Provider';

// this will be fetched from the server
const CategoryChoose = ({navigation}) => {
  const {storesDispatch, storesState} = useContext(GlobalContext);
  const {authState} = useContext(GlobalContext);

  console.log('in choose category screen. loyalty code of user is ', authState.loyalty_code);

  useEffect(() => {
    // the navigation in the dep array is to trigger a reload/sort on navigating back to this screen
    // console.log('navigating to stores screen.');
    const unsubscribe = navigation.addListener('focus', () => {
      getStores()(storesDispatch);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ChooseCategoryComponent
      storesLoading={storesState.getStores.loading}
      storesData={(storesState.getStores.data)}
    />
  );
};

export default CategoryChoose;
