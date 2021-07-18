import {
  LOGOUT_FAIL,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
} from '../../../constants/actionTypes';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logOut = () => dispatch => {
  console.log('in logout. dispatch loading');
  dispatch({
    type: LOGOUT_LOADING,
  });

  AsyncStorage.clear()
    .then(
      auth()
        .signOut()
        .then(() => {
          console.log('logout success');
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        })
        .catch(error => {
          console.log('received  error from firebase auth for logout ');
          dispatch({
            type: LOGOUT_FAIL,
            payload: error,
          });
        }),
    )
    .catch(error => {
      console.log(
        'unable to remove creds from async storage',
        JSON.stringify(error),
      );
      dispatch({
        type: LOGOUT_FAIL,
        payload: error,
      });
    });
};

export default logOut;
