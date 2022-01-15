import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from './SideMenu';
import {HOME_NAVIGATOR} from '../constants/routeNames';
import HomeNavigator from './HomeNavigator';

const getDrawerContent = navigation => {
  return <SideMenu navigation={navigation} />;
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerType="front"
      drawerPosition="right"
      drawerContent={({navigation}) => getDrawerContent(navigation)}>
      <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
