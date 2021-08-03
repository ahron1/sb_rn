import {
  USER_NAME_UPDATE_FAIL,
  USER_NAME_UPDATE_LOADING,
  USER_NAME_UPDATE_SUCCESS,
} from '../../../constants/actionTypes';

import axiosInstance from '../../../helpers/axiosInterceptor';

const userNameUpdate =
  ({firebaseUid, userName}) =>
  dispatch =>
  onSuccess => {
    // console.log(
    // 'in name update. dispatch loading  with values:>>  ',
    // firebaseUid,
    // userName,
    // );

    dispatch({
      type: USER_NAME_UPDATE_LOADING,
    });

    axiosInstance
      .post('/update_customer_name', {
        userName: userName,
      })
      .then(res => {
        // console.log('in user name update. got response >> ', res.data);
        dispatch({
          type: USER_NAME_UPDATE_SUCCESS,
          payload: userName,
        });
        onSuccess();
      })
      .catch(err => {
        // console.log('in user name update. error is >> ', err);
        dispatch({
          type: USER_NAME_UPDATE_FAIL,
          payload: err,
        });
      });
  };

export default userNameUpdate;
