import {
  GET_ORDERS_FAIL,
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

export default () => dispatch => {
  dispatch({
    type: GET_ORDERS_LOADING,
  });

  axiosInstance
    .get('/get_orders')
    .then(res => {
      // console.log('in getorders action got response >> ', res.data);
      dispatch({
        type: GET_ORDERS_SUCCESS,
        // payload: dataOrders,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('in getorders action error is >> ', err);
      dispatch({
        type: GET_ORDERS_FAIL,
        // payload: dataOrders,
        payload: err,
      });
    });
};
