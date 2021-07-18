import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../../assets/theme/colors';

export default ScaledSheet.create({
  textInput: {
    flex: 1,
    // paddingVertical: '5@s',
    color: 'black', // color of input text in form fields
    fontSize: '16@s',
  },
  wrapper: {
    minHeight: '40@s',
    borderWidth: '2@s',
    borderRadius: '4@s',
    borderColor: colors.grey,
    paddingHorizontal: '5@s',
    marginTop: '2@s',
    flexDirection: 'row',
  },
  inputContainer: {
    paddingVertical: '8@s',
  },
  errorText: {
    color: colors.danger,
    paddingTop: '1@s',
    fontSize: '15@s',
  },
  icon: {
    textAlignVertical: 'center',
  },
  label: {
    // paddingBottom: '1@s',
    fontSize: '17@s',
    fontWeight: '600',
  },
});
