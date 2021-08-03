import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  wrapper: {},

  dashboard: {
    paddingHorizontal: '20@s',
    paddingVertical: '9@s',
    // minHeight: '100@s',
    backgroundColor: colors.color4_3,
  },
  dashboardItem: {
    flexDirection: 'row',
  },
  dashboardItemTitle: {
    fontSize: '18@s',
    flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  dashboardItemTitleFreeFlow: {
    fontSize: '18@s',
    color: colors.color2_4,
    // flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  dashboardItemContent: {
    // flex: 7,
    color: colors.color3_2,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
  },

  emptyListView: {
    paddingHorizontal: '20@s',
    marginVertical: '30@s',
  },

  emptyListText: {
    fontSize: '18@s',
    paddingVertical: '10@s',
  },
  button: {
    paddingHorizontal: '12@s',
    // backgroundColor: colors.color4_1_2,
  },

  buttonWithText: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerRow: {
    paddingTop: '20@s',
  },

  listRow: {
    paddingHorizontal: '10@s',
    paddingVertical: '6@s',
    backgroundColor: colors.color2_2,
  },
  rowItem: {
    flexDirection: 'row',
  },
  rowItemTitle: {
    fontSize: '18@s',
    flex: 2,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemTitleLong: {
    fontSize: '18@s',
    flex: 5,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContentRegular: {
    flex: 6,
    // fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
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
    flex: 2,
    fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContentBold: {
    flex: 6,
    fontFamily: 'Tillana-SemiBold',
    fontSize: '18@s',
    // flexWrap: 'wrap',
  },

  listRowItem: {
    flexDirection: 'row',
    paddingVertical: 9,
  },
  emptyContainer: {
    paddingVertical: '30@s',
    paddingHorizontal: '30@s',
  },
  emptyText: {
    fontSize: '22@s',
    color: colors.color4_1,
    paddingVertical: '20@s',
  },
  emptyTextIndicator: {
    flexDirection: 'row',
  },
  buttonSection: {
    paddingHorizontal: '100@s',
    paddingBottom: '10@s',
  },
});
