import {
  PHONENUMBER_SIGNIN_SUBMIT_FAIL,
  PHONENUMBER_SIGNIN_SUBMIT_LOADING,
  PHONENUMBER_SIGNIN_SUBMIT_SUCCESS,
} from '../../../constants/actionTypes';

import auth from '@react-native-firebase/auth';

const phoneNumberSignInSubmit = phoneNumber => dispatch => {
  dispatch({
    type: PHONENUMBER_SIGNIN_SUBMIT_LOADING,
  });
  // console.log('in phonenumbersigninsubmit. dispatched loading');

  auth()
    .signInWithPhoneNumber(phoneNumber)
    .then(confirmation => {
      // console.log('received  result from firebase auth :>> ');
      dispatch({
        type: PHONENUMBER_SIGNIN_SUBMIT_SUCCESS,
        payload: confirmation,
      });
    })
    .catch(error => {
      // console.log('received  error from firebase auth', JSON.stringify(error));
      dispatch({
        type: PHONENUMBER_SIGNIN_SUBMIT_FAIL,
        payload: error,
      });
    });
};

export default phoneNumberSignInSubmit;
