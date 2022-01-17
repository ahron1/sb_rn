import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import OffersComponent from '../../components/Offers';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

const Offers = () => {
  const {setOptions, toggleDrawer} = useNavigation();
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

  return <OffersComponent />;
};

export default Offers;
