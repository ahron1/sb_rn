import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../assets/theme/colors';

export default ScaledSheet.create({
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
  dashboardButton: {
    flex: 1,
    paddingHorizontal: '50@s',
    paddingVertical: '5@s',
  },
  dashboardItemTitle: {
    fontSize: '16@s',
    flex: 3,
  },
  dashboardItemContent: {
    flex: 7,
    fontFamily: 'Tillana-Medium',
    fontSize: '16@s',
  },
  dashboardItemTitleFreeFlow: {
    fontSize: '18@s',
  },
  dashboardItemContentFreeFlow: {
    // flex: 7,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
  },

  statusboard: {
    paddingHorizontal: '9@s',
    paddingVertical: '9@s',
  },

  columnHeaders: {
    flexDirection: 'row',
    paddingTop: '8@s',
  },
  list: {
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

  button: {
    paddingHorizontal: '22@s',
    backgroundColor: colors.color4_1,
  },
  listRowItem: {
    flexDirection: 'row',
    paddingVertical: 9,
  },
  itemTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 5,
    fontSize: '21@s',
    fontWeight: '700',
  },
  quantityTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 1.75,
    fontSize: '21@s',
    fontWeight: '700',
  },
  priceTitle: {
    fontFamily: 'sans-serif-smallcaps',
    fontSize: '21@s',
    flex: 2.25,
    flexWrap: 'wrap',
  },

  itemInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
    flex: 5,
    flexWrap: 'wrap',
  },
  quantityInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
    flex: 1.75,
    flexWrap: 'wrap',
  },
  priceInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
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
    fontSize: '21@s',
  },
  crossMark: {
    color: colors.color3_1,
    fontSize: '21@s',
  },
  price: {
    color: colors.color4_1,
    fontSize: '18@s',
  },
});
