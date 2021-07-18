import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  input: {
    // fontSize: '16@s',
  },
  buttonSection: {
    // paddingVertical: '10@s',
    // paddingHorizontal: '10@s',
    marginHorizontal: '30@s',
    marginTop: '20@s',
    marginBottom: '5@s',
  },
  titleText: {
    fontWeight: '700',
    fontSize: '18@s',
  },

  rowItem: {
    flexDirection: 'row',
    paddingVertical: '9@s',
  },
  listRow: {
    // paddingHorizontal: '2@s',
    paddingVertical: '9@s',
  },
  rowItemTitle: {
    fontSize: '16@s',
    flex: 2,
    fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContent: {
    flex: 7,
    // fontFamily: 'Tillana-Medium',
    fontSize: '16@s',
    // flexWrap: 'wrap',
  },
  textSection: {
    marginVertical: '5@s',
    flexDirection: 'row',
  },
  text: {
    // fontWeight: '700',
    fontSize: '16@s',
  },
  textBold: {
    fontWeight: '700',
    fontSize: '16@s',
  },

  introText: {
    fontSize: '18@s',
  },
  introSection: {
    marginVertical: '5@s',
    flexDirection: 'row',
  },
  price: {
    color: colors.color4_1,
    fontSize: '18@s',
    fontFamily: 'Tillana-SemiBold',
    // fontWeight: '700',
  },
});
