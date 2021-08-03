import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../assets/theme/colors';

export default ScaledSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    flex: 1,
    justifyContent: 'center',
    // marginTop: '22@s',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 1,
    paddingBottom: '2@s',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '600',
    fontSize: '24@s',
    // paddingVertical: '10@s',
  },
  closeIcon: {
    color: colors.color3_2,
  },
  modalBody: {
    minHeight: '250@s',
    paddingHorizontal: 10,
  },
  modalView: {
    // minHeight: '400@s',
    position: 'absolute',
    marginHorizontal: '10@s',
    backgroundColor: colors.white,
    borderRadius: '20@s',
    paddingHorizontal: '20@s',
    paddingVertical: '10@s',
    shadowColor: '#000',
    shadowOffset: {
      width: '0@s',
      height: '2@s',
    },
    shadowOpacity: 0.25,
    shadowRadius: '4@s',
    elevation: '10@s',
    overflow: 'scroll',
  },

  footerSeparator: {
    height: '2@s',
    backgroundColor: colors.grey,
  },
});
