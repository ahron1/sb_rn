import {useState} from 'react';
import React from 'react';
import {View, Image, ImageProps, Pressable, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CustomButtonSmall from '../CustomButtonSmall';
import colors from '../../../assets/theme/colors';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

interface AvatarProps extends ImageProps {
  onChange?: (image: ImageOrVideo) => void;
}

const Styles = StyleSheet.create({
  avatar: {
    // paddingTop: 10,
    height: 300,
    width: 300,
    // borderRadius: 100,
    // padding: 10,
  },
});

export const Avatar = (props: AvatarProps) => {
  const [uri, setUri] = useState(props.source?.uri || undefined);

  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setUri(image.path);
      props.onChange?.(image);
    });
  };
  return (
    <View>
      <Pressable onPress={pickPicture}>
        <View>
          <Image
            style={Styles.avatar}
            {...props}
            source={uri ? {uri} : props.source}
          />
        </View>
      </Pressable>

      {/*
      <CustomButtonSmall
        title="Upload prescription"
        onPress={pickPicture}
        // loading={orderItemsState.addOrderItem.loading}
        // disabled={orderItemsState.addOrderItem.loading}
        // style={styles.buttonSection}
        backgroundColor={colors.color1_4}
      />
      */}
    </View>
  );
};
