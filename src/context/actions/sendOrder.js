import {
  SEND_ORDER_FAIL,
  SEND_ORDER_LOADING,
  SEND_ORDER_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

export default ({orderId, storeId, isPickup, isDelivery, formOrderSend}) =>
  dispatch =>
  onSuccess => {
    console.log('in sendorder action form order is >> ', formOrderSend);
    dispatch({
      type: SEND_ORDER_LOADING,
    });

    axiosInstance
      .post('/send_order', {
        orderId: orderId,
        storeId: storeId,
        isPickup: isPickup,
        isDelivery: isDelivery,
        orderComment: formOrderSend.orderComment
          ? formOrderSend.orderComment
          : null,
      })
      .then(res => {
        console.log('in sendorder action got response >> ', res.data);
        dispatch({
          type: SEND_ORDER_SUCCESS,
          // payload: dataOrders,
          payload: res.data,
        });
        onSuccess();
      })
      .catch(err => {
        console.log('in send order action error is >> ', err);
        dispatch({
          type: SEND_ORDER_FAIL,
          // payload: dataOrders,
          payload: err,
        });
      });
  };
