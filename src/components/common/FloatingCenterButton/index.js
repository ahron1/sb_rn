import React from 'react';
import styles from './styles';
import Icon from '../Icon';
import {Pressable, Text, View} from 'react-native';
import colors from '../../../assets/theme/colors';

const FloatingCenterButton = ({
  onPress,
  buttonText,
  iconType,
  iconName,
  disabled,
  loading,
  circleColor,
  iconColor,
}) => {
  return (
    <View
      style={[
        styles.floatingCenterButton,
        {backgroundColor: disabled ? colors.grey : colors.color1_4},
      ]}>
      <Pressable
        hitSlop={30}
        disabled={disabled}
        pressRetentionOffset={30}
        onPress={onPress}
        android_ripple={{color: colors.white, borderless: true}}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonText}>
              {loading ? 'Loading...' : buttonText}
            </Text>
          </View>
          <View style={styles.button}>
            <View
              style={[
                styles.buttonCircle,
                {backgroundColor: disabled ? colors.lightgrey : circleColor},
              ]}>
              <Icon
                style={styles.buttonIcon}
                type={iconType}
                name={iconName}
                color={disabled ? colors.white : iconColor}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default FloatingCenterButton;
