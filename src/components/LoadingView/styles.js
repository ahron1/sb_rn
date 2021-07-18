import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  container: {
    paddingVertical: '30@s',
    paddingHorizontal: '30@s',
  },
  loadingText: {
    fontSize: '22@s',
    color: colors.color4_2,
    paddingVertical: '20@s',
  },
  loadingTextIndicator: {
    flexDirection: 'row',
  },
  activityIndicator: {
    paddingHorizontal: '15@s',
  },
});
