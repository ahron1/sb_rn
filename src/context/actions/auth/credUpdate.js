import {
  CRED_UPDATE_FAIL,
  CRED_UPDATE_LOADING,
  CRED_UPDATE_SUCCESS,
} from '../../../constants/actionTypes';

import axiosInstance from '../../../helpers/axiosInterceptor';

const credUpdate =
  ({fireBaseUid, phoneNumber, fcmToken}) =>
  dispatch => {
    // console.log(
    // 'in cred update. dispatch loading  with values:>> ',
    // fireBaseUid,
    // phoneNumber,
    // fcmToken,
    // );

    dispatch({
      type: CRED_UPDATE_LOADING,
    });

    axiosInstance
      .post('/customer_account', {
        fireBaseUid: fireBaseUid,
        phoneNumber: phoneNumber,
        fcmToken: fcmToken,
      })
      .then(res => {
        // console.log('in credupdate. got response >> ', res.data);
        dispatch({
          type: CRED_UPDATE_SUCCESS,
          payload: {
            uid: fireBaseUid,
            number: phoneNumber,
            token: fcmToken,
          },
        });
      })
      .catch(err => {
        // console.log('in credupdate. error is >> ', err);
        dispatch({
          type: CRED_UPDATE_FAIL,
          payload: err,
        });
      });
  };

export default credUpdate;
