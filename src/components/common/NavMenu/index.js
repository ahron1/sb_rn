import {useNavigation} from '@react-navigation/core';
import {Text, Pressable, View} from 'react-native';
import React, {useEffect} from 'react';
import Icon from '../../../components/common/Icon';
import styles from './styles';

const NavMenuComponent = () => {
  return (
    <View style={styles.menuContainer}>
      <Icon style={styles.menuIcon} type="simpleLine" name="menu" />
      <Text style={styles.menuText}>MENU</Text>
    </View>
  );
};

const NavMenuPressable = props => {
  return <Pressable hitSlop={20} pressRetentionOffset={20} {...props} />;
};

export {NavMenuPressable};
export default NavMenuComponent;
