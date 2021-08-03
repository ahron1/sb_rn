import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

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
  titleText: {
    fontSize: '21@s',
    fontWeight: '600',
  },
  bodyText: {
    fontSize: '20@s',
    fontWeight: '600',
  },
  emptySectionText: {
    alignItems: 'flex-start',
    fontSize: '20@s',
    fontWeight: '600',
    paddingVertical: '20@s',
    textAlign: 'center',
  },
  sectionText: {
    marginTop: '10@s',
    marginBottom: '10@s',
    paddingHorizontal: '30@s',
  },

  enterNumber: {
    fontSize: '20@s',
    fontWeight: '700',
  },
  input: {
    fontSize: '25@s',
  },
  button: {
    paddingHorizontal: '12@s',
    backgroundColor: colors.color4_1_2,
  },
  loadableButton: {
    paddingHorizontal: '12@s',
    // backgroundColor: colors.color4_1_2,
  },

  logoutButton: {
    backgroundColor: colors.color2_2_0,
  },

  ordersButton: {
    backgroundColor: colors.color3_3,
  },
  sectionBody: {
    backgroundColor: colors.color2_3,
  },
  sectionTitle: {
    paddingHorizontal: '20@s',
    paddingVertical: '2@s',
    backgroundColor: colors.color2_1_3,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberSection: {
    padding: '20@s',
  },
  buttonSection: {
    paddingHorizontal: '100@s',
    paddingBottom: '10@s',
  },
  ordersButtonSection: {
    marginTop: '30@s',
    marginBottom: '20@s',
    paddingHorizontal: '60@s',
  },
  logoutButtonSection: {
    marginTop: '50@s',
    marginBottom: '50@s',
    paddingHorizontal: '100@s',
  },
  hr: {
    borderBottomColor: 'grey',
    borderBottomWidth: '0.5@s',
  },
});
