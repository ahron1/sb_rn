import {
  GET_ORDERITEMS_LOADING,
  GET_ORDERITEMS_SUCCESS,
  GET_ORDERITEMS_FAIL,
  ADD_ORDERITEM_LOADING,
  ADD_ORDERITEM_SUCCESS,
  ADD_ORDERITEM_FAIL,
  EDIT_ORDERITEM_LOADING,
  EDIT_ORDERITEM_SUCCESS,
  EDIT_ORDERITEM_FAIL,
  DELETE_ORDERITEM_LOADING,
  DELETE_ORDERITEM_SUCCESS,
  DELETE_ORDERITEM_FAIL,
} from '../../constants/actionTypes';

const orderItemsReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_ORDERITEMS_LOADING:
      return {
        ...state,
        getOrderItems: {
          ...state.getOrderItems,
          loading: true,
        },
      };
    case GET_ORDERITEMS_SUCCESS:
      return {
        ...state,
        getOrderItems: {
          ...state.getOrderItems,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case GET_ORDERITEMS_FAIL:
      return {
        ...state,
        getOrderItems: {
          ...state.getOrderItems,
          loading: false,
          error: payload,
        },
      };

    case ADD_ORDERITEM_LOADING:
      return {
        ...state,
        addOrderItem: {
          ...state.addOrderItems,
          loading: true,
        },
      };
    case ADD_ORDERITEM_SUCCESS:
      return {
        ...state,
        addOrderItem: {
          ...state.addOrderItems,
          loading: false,
          data: payload,
          error: null,
        },

        getOrderItems: {
          ...state.getOrderItems,
          loading: false,
          data: [...state.getOrderItems.data, payload.newOrderDetails],
          error: null,
        },
      };
    case ADD_ORDERITEM_FAIL:
      return {
        ...state,
        addOrderItem: {
          ...state.addOrderItems,
          loading: false,
          error: payload,
        },
      };

    case DELETE_ORDERITEM_LOADING:
      console.log('in reducers delete order item. now dispatching loading. ');
      return {
        ...state,
        deleteOrderItem: {
          ...state.deleteOrderItems,
          loading: true,
        },
      };
    case DELETE_ORDERITEM_SUCCESS:
      console.log(
        'in reducers delete order item. now dispatching success. order item id:>> ',
        payload,
      );
      return {
        ...state,
        deleteOrderItem: {
          ...state.deleteOrderItems,
          loading: false,
          // data: payload,
          error: null,
        },

        getOrderItems: {
          ...state.getOrderItems,
          loading: false,
          error: null,
          data: state.getOrderItems.data.filter(
            x => x.order_item_id !== payload.orderItemId,
          ),
        },
      };
    case DELETE_ORDERITEM_FAIL:
      return {
        ...state,
        deleteOrderItem: {
          ...state.deleteOrderItems,
          loading: false,
          error: payload,
        },
      };
  }
};

export default orderItemsReducer;
