import {
  ADD_LOYALTYCODE_FAIL,
  ADD_LOYALTYCODE_SUCCESS,
  ADD_LOYALTYCODE_LOADING,
} from '../../../constants/actionTypes';

import axiosInstance from '../../../helpers/axiosInterceptor';

const addLoyaltyCode =
  ({loyaltyCode, category}) =>
  dispatch =>
  onSuccess => {
    /*
  console.log(
    'in add loyalty code action. dispatch loading  with values:>>  ',
    loyaltyCode,
    ' and category ',
    category,
  );
  */
    dispatch({
      type: ADD_LOYALTYCODE_LOADING,
    });
    axiosInstance
      .post('/add_loyalty_code_customer', {
        object:
          '{' + '"' + category + '"' + ':' + '"' + loyaltyCode + '"' + '}',
      })
      .then(res => {
        console.log('in add loyalty code action. got response >> ', res.data);
        dispatch({
          type: ADD_LOYALTYCODE_SUCCESS,
          payload: res.data,
        });
        onSuccess();
      })
      .catch(err => {
        console.log(
          'in add loyalty code action. error is >> ',
          JSON.stringify(err),
        );
        dispatch({
          type: ADD_LOYALTYCODE_FAIL,
          payload: err,
        });
      });
  };

export default addLoyaltyCode;
