import {
  PHONENUMBER_OTP_SUBMIT_FAIL,
  PHONENUMBER_OTP_SUBMIT_LOADING,
  PHONENUMBER_OTP_SUBMIT_SUCCESS,
} from '../../../constants/actionTypes';

const phoneNumberOtpSubmit =
  ({otpCode, confirmationMethod}) =>
  dispatch => {
    console.log('in phonenumberotpsubmit. dispatch loading');
    dispatch({
      type: PHONENUMBER_OTP_SUBMIT_LOADING,
    });
    console.log('in phonenumberotpsubmit. dispatched loading');

    confirmationMethod
      .confirm(otpCode)
      .then(() => {
        dispatch({
          type: PHONENUMBER_OTP_SUBMIT_SUCCESS,
        });
        console.log('received  OTP is okay confirmation from firebase auth  ');
        // onSuccess();
      })
      .catch(error => {
        console.log(
          'received  error from firebase auth for otp check',
          JSON.stringify(error),
        );
        dispatch({
          type: PHONENUMBER_OTP_SUBMIT_FAIL,
          payload: error,
        });
      });
  };

export default phoneNumberOtpSubmit;
