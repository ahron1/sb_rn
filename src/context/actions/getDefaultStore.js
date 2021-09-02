import {
  GET_DEFAULT_STORE_LOADING,
  GET_DEFAULT_STORE_FAIL,
  GET_DEFAULT_STORE_SUCCESS,

} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const getDefaultStore = () => dispatch => {
  // console.log('in getstores dispatch loading >> ');
  dispatch({
    type: GET_DEFAULT_STORE_LOADING,
  });

  axiosInstance
    .get('/get_default_store')
    .then(res => {
      // console.log('in getstores. server response is >> ', res.data);
      dispatch({
        type: GET_DEFAULT_STORE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      // console.log('in getstores error is >> ', err);
      dispatch({
        type: GET_DEFAULT_STORE_FAIL,
        // payload: dataOrders,
        payload: err,
      });
    });

  // dispatch({
  // type: GET_DEFAULT_STORE_SUCCESS,
  // payload: dataOrderItems.find(x => x.orderId === orderId).orderItems,
  // });
};

export default getDefaultStore;
