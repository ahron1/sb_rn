import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../assets/theme/colors';

export default ScaledSheet.create({
  menuContainer: {
    paddingTop: '10@s',
    paddingLeft: '10@s',
    textAlignVertical: 'center',
  },
  menuIcon: {
    alignContent: 'center',
    fontSize: '18@s',
    alignItems: 'center',
    textAlign: 'center',
    color: colors.color2_4,
  },
  menuText: {
    fontSize: '12@s',
    color: colors.color2_4,
  },
});
