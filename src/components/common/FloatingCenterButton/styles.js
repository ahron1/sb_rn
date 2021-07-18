import colors from '../../../assets/theme/colors';
import {ScaledSheet} from 'react-native-size-matters';

export default ScaledSheet.create({
  buttonIcon: {
    fontSize: '25@s',
    // color: colors.color2_4,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
  },
  buttonCircle: {
    width: '40@s',
    height: '40@s',
    borderRadius: '100@s',
    justifyContent: 'center',
    // marginBottom: '3@s',
  },
  buttonText: {
    fontSize: '22@s',
    color: colors.color2_4,
    fontWeight: '600',
    paddingRight: '8@s',
    paddingLeft: '8@s',
    textAlignVertical: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonTextContainer: {
    justifyContent: 'center',
  },
  floatingCenterButton: {
    backgroundColor: colors.color1_4,
    borderRadius: '50@s',
    // width: '145@s',
    height: '50@s',
    position: 'absolute',
    bottom: '20@s',
    // right: '20@s',
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    // alignContent: 'center',
    // paddingRight: '8@s',
    paddingHorizontal: '5@s',
  },
});
