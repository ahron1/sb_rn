import {
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_LOADING,
  GET_USER_DETAILS_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_USER_DETAILS_LOADING,
  });

  axiosInstance
    .get('/get_customer_details')
    .then(res => {
      // console.log('in user_details action got response >> ', res.data);
      dispatch({
        type: GET_USER_DETAILS_SUCCESS,
        // payload: dataOrders,
        payload: res.data,
      });
    })
    .catch(err => {
      // console.log('in user_details action error is >> ', err);
      dispatch({
        type: GET_USER_DETAILS_FAIL,
        // payload: dataOrders,
        payload: err,
      });
    });
};
