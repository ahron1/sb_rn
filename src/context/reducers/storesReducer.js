import {
  GET_STORES_LOADING,
  GET_STORES_FAIL,
  GET_STORES_SUCCESS,
  GET_DEFAULT_STORE_LOADING,
  GET_DEFAULT_STORE_FAIL,
  GET_DEFAULT_STORE_SUCCESS,
} from '../../constants/actionTypes';

const storesReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_STORES_LOADING:
      return {
        ...state,
        getStores: {
          ...state.getStores,
          loading: true,
        },
      };
    case GET_STORES_SUCCESS:
      return {
        ...state,
        getStores: {
          ...state.getStores,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case GET_STORES_FAIL:
      return {
        ...state,
        getStores: {
          ...state.getStores,
          loading: false,
          error: payload,
        },
      };
    case GET_DEFAULT_STORE_LOADING:
      return {
        ...state,
        getDefaultStore: {
          ...state.getDefaultStore,
          loading: true,
        },
      };
    case GET_DEFAULT_STORE_SUCCESS:
      return {
        ...state,
        getDefaultStore: {
          ...state.getDefaultStore,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case GET_DEFAULT_STORE_FAIL:
      return {
        ...state,
        getDefaultStore: {
          ...state.getDefaultStore,
          loading: false,
          error: payload,
        },
      };
  }
};

export default storesReducer;
