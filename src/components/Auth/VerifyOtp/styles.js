import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../assets/theme/colors';

export default ScaledSheet.create({
  logoImage: {
    height: '80@s',
    width: '80@s',
    alignSelf: 'center',
    marginTop: '15@s',
  },
  screen: {
    flex: 1,
    padding: '0@s',
  },
  introText: {
    fontSize: '20@s',
  },
  welcomeText: {
    fontSize: '25@s',
    fontWeight: '600',
    paddingBottom: '10@s',
    textAlign: 'center',
  },
  enterNumber: {
    fontSize: '20@s',
    fontWeight: '700',
  },
  input: {
    fontSize: '25@s',
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
  },
});
