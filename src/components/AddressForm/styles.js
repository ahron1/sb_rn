import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  input: {
    // fontSize: '16@s',
  },
  buttonSection: {
    // paddingVertical: '10@s',
    // paddingHorizontal: '20@s',
    marginHorizontal: '30@s',
    marginTop: '20@s',
    marginBottom: '5@s',
  },
  errorText: {
    fontSize: '15@s',
    color: colors.color3_4,
  },
  introText: {
    fontSize: '18@s',
  },
  introSection: {
    marginVertical: '5@s',
  },
});
