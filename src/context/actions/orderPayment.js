import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import {
  PAY_ORDER_FAIL,
  PAY_ORDER_LOADING,
  PAY_ORDER_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

export default ({
    orderId,
    isPaymentCash,
    isPaymentOnline,
    isPaymentCredit,
    total,
  }) =>
  dispatch =>
  onSuccess => {
    console.log('in PAY_ORDER action dispatch loading >> ');
    dispatch({
      type: PAY_ORDER_LOADING,
    });

    axiosInstance
      .post('/payment_made', {
        orderId: orderId,
        isPaymentCash: isPaymentCash,
        isPaymentOnline: isPaymentOnline,
        isPaymentCredit: isPaymentCredit,
        amount: total,
      })
      .then(res => {
        console.log('in PAY_ORDER action got response >> ', res.data);
        dispatch({
          type: PAY_ORDER_SUCCESS,
          // payload: dataOrders,
          payload: res.data,
        });
        onSuccess();
      })
      .catch(err => {
        console.log('in PAY_ORDER action error is >> ', err);
        dispatch({
          type: PAY_ORDER_FAIL,
          // payload: dataOrders,
          payload: err,
        });
      });
  };
