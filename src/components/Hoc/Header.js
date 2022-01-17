import React, {Component} from 'react';
import { View } from 'react-native'
import { Button,Text } from 'react-native-paper';
import customStyle from "./styles"

export default function HocHeader(HocComponent,props){
    return class extends Component{
        render(){
            return (
                <View style={{...customStyle.container}}>
                   <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center'}}>
                        <Text style={{fontWeight:'900'}}>{props.title}</Text>

                        <Button  mode="contained" onPress={() => console.log('Pressed')} style={{...customStyle.buttonStyle}}>
                          {props.ButtonName}
                        </Button>
                   </View>
                    <HocComponent></HocComponent>
                </View>

            );
        }
    } 
}