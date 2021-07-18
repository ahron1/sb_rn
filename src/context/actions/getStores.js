import {
  GET_STORES_LOADING,
  GET_STORES_FAIL,
  GET_STORES_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const getStores = () => dispatch => {
  console.log('in getstores dispatch loading >> ');
  dispatch({
    type: GET_STORES_LOADING,
  });

  axiosInstance
    .get('/get_stores')
    .then(res => {
      console.log('in getstores. server response is >> ', res.data);
      dispatch({
        type: GET_STORES_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('in getstores error is >> ', err);
      dispatch({
        type: GET_STORES_FAIL,
        // payload: dataOrders,
        payload: err,
      });
    });

  // dispatch({
  // type: GET_STORES_SUCCESS,
  // payload: dataOrderItems.find(x => x.orderId === orderId).orderItems,
  // });
};

export default getStores;
