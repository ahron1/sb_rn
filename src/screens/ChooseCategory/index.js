import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import ChooseCategoryComponent from '../../components/ChooseCategory';
import getStores from '../../context/actions/getStores';
import {GlobalContext} from '../../context/Provider';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

// this will be fetched from the server
const CategoryChoose = ({navigation}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  const {storesDispatch, storesState} = useContext(GlobalContext);

  /*
  console.log(
    'in choose category screen. loyalty code of user is ',
    authState.loyalty_code,
  );
  */

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

  useEffect(() => {
    // the navigation in the dep array is to trigger a reload/sort on navigating back to this screen
    // console.log('navigating to stores screen.');
    const unsubscribe = navigation.addListener('focus', () => {
      getStores()(storesDispatch);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <ChooseCategoryComponent
      storesLoading={storesState.getStores.loading}
      storesData={storesState.getStores.data}
    />
  );
};

export default CategoryChoose;
