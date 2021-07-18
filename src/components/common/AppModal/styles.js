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
    // minHeight: '300@s',
    // maxWidth: '85%',
    // alignItems: 'center',
    paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  modalBodyText: {
    fontSize: '26@s',
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

  scrollViewContentContainer: {
    // alignSelf: 'center',
    alignItems: 'center',
    // alignContent: 'center',
  },
  button: {
    borderRadius: '20@s',
    padding: '10@s',
    elevation: '2@s',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: '15@s',
    textAlign: 'center',
  },
  footer: {
    justifyContent: 'space-evenly',
    paddingVertical: '7@s',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerText: {
    fontSize: '12@s',
  },
  footerSeparator: {
    height: '2@s',
    backgroundColor: colors.grey,
  },
  footerItems: {
    width: '100%',
    padding: '10@s',
  },
});
