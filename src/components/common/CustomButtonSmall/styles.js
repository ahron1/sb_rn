import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../assets/theme/colors';

export default ScaledSheet.create({
  wrapper: {
    height: '30@s',
    paddingHorizontal: '10@s',
    marginVertical: '2@s',
    borderRadius: '100@s',
    alignItems: 'center',
    // alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  activityIndicator: {
    color: colors.color2_4,
    paddingRight: 2,
  },

  loaderSection: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: '18@s',
  },
});
