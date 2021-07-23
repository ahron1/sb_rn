import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  // export default StyleSheet.create({
  // logoImage: {
  // height: '80@s',
  // width: '80@s',
  // alignSelf: 'center',
  // marginTop: '15@s',
  // },
  // screen: {
  // flex: 1,
  // padding: '0@s',
  // },

  wrapper: {},
  dashboard: {
    paddingHorizontal: '10@s',
    borderWidth: '1.25@s',
    paddingVertical: '10@s',
    // minHeight: '100@s',
    backgroundColor: colors.color2_4,
  },
  dashboardItem: {
    flexDirection: 'column',
  },
  dashboardItemTitle: {
    fontSize: '18@s',
    // flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  dashboardItemText: {
    // flex: 1,
    fontSize: '18@s',
  },
  dashboardItemTitleFreeFlow: {
    fontSize: '14@s',
    // flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  dashboardItemContentFreeFlow: {
    // flex: 7,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
  },

  list: {
    // paddingHorizontal: '10@s',
    // paddingTop: '10@s',
    backgroundColor: colors.color2_3,
  },
  emptyListView: {
    padding: '10@s',
    marginVertical: '80@s',
  },

  emptyListText: {
    fontSize: '21@s',
  },
  rowItem: {
    flexDirection: 'row',
  },

  listRow: {
    paddingHorizontal: '10@s',
    paddingVertical: '12@s',
  },
  rowItemTitle: {
    fontSize: '18@s',
    flex: 2.5,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContent: {
    flex: 6,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
    // flexWrap: 'wrap',
  },
  rowItemTitleBold: {
    fontSize: '18@s',
    flex: 2.5,
    fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContentBold: {
    flex: 6,
    fontFamily: 'Tillana-SemiBold',
    fontSize: '18@s',
    // flexWrap: 'wrap',
  },

  buttons: {
    // minHeight: 40,
  },
  itemTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 5,
    fontSize: '28@s',
    fontWeight: '700',
  },
  quantityTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 1.5,
    fontSize: '28@s',
    fontWeight: '700',
  },
  priceTitle: {
    fontFamily: 'sans-serif-smallcaps',
    fontSize: '28@s',
    flex: 1.75,
    flexWrap: 'wrap',
  },

  itemInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '24@s',
    flex: 5,
    flexWrap: 'wrap',
  },
  quantityInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '24@s',
    flex: 1.5,
    flexWrap: 'wrap',
  },
  priceInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '24@s',
    flex: 1.75,
    flexWrap: 'wrap',
  },
  availabilityInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '24@s',
    flex: 0.75,
    flexWrap: 'wrap',
  },
  checkMark: {
    color: colors.color4_1,
    fontSize: '30@s',
  },
  crossMark: {
    color: colors.color3_1,
    fontSize: '30@s',
  },

  // titleText: {
  //   fontSize: '21@s',
  //   fontWeight: '600',
  // },
  // bodyText: {
  //   fontSize: '20@s',
  //   fontWeight: '600',
  // },

  // emptySectionText: {
  //   alignItems: 'flex-start',
  //   fontSize: '20@s',
  //   fontWeight: '600',
  //   paddingVertical: '20@s',
  //   textAlign: 'center',
  // },
  // sectionText: {
  //   marginTop: '10@s',
  //   marginBottom: '10@s',
  //   paddingHorizontal: '30@s',
  // },

  // enterNumber: {
  //   fontSize: '20@s',
  //   fontWeight: '700',
  // },
  // input: {
  //   fontSize: '25@s',
  // },
  // button: {
  //   paddingHorizontal: '12@s',
  // },
  // logoutButton: {},
  // sectionBody: {
  //   backgroundColor: colors.primaryBackground,
  // },
  // sectionTitle: {
  //   paddingHorizontal: '20@s',
  //   paddingVertical: '2@s',
  //   backgroundColor: colors.secondaryBackground,
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // numberSection: {
  //   padding: '20@s',
  // },
  // buttonSection: {
  //   paddingHorizontal: '100@s',
  //   paddingBottom: '10@s',
  // },
  // logoutButtonSection: {
  //   marginTop: '50@s',
  //   paddingHorizontal: '100@s',
  // },
  // hr: {
  //   borderBottomColor: 'grey',
  //   borderBottomWidth: '0.5@s',
  // },
});
