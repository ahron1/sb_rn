// import {DEV_BACKEND_URL, PROD_BACKEND_URL} from '@env';

const DEV_BACKEND_URL = 'http://192.168.122.242';
const PROD_BACKEND_URL = 'http://192.168.122.242';

const devEnvironmentVariables = {
  DEV_BACKEND_URL,
};
const prodEnvironmentVariables = {
  PROD_BACKEND_URL,
};

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;
