import {
  ADD_ORDER_FAIL,
  ADD_ORDER_LOADING,
  ADD_ORDER_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';
import getDateTime from '../../helpers/dateTimeString';
import getOrderStatus from '../../helpers/orderStatus';

const addOrder =
  ({storeId, category}) =>
  dispatch =>
  onSuccess => {
    dispatch({
      type: ADD_ORDER_LOADING,
    });

    axiosInstance
      //.get('/add_order')
      .post('/add_order', {
        storeId: storeId,
        category: category,
      })
      .then(res => {
        // console.log('in action add order . new order is >> ', res.data);
        const order = res.data;
        dispatch({
          type: ADD_ORDER_SUCCESS,
          payload: order,
        });
        const {
          time_100_created,
          order_price: orderPrice,
          order_id: orderId,
          is_delivery: isDelivery,
          is_pickup: isPickup,
        } = order;

        const {
          orderStatusText: orderStatusText,
          orderStatusNext: orderStatusNext,
          orderColorCode: orderColorCode,
          orderStatusCode: orderStatusCode,
          orderColorText: orderColorText,
        } = getOrderStatus(order);

        const orderCreatedDateTime = getDateTime(new Date(time_100_created));
        onSuccess(
          orderId,
          orderCreatedDateTime,
          orderStatusText,
          orderStatusNext,
          orderColorCode,
          orderStatusCode,
          orderColorText,
        );
      })
      .catch(err => {
        // console.log('in action add order . fail.. error is >> ', err);
        dispatch({
          type: ADD_ORDER_FAIL,
          payload: err,
        });
      });
  };

export default addOrder;
