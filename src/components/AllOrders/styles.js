import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
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
    fontSize: '14@s',
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
    fontSize: '18@s',
    flex: 2.5,
  },
  rowItemContent: {
    flex: 6,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
  },
  rowItemTitleBold: {
    fontSize: '18@s',
    flex: 2.5,
    fontWeight: '700',
  },
});
