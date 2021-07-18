import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../assets/theme/colors';

import {
  useResponsiveHeight,
  useResponsiveWidth,
  useResponsiveFontSize,
} from 'react-native-responsive-dimensions';

// update all stylesheets to use vw, vh, fs.
const vw = useResponsiveWidth;
const vh = useResponsiveHeight;
const fs = useResponsiveFontSize;

export default ScaledSheet.create({
  logoImage: {
    height: '80@s',
    width: '80@s',
    alignSelf: 'center',
    marginTop: '15@s',
  },
  screen: {
    flex: 1,
    padding: '10@s',
  },
  introText: {
    fontSize: '20@s',
  },
  welcomeText: {
    fontSize: '22@s',
    fontWeight: '600',
    paddingBottom: '10@s',
    textAlign: 'center',
  },
  enterNumber: {
    fontSize: '20@s',
    fontWeight: '700',
  },
  textInput: {
    fontSize: '28@s',
  },
  button: {},
  welcomeSection: {
    backgroundColor: colors.primaryBackground,
  },
  stepSection: {
    paddingHorizontal: '20@s',
    paddingTop: '10@s',
    backgroundColor: colors.secondaryBackground,
  },
  numberSection: {
    padding: '20@s',
  },
  buttonSection: {
    paddingHorizontal: '80@s',
    // paddingHorizontal: '20vw',
    // paddingHorizontal: vw(10),
    alignItems: 'center',
  },
});
