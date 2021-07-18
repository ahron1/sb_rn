import {
  USER_ADDRESS_UPDATE_FAIL,
  USER_ADDRESS_UPDATE_LOADING,
  USER_ADDRESS_UPDATE_SUCCESS,
} from '../../../constants/actionTypes';

import axiosInstance from '../../../helpers/axiosInterceptor';

const userAddressUpdate =
  ({userAddress, userCoordinates, geoAccuracy}) =>
  dispatch =>
  onSuccess => {
    console.log(
      'in address update. dispatch loading  with values:>>  ',
      userAddress,
      userCoordinates,
      geoAccuracy,
    );

    dispatch({
      type: USER_ADDRESS_UPDATE_LOADING,
    });

    axiosInstance
      .post('/update_customer_address', {
        userAddress: userAddress,
        userCoordinates: userCoordinates,
        geoAccuracy: geoAccuracy,
      })
      .then(res => {
        console.log('in user address update. got response >> ', res.data);
        dispatch({
          type: USER_ADDRESS_UPDATE_SUCCESS,
          payload: {userAddress: userAddress, userCoordinates: userCoordinates},
        });
        onSuccess();
      })
      .catch(err => {
        console.log('in user address update. error is >> ', err);
        dispatch({
          type: USER_ADDRESS_UPDATE_FAIL,
          payload: err,
        });
      });
  };

export default userAddressUpdate;
