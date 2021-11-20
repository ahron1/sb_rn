export default {
  numberChecked: false,
  confirmationMethod: null,
  numberAuthenticated: false,
  credUpdated: false,

  mobileNumber: null,
  firebaseUid: null,
  fcmToken: null,

  userName: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  pincode: null,
  latitude: null,
  longitude: null,

  loyalty_code: {
    code: null,
    error: null,
    loading: false,
  },
  phoneNumberSignInSubmit: {
    error: null,
    loading: false,
  },
  phoneNumberOtpSubmit: {
    error: null,
    loading: false,
  },
  logOut: {
    error: null,
    loading: false,
  },
  credUpdate: {
    error: null,
    loading: false,
  },
  userNameUpdate: {
    error: null,
    loading: false,
  },
  userAddressUpdate: {
    error: null,
    loading: false,
  },
  getUserDetails: {
    error: null,
    loading: false,
  },
};
