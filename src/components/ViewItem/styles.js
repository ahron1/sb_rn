import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  input: {
    // fontSize: '16@s',
  },
  buttonSection: {
    // paddingVertical: '10@s',
    // paddingHorizontal: '10@s',
    marginHorizontal: '60@s',
    marginTop: '40@s',
    marginBottom: '5@s',
  },
  introText: {
    fontSize: '18@s',
  },
  introSection: {
    marginVertical: '5@s',
  },

  orderItem: {
    flexDirection: 'row',
    marginVertical: '5@s',
  },
  orderItemTitle: {
    fontSize: '18@s',
    flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  orderItemContent: {
    flex: 7,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
  },
  price: {
    color: colors.color4_1,
    fontSize: '18@s',
  },

});
