import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  wrapper: {},
  dashboard: {
    paddingHorizontal: '10@s',
    borderWidth: '1.25@s',
    paddingVertical: '10@s',
    // minHeight: '100@s',
    backgroundColor: colors.color1_3,
  },
  dashboardItem: {
    flexDirection: 'column',
    paddingVertical: '5@s',
    paddingHorizontal: '5@s',
  },
  dashboardSubItem: {
    paddingBottom: '7@s',
  },

  dashboardItemTitle: {
    fontSize: '14@s',
    color: colors.white,
  },
  dashboardItemTitleItalic: {
    fontSize: '14@s',
    color: colors.white,
    fontStyle: 'italic',
  },

  dashboardItemText: {
    // flex: 1,
    fontSize: '18@s',
  },
  list: {
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
    fontSize: '15@s',
    flex: 2.5,
  },
  rowItemContent: {
    flex: 6,
    fontFamily: 'Tillana-Medium',
    fontSize: '15@s',
  },
  rowItemTitleBold: {
    fontSize: '15@s',
    flex: 2.5,
    fontWeight: '700',
  },
});
