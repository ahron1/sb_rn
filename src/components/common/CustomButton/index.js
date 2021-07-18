import React from 'react';
import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const CustomButton = ({
  title,
  backgroundColor,
  disabled,
  loading,
  onPress,
  style,
}) => {
  backgroundColor ? backgroundColor : colors.color1_3;
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      hitSlop={30}
      pressRetentionOffset={30}
      android_ripple={{color: colors.white, borderless: true}}
      style={[
        styles.wrapper,
        {backgroundColor: disabled ? colors.grey : backgroundColor},
        style,
      ]}>
      <View style={[styles.loaderSection]}>
        {loading && (
          <ActivityIndicator
            color={colors.color1_0}
            style={styles.activityIndicator}
          />
        )}
        {title && (
          <Text
            style={[
              styles.buttonText,
              {
                color: disabled ? colors.color2_4 : colors.color2_4,
              },
            ]}>
            {loading ? 'Loading...' : title}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default CustomButton;
