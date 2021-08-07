import {
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  ADD_ORDER_LOADING,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  SEND_ORDER_LOADING,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAIL,
  DELETE_ORDER_LOADING,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  PAY_ORDER_FAIL,
  PAY_ORDER_LOADING,
  PAY_ORDER_SUCCESS,
} from '../../constants/actionTypes';

const ordersReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_ORDERS_LOADING:
      return {
        ...state,
        getOrders: {
          ...state.getOrders,
          loading: true,
        },
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        getOrders: {
          ...state.getOrders,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        getOrders: {
          ...state.getOrders,
          loading: false,
          error: payload,
        },
      };

    case ADD_ORDER_LOADING:
      return {
        ...state,
        addOrder: {
          ...state.addOrder,
          loading: true,
        },
      };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        addOrder: {
          ...state.addOrder,
          loading: false,
          data: payload,
          error: null,
        },

        getOrders: {
          ...state.getOrders,
          loading: false,
          error: null,
          data: [...state.getOrders.data, payload],
        },
      };
    case ADD_ORDER_FAIL:
      return {
        ...state,
        addOrder: {
          ...state.addOrder,
          loading: false,
          error: payload,
        },
      };
    case DELETE_ORDER_LOADING:
      return {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          loading: true,
        },
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          loading: false,
          // data: payload,
          error: null,
        },

        getOrders: {
          ...state.getOrders,
          loading: false,
          error: null,
          data: state.getOrders.data.filter(
            x => x.order_id !== payload.orderId,
          ),
        },
      };
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        deleteOrder: {
          ...state.deleteOrder,
          loading: false,
          error: payload,
        },
      };

    case SEND_ORDER_LOADING:
      return {
        ...state,
        sendOrder: {
          ...state.sendOrder,
          loading: true,
        },
      };
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        sendOrder: {
          ...state.sendOrder,
          loading: false,
          error: null,
        },
        // getOrders: {
        // ...state.getOrders,
        // loading: false,
        // data: [
        // ...state.getOrders.data.filter(x => x.order_id !== payload.orderId),
        // payload,
        // ],
        // },
      };
    case SEND_ORDER_FAIL:
      return {
        ...state,
        sendOrder: {
          ...state.sendOrder,
          loading: false,
          error: payload,
        },
      };
    case PAY_ORDER_LOADING:
      return {
        ...state,
        payOrder: {
          ...state.payOrder,
          loading: true,
        },
      };
    case PAY_ORDER_SUCCESS:
      return {
        ...state,
        payOrder: {
          ...state.payOrder,
          loading: false,
          error: null,
        },
      };
    case PAY_ORDER_FAIL:
      return {
        ...state,
        payOrder: {
          ...state.payOrder,
          loading: false,
          error: payload,
        },
      };
  }
};

export default ordersReducer;
