import {
  DELETE_ORDER_LOADING,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const deleteOrder =
  ({orderId}) =>
  dispatch =>
  onSuccess => {
    // console.log(
    // 'in action delete order . now dispatching loading. order  id:>> ',
    // orderId,
    // );
    dispatch({
      type: DELETE_ORDER_LOADING,
    });

    // console.log(
    // 'in action delete order . now dispatching success. order  id:>> ',
    // orderId,
    // );

    axiosInstance
      .get('/delete_order', {
        params: {
          orderId: orderId,
        },
      })
      .then(res => {
        // console.log('in delete order s action. got response :>> ', res);
        dispatch({
          type: DELETE_ORDER_SUCCESS,
          payload: {orderId},
        });
        onSuccess();
      })
      .catch(err => {
        // console.log('in delete order s action. got error:>> ', err);
        dispatch({
          type: DELETE_ORDER_FAIL,
          payload: err,
        });
      });
  };

export default deleteOrder;
