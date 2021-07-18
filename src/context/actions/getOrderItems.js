import {
  GET_ORDERITEMS_LOADING,
  GET_ORDERITEMS_FAIL,
  GET_ORDERITEMS_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const getOrderItems = orderId => dispatch => {
  console.log('in getordersitems dispathc loading >> ');
  dispatch({
    type: GET_ORDERITEMS_LOADING,
  });

  axiosInstance
    .get('/get_order_items', {
      params: {
        orderId: orderId,
      },
    })
    .then(res => {
      // console.log('in getordersitems >> ');
      dispatch({
        type: GET_ORDERITEMS_SUCCESS,
        // payload: dataOrders,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('in getorderitems error is >> ', err);
      dispatch({
        type: GET_ORDERITEMS_FAIL,
        // payload: dataOrders,
        payload: err,
      });
    });

  // dispatch({
  // type: GET_ORDERITEMS_SUCCESS,
  // payload: dataOrderItems.find(x => x.orderId === orderId).orderItems,
  // });
};

export default getOrderItems;
