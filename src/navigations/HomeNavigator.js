import React from 'react';
import {
  ALLORDERS,
  OFFERS,
  ORDERITEMS,
  REWARDS,
  PROFILE,
  STORES,
  ORDERSTATUS,
  CHOOSECATEGORY,
} from '../constants/routeNames';

import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import OrderItems from '../screens/OrderItems';
import AllOrders from '../screens/AllOrders';
import Profile from '../screens/Profile';
import Offers from '../screens/Offers';
import Rewards from '../screens/Rewards';
import Stores from '../screens/Stores';
import OrderStatus from '../screens/OrderStatus';
import ChooseCategory from '../screens/ChooseCategory';

import colors from '../assets/theme/colors';
import {Button} from 'react-native';

const HomeNavigator = ({navigation}) => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.color2_4,
        headerStyle: {backgroundColor: colors.color1_2},
        cardStyle: {backgroundColor: colors.color2_4},
        headerLeft: null, //to remove default back button.
        headerRight: () => (
          <Button
            onPress={() => navigation.goBack()}
            title="Back"
            color={colors.color1_2}
          />
        ),
      }}
      initialRouteName={PROFILE}>
      <HomeStack.Screen name={ALLORDERS} component={AllOrders} />
      <HomeStack.Screen name={ORDERITEMS} component={OrderItems} />
      <HomeStack.Screen name={PROFILE} component={Profile} />
      <HomeStack.Screen name={OFFERS} component={Offers} />
      <HomeStack.Screen name={REWARDS} component={Rewards} />
      <HomeStack.Screen name={STORES} component={Stores} />
      <HomeStack.Screen name={ORDERSTATUS} component={OrderStatus} />
      <HomeStack.Screen name={CHOOSECATEGORY} component={ChooseCategory} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
