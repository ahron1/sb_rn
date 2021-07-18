import React from 'react';
import {View, TextInput, Text} from 'react-native';
import colors from '../../../assets/theme/colors';
import styles from './styles';

const AppTextInput = ({
  keyboardType,
  onChangeText,
  style,
  label,
  icon,
  iconPosition,
  error,
  textValue,
  ...props
}) => {
  const [textFocused, setTextFocused] = React.useState(false);

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    }
    if (textFocused) {
      return colors.primary;
    } else {
      return colors.grey;
    }
  };

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          // {alignItems: icon ? 'center' : 'baseline'}, // enabling will mean input field will have to be touched only at the left side to activate
          {flexDirection: getFlexDirection()},
          {borderColor: getBorderColor()},
        ]}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <TextInput
          placeholderTextColor="grey"
          keyboardType={keyboardType}
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          selectTextOnFocus={true}
          multiline={true}
          value={textValue}
          onFocus={() => {
            setTextFocused(true);
          }}
          onBlur={() => {
            setTextFocused(false);
          }}
          // clearTextOnFocus={true}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
export default AppTextInput;
