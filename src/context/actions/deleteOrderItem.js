import {
  DELETE_ORDERITEM_LOADING,
  DELETE_ORDERITEM_SUCCESS,
  DELETE_ORDERITEM_FAIL,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const deleteOrderItem =
  ({orderItemId}) =>
  dispatch =>
  onSuccess => {
    console.log(
      'in action delete order item. now dispatching loading. order item id:>> ',
      orderItemId,
    );
    dispatch({
      type: DELETE_ORDERITEM_LOADING,
    });

    console.log(
      'in action delete order item. now dispatching success. order item id:>> ',
      orderItemId,
    );

    axiosInstance
      .get('/delete_order_item', {
        params: {
          orderItemId: orderItemId,
        },
      })
      .then(res => {
        console.log('in delete order items action. got response :>> ', res);
        dispatch({
          type: DELETE_ORDERITEM_SUCCESS,
          payload: {orderItemId},
        });
        onSuccess();
      })
      .catch(err => {
        console.log('in delete order items action. got error:>> ', err);
        dispatch({
          type: DELETE_ORDERITEM_FAIL,
          payload: err,
        });
      });
  };

export default deleteOrderItem;
