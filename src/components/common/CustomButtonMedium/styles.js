import {ScaledSheet} from 'react-native-size-matters';

export default ScaledSheet.create({
  wrapper: {
    height: '40@s',
    paddingHorizontal: '10@s',
    marginVertical: '3@s',
    borderRadius: '100@s',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  activityIndicator: {
    // color: colors.color2_4,
    paddingRight: 4,
  },

  loaderSection: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: '20@s',
  },
});
