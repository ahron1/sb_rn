import React from 'react';
import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const CustomButtonSmall = ({
  title,
  backgroundColor,
  disabled,
  loading,
  onPress,
  style,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      android_ripple={{color: colors.white, borderless: true}}
      hitSlop={30}
      pressRetentionOffset={30}
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

export default CustomButtonSmall;
