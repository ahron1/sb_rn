import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  container: {
    paddingLeft: '10@s',
    paddingRight: '5@s',
    paddingTop: '10@s',
    paddingBottom: '20@s',
  },
  input: {
    // fontSize: '16@s',
  },
  dashboard: {
    paddingHorizontal: '20@s',
    paddingVertical: '20@s',
    // backgroundColor: 'yellow',
  },
  dashboardItem: {
    flexDirection: 'row',
  },
  dashboardTextTitle: {
    flex: 1,
    fontSize: '18@s',
    fontWeight: '700',
  },
  dashboardTextDetail: {
    fontFamily: 'Tillana-Medium',
    flex: 2,
    fontSize: '18@s',
  },
  buttonSection: {
    // paddingVertical: '10@s',
    // paddingHorizontal: '10@s',
    marginHorizontal: '30@s',
    marginTop: '20@s',
    marginBottom: '5@s',
  },
  introText: {
    fontSize: '18@s',
  },
  introSection: {
    marginVertical: '5@s',
  },
  sectionWho: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  sectionProgressArrow: {
    flex: 1.5,
    // borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },

  sectionDescText: {
    fontSize: '15@s',
  },
  sectionStatusDescText: {
    fontSize: '16@s',
    fontFamily: 'Tillana-SemiBold',
  },

  sectionDesc: {
    // marginVertical: '5@s',
    // borderWidth: 1,
  },
  description: {
    flex: 4,
    flexDirection: 'column',
    // borderWidth: 1,
    // alignItems: 'center',
    alignSelf: 'center',
    marginVertical: '15@s',
  },
  sectionActionIcon: {
    flex: 1.75,
    // borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  sectionStatusIcon: {
    flex: 1.0,
    alignContent: 'center',
    // borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },

  iconXLarge: {
    fontSize: '80@s',
  },
  iconLarge: {
    fontSize: '70@s',
  },
  iconMedium: {
    fontSize: '60@s',
  },
  iconSmall: {
    fontSize: '50@s',
  },
  iconXSmall: {
    fontSize: '40@s',
  },
  iconTiny: {
    fontSize: '30@s',
  },
});
