import {
  ADD_ORDERITEM_FAIL,
  ADD_ORDERITEM_LOADING,
  ADD_ORDERITEM_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const addOrderItem =
  ({orderId, formAddItem}) =>
  dispatch =>
  onSuccess => {
    dispatch({
      type: ADD_ORDERITEM_LOADING,
    });

    axiosInstance
      .post('/add_order_item', {
        orderId: orderId,
        name: formAddItem.itemName,
        quantity: formAddItem.itemQuantity,
      })
      .then(res => {
        console.log('in action add order item. got response >> ', res.data);
        dispatch({
          type: ADD_ORDERITEM_SUCCESS,
          payload: {
            orderId: orderId,
            newOrderDetails: {
              order_item_id: res.data,
              name: formAddItem.itemName,
              quantity: formAddItem.itemQuantity,
              available: null,
              price: null,
            },
          },
        });
        onSuccess();
      })
      .catch(err => {
        console.log('in action add order item. fail.. error is >> ', err);
        dispatch({
          type: ADD_ORDERITEM_FAIL,
          payload: err,
        });
      });
  };

export default addOrderItem;
