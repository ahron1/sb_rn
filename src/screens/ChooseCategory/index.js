import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import ChooseCategoryComponent from '../../components/ChooseCategory';
import getStores from '../../context/actions/getStores';
import {GlobalContext} from '../../context/Provider';

// this will be fetched from the server
const CategoryChoose = ({navigation}) => {
  const {storesDispatch, storesState} = useContext(GlobalContext);
  /*
  const StoreServices = [
    {
      name: 'store1',
      categories: {
        grocery: false,
        medicines: true,
        fruits: false,
        vegetables: false,
      },
    },
    {
      name: 'store2',
      categories: {
        grocery: true,
        medicines: false,
        fruits: false,
        vegetables: true,
      },
    },
  ];

  const CategoryAvailability = [
    {
      category: 'grocery',
      availability:
        StoreServices.filter(function (store) {
          return store.categories.grocery == true;
        }).length > 0
          ? true
          : false,
    },
    {
      category: 'medicines',
      availability:
        StoreServices.filter(function (store) {
          return store.categories.medicines == true;
        }).length > 0
          ? true
          : false,
      // availability: false,
    },
    {
      category: 'fruits',
      availability:
        StoreServices.filter(function (store) {
          return store.categories.fruits == true;
        }).length > 0
          ? true
          : false,
      // availability: false,
    },
    {
      category: 'vegetables',
      availability:
        StoreServices.filter(function (store) {
          return store.categories.vegetables == true;
        }).length > 0
          ? true
          : false,
      // availability: true,
    },
  ];

  */


  // Categories.forEach(availablityUpdate);
  const availablityUpdate = category => {
    category.availability = CategoryAvailability.find(
      item => item.category == category.category,
    ).availability;
  };


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
