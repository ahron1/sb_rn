import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, Image, PermissionsAndroid } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Button, Text, TextInput } from 'react-native-paper';
import HocHeader from '../../Hoc/Header'
import Icon from '../../../components/common/Icon/index';
import styles from './styles';
import { HorizontalLayout, VerticalLayout } from "../../../components/common/index"


function Index() {



  const [image, setImage] = useState(null)
  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: "video",
    }).then(image => {
      setImage(image.path)
    });
  };



  return (
    <VerticalLayout style={{ flex: 1 }}>
      <VerticalLayout style={{ flex: 0.2 }}>
          <Text style={{ fontWeight: '900' }} >Appliance</Text>
          <TextInput placeholder='Appliance' multiline={true} underlineColorAndroid="transparent" numberOfLines={2} style={{ borderBottomColor: 'white', borderBottomWidth: 0 }} />
      </VerticalLayout>
      <VerticalLayout style={{ flex: 0.4,alignItems:'center' }}>
        <Text style={{ fontWeight: '900' }}>Upload Video</Text>
        <TouchableOpacity style={{ height: 150, width: "80%", backgroundColor: 'gray', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginTop: 20 }} onPress={() => {
          openPicker()
        }}>
          {image ?
            <Image source={{ uri: image }} style={{ height: 200, width: '90%' }} resizeMode="stretch" />
            :
            <Icon
              type="fontAwesome"
              name="upload"
              style={{ ...styles.checkMark }}
            />
          }

        </TouchableOpacity>

      </VerticalLayout>
      <VerticalLayout style={{ flex: 0.2 }}>
          <Text style={{ fontWeight: '900' }} >Description</Text>
          <TextInput placeholder='Description' multiline={true} underlineColorAndroid="transparent" numberOfLines={2} style={{ borderBottomColor: 'white', borderBottomWidth: 0 }} />
      </VerticalLayout>
      <VerticalLayout style={{ flex: 0.2,alignItems:'center' }}>

      <Button  mode="contained" onPress={() => console.log('Pressed')} style={{...styles.buttonStyle}}>
                          Add
                        </Button>
      </VerticalLayout>

    </VerticalLayout>
  )
}

export default HocHeader(Index, {
  title: "Store 1 Name",
  ButtonName: 'Contact'
})