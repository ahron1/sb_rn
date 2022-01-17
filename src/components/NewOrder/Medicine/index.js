import React,{useState} from 'react'
import { TouchableOpacity ,Image} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Button,Text ,TextInput} from 'react-native-paper';
import HocHeader from '../../Hoc/Header'
import Icon from '../../../components/common/Icon/index';
import styles from './styles';
import { HorizontalLayout ,VerticalLayout} from "../../../components/common/index"


 function Index() {

    const [image,setImage] = useState(null)
     const openPicker = ()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
              console.log("Image path",image.path)
              setImage(image.path)
          });
        }; 
     
    return (
        <VerticalLayout style={{flex:1}}>
            <VerticalLayout style={{flex:2}}>
                <Text style={{fontWeight:'900'}}>Upload Prescription</Text>
                <TouchableOpacity style={{height:200,width:"90%",backgroundColor:'gray',borderRadius:20,alignItems:'center',justifyContent:'center',marginTop:20}} onPress={()=>{
                    openPicker()
                }}>
                    {image?
                    <Image source={{uri:image}} style={{height:200,width:'90%'}}  resizeMode="stretch" />
                    :
                    <Icon
                    type="fontAwesome"
                    name="upload"
                    style={{...styles.checkMark}}
                />
                    }
          
                </TouchableOpacity>

            </VerticalLayout>
            <VerticalLayout style={{flex:1}}>
                <Text style={{fontWeight:'900'}} >Upload Prescription</Text>
                <TextInput placeholder='Description' multiline={true}  underlineColorAndroid="transparent"  numberOfLines={2} style={{borderBottomColor:'white',borderBottomWidth:0}}/>
            </VerticalLayout>
            <VerticalLayout style={{flex:1}}>
                <HorizontalLayout style={{height:60,width:"100%",backgroundColor:'white'}}>
                    <VerticalLayout style={{position: 'absolute',right:10,top:"25%"}}>
                        <Icon
                        type="fontAwesome"
                        name="microphone"
                        style={{...styles.checkMark}}
                    />
                    </VerticalLayout>
                </HorizontalLayout>

            </VerticalLayout>

        </VerticalLayout>
    )
}

export default HocHeader(Index,{
    title:"Store 1 Name",
    ButtonName:'Contact'
})