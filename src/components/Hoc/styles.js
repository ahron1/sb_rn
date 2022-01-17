import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  buttonStyle:{
    marginHorizontal: '5@s',
    marginTop: '5@s',
    marginBottom: '5@s',
    width:'120@s',
    height:'35@s'
  },
  container:{
    height:'70@s',
    justifyContent:'center',
    paddingHorizontal:'20@s',
    flex:1
  }
});
