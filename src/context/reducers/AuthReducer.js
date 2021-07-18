import {Alert} from 'react-native';
import {
  CRED_UPDATE_FAIL,
  CRED_UPDATE_LOADING,
  CRED_UPDATE_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  PHONENUMBER_OTP_SUBMIT_FAIL,
  PHONENUMBER_OTP_SUBMIT_LOADING,
  PHONENUMBER_OTP_SUBMIT_SUCCESS,
  PHONENUMBER_SIGNIN_SUBMIT_FAIL,
  PHONENUMBER_SIGNIN_SUBMIT_LOADING,
  PHONENUMBER_SIGNIN_SUBMIT_SUCCESS,
  USER_NAME_UPDATE_FAIL,
  USER_NAME_UPDATE_LOADING,
  USER_NAME_UPDATE_SUCCESS,
  USER_ADDRESS_UPDATE_FAIL,
  USER_ADDRESS_UPDATE_LOADING,
  USER_ADDRESS_UPDATE_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_LOADING,
  GET_USER_DETAILS_SUCCESS,
} from '../../constants/actionTypes';

const authReducer = (state, {type, payload}) => {
  switch (type) {
    case PHONENUMBER_SIGNIN_SUBMIT_LOADING:
      return {
        ...state,
        phoneNumberSignInSubmit: {
          ...state.phoneNumberSignInSubmit,
          loading: true,
        },
      };
    case PHONENUMBER_SIGNIN_SUBMIT_SUCCESS:
      return {
        ...state,
        numberChecked: true,
        confirmationMethod: payload,
        phoneNumberSignInSubmit: {
          ...state.phoneNumberSignInSubmit,
          loading: false,
          error: null,
        },
      };
    case PHONENUMBER_SIGNIN_SUBMIT_FAIL:
      Alert.alert(
        'Wrong number',
        'There is a problem with the number you entered. Please check.',
      );
      return {
        ...state,
        phoneNumberSignInSubmit: {
          ...state.phoneNumberSignInSubmit,
          loading: false,
          error: payload,
        },
      };

    case PHONENUMBER_OTP_SUBMIT_LOADING:
      return {
        ...state,
        phoneNumberOtpSubmit: {
          ...state.phoneNumberOtpSubmit,
          loading: true,
        },
      };
    case PHONENUMBER_OTP_SUBMIT_SUCCESS:
      return {
        ...state,
        numberChecked: false,
        numberAuthenticated: true,
        confirmationMethod: null,
        phoneNumberOtpSubmit: {
          ...state.phoneNumberOtpSubmit,
          loading: false,
          error: null,
        },
      };
    case PHONENUMBER_OTP_SUBMIT_FAIL:
      Alert.alert(
        'Code error',
        'That code is not right, please enter the correct code',
      );
      return {
        ...state,
        phoneNumberOtpSubmit: {
          ...state.phoneNumberOtpSubmit,
          loading: false,
          error: payload ? payload : 'There was an error',
        },
      };

    case LOGOUT_LOADING:
      return {
        ...state,
        logOut: {
          ...state.logOut,
          loading: true,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        mobileNumber: null,
        firebaseUid: null,
        fcmToken: null,
        numberChecked: false,
        confirmationMethod: null,
        numberAuthenticated: false,
        credUpdated: false,
        userName: null,
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: null,
        pincode: null,
        latitude: null,
        longitude: null,

        logOut: {
          ...state.logOut,
          loading: false,
          error: null,
        },
        getOrders: {
          data: [],
        },
        getOrderItems: {
          data: [],
        },
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        logOut: {
          ...state.logOut,
          loading: false,
          error: payload ? payload : 'There was an error',
        },
      };

    case CRED_UPDATE_LOADING:
      return {
        ...state,
        credUpdate: {
          ...state.credUpdate,
          loading: true,
        },
      };
    case CRED_UPDATE_SUCCESS:
      // console.log(
      // 'auth reducer: cred update success - number, uid, fcmtoken are:>> ',
      // payload.number,
      // payload.uid,
      // payload.token,
      // );
      return {
        ...state,
        credUpdated: true,
        numberAuthenticated: true,
        // ^ already set in OTP_SUCCESS but needs to be redone here
        //for corner case: backend server was down after OTP_SUCCESS.

        mobileNumber: payload.number,
        firebaseUid: payload.uid,
        fcmToken: payload.token,

        credUpdate: {
          ...state.credUpdate,
          loading: false,
          error: null,
        },
      };
    case CRED_UPDATE_FAIL:
      return {
        ...state,
        numberChecked: false,
        numberAuthenticated: false,

        credUpdate: {
          ...state.credUpdate,
          loading: false,
          error: payload
            ? payload
            : 'There was an error updating your credentials on the server',
        },
      };
    case USER_NAME_UPDATE_LOADING:
      return {
        ...state,
        userNameUpdate: {
          ...state.userNameUpdate,
          loading: true,
        },
      };
    case USER_NAME_UPDATE_SUCCESS:
      // console.log('auth reducer: user update success - ');
      return {
        ...state,
        userName: payload,

        userNameUpdate: {
          ...state.userNameUpdate,
          loading: false,
          error: null,
          // data: payload,
        },
      };
    case USER_NAME_UPDATE_FAIL:
      return {
        ...state,
        userNameUpdate: {
          ...state.userNameUpdate,
          loading: false,
          error: payload
            ? payload
            : 'There was an error updating your name on the server',
        },
      };

    case USER_ADDRESS_UPDATE_LOADING:
      return {
        ...state,
        userAddressUpdate: {
          ...state.userAddressUpdate,
          loading: true,
        },
      };
    case USER_ADDRESS_UPDATE_SUCCESS:
      // console.log(
      // 'auth reducer: user update success - payload is :>>  ',
      // payload,
      // );
      // console.log(
      // 'auth reducer: user update success - line1 in payload is :>>  ',
      // payload.addressLine1,
      // );

      return {
        ...state,
        // userAddress: payload,
        addressLine1: payload.userAddress.addressLine1,
        addressLine2: payload.userAddress.addressLine2,
        city: payload.userAddress.city,
        state: payload.userAddress.state,
        pincode: payload.userAddress.pincode,
        latitude: payload.userCoordinates.latitude,
        longitude: payload.userCoordinates.longitude,

        userAddressUpdate: {
          ...state.userAddressUpdate,
          loading: false,
          error: null,
          // data: payload,
        },
      };
    case USER_ADDRESS_UPDATE_FAIL:
      return {
        ...state,
        userAddressUpdate: {
          ...state.userAddressUpdate,
          loading: false,
          error: payload
            ? payload
            : 'There was an error updating your address on the server',
        },
      };

    case GET_USER_DETAILS_LOADING:
      return {
        ...state,
        getUserDetails: {
          ...state.getUserDetails,
          loading: true,
        },
      };
    case GET_USER_DETAILS_SUCCESS:
      // console.log('auth reducer:got user detail success - ', payload);
      return {
        ...state,
        userName: payload.username,
        addressLine1: payload.address_line1,
        addressLine2: payload.address_line2,
        city: payload.city,
        state: payload.state,
        pincode: payload.pincode,
        latitude: payload.latitude,
        longitude: payload.longitude,

        getUserDetails: {
          ...state.getUserDetails,
          loading: false,
          error: null,
        },
      };
    case GET_USER_DETAILS_FAIL:
      return {
        ...state,
        getUserDetails: {
          ...state.getUserDetails,
          loading: false,
          error: payload
            ? payload
            : 'There was an error updating your name on the server',
        },
      };
  }
};

export default authReducer;
