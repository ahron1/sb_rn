import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import styles from './styles';
import colors from '../../assets/theme/colors';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Please wait...</Text>
      <View styles={styles.loadingTextIndicator}>
        <Text style={styles.loadingText}>
          Loading
          <View style={styles.activityIndicator}>
            <ActivityIndicator color={colors.color3_4} size="large" />
          </View>
        </Text>
      </View>
    </View>
  );
};

export default LoadingView;
