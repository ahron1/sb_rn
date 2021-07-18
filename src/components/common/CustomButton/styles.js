import {ScaledSheet} from 'react-native-size-matters';

export default ScaledSheet.create({
  wrapper: {
    height: '45@s',
    paddingHorizontal: '25@s',
    marginVertical: '5@s',
    borderRadius: '100@s',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // width: '200@s',
  },
  activityIndicator: {
    // color: colors.color2_4,
    paddingRight: 5,
  },

  loaderSection: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: '28@s',
  },
});
