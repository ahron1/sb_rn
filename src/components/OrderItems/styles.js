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
    paddingHorizontal: '9@s',
    paddingVertical: '9@s',
    // minHeight: '100@s',
    backgroundColor: colors.color2_1_3,
  },
  dashboardItem: {
    flexDirection: 'row',
  },
  dashboardItemTitle: {
    fontSize: '16@s',
    flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  dashboardItemContent: {
    flex: 7,
    fontFamily: 'Tillana-Medium',
    fontSize: '16@s',
  },
  dashboardItemTitleFreeFlow: {
    fontSize: '18@s',
    // flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  dashboardItemContentFreeFlow: {
    // flex: 7,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
  },

  statusboard: {
    paddingHorizontal: '9@s',
    paddingVertical: '9@s',
    // minHeight: '100@s',
    // backgroundColor: colors.color2_1_3,
  },

  columnHeaders: {
    flexDirection: 'row',
    paddingTop: '8@s',
  },
  list: {
    // paddingHorizontal: '10@s',
    // paddingTop: '10@s',
    backgroundColor: colors.color2_3,
  },
  listItem: {
    paddingHorizontal: '10@s',
  },

  emptyListView: {
    padding: '10@s',
    marginVertical: '20@s',
  },

  emptyListText: {
    fontSize: '21@s',
    paddingVertical: '10@s',
  },

  buttons: {
    // minHeight: 40,
  },
  listRowItem: {
    flexDirection: 'row',
    paddingVertical: 9,
  },
  itemTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 5,
    fontSize: '25@s',
    fontWeight: '700',
  },
  quantityTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 1.5,
    fontSize: '25@s',
    fontWeight: '700',
  },
  priceTitle: {
    fontFamily: 'sans-serif-smallcaps',
    fontSize: '25@s',
    flex: 2.25,
    flexWrap: 'wrap',
  },

  itemInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '21@s',
    flex: 5,
    flexWrap: 'wrap',
  },
  quantityInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '21@s',
    flex: 1.5,
    flexWrap: 'wrap',
  },
  priceInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '21@s',
    flex: 2.25,
    flexWrap: 'wrap',
  },
  availabilityInfo: {
    fontFamily: 'Tillana-Medium',
    flex: 0.75,
    flexWrap: 'wrap',
  },
  checkMark: {
    color: colors.color4_1,
    fontSize: '24@s',
  },
  crossMark: {
    color: colors.color3_1,
    fontSize: '24@s',
  },
  price: {
    color: colors.color4_1,
    fontSize: '18@s',
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
