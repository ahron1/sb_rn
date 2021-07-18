const addressLog = addressComponent => {
  console.log(
    'address :.>> ',
    '\n',
    '0 - ',
    // addressComponent[0] !== undefined ? addressComponent[0].long_name : '',
    addressComponent[0] !== undefined ? addressComponent[0] : '',
    '\n',
    ' ',
    '1 - ',
    addressComponent[1] !== undefined ? addressComponent[1] : '',
    // addressComponent[1] !== undefined ? addressComponent[1].long_name : '',
    '\n',
    ' ',
    '2 - ',
    addressComponent[2] !== undefined ? addressComponent[2] : '',
    // addressComponent[2] !== undefined ? addressComponent[2].long_name : '',
    '\n',
    ' ',
    '3 - ',
    addressComponent[3] !== undefined ? addressComponent[3] : '',
    // addressComponent[3] !== undefined ? addressComponent[3].long_name : '',
    '\n',
    ' ',
    '4 - ',
    addressComponent[4] !== undefined ? addressComponent[4] : '',
    // addressComponent[4] !== undefined ? addressComponent[4].long_name : '',
    '\n',
    ' ',
    '5 - ',
    addressComponent[5] !== undefined ? addressComponent[5] : '',
    // addressComponent[5] !== undefined ? addressComponent[5].long_name : '',
    '\n',
    ' ',
    '6 - ',
    addressComponent[6] !== undefined ? addressComponent[6] : '',
    // addressComponent[6] !== undefined ? addressComponent[6].long_name : '',
    '\n',
    ' ',
    '7 - ',
    addressComponent[6] !== undefined ? addressComponent[6] : '',
    // addressComponent[6] !== undefined ? addressComponent[6].long_name : '',
    '\n',
    ' ',
    '8 - ',
    addressComponent[7] !== undefined ? addressComponent[7] : '',
    // addressComponent[7] !== undefined ? addressComponent[7].long_name : '',
    '\n',
    ' ',
    '9 - ',
    addressComponent[8] !== undefined ? addressComponent[8] : '',
    // addressComponent[8] !== undefined ? addressComponent[8].long_name : '',
    '\n',
    '10 - ',
    addressComponent[9] !== undefined ? addressComponent[9] : '',
    // addressComponent[8] !== undefined ? addressComponent[8].long_name : '',
    '\n',
    '11 - ',
    addressComponent[10] !== undefined ? addressComponent[10] : '',
    // addressComponent[8] !== undefined ? addressComponent[8].long_name : '',
    '\n',
    '12 - ',
    addressComponent[11] !== undefined ? addressComponent[11] : '',
    // addressComponent[8] !== undefined ? addressComponent[8].long_name : '',
    '\n',
  );
};

const getGeoAddressLine2 = (geoRoute, geoSubLocalityL1, geoSubLocalityL2) => {
  const addressLine2 =
    geoRoute && geoSubLocalityL1 && geoSubLocalityL2
      ? geoRoute + '\n' + geoSubLocalityL1 + '\n' + geoSubLocalityL2
      : geoRoute && geoSubLocalityL1 && !geoSubLocalityL2
      ? geoRoute + '\n' + geoSubLocalityL1
      : geoRoute && !geoSubLocalityL1 && geoSubLocalityL2
      ? geoRoute + '\n' + geoSubLocalityL2
      : geoRoute && !geoSubLocalityL1 && !geoSubLocalityL2
      ? geoRoute
      : !geoRoute && geoSubLocalityL1 && geoSubLocalityL2
      ? geoSubLocalityL1 + '\n' + geoSubLocalityL2
      : !geoRoute && !geoSubLocalityL1 && geoSubLocalityL2
      ? geoSubLocalityL2
      : !geoRoute && geoSubLocalityL1 && !geoSubLocalityL2
      ? geoSubLocalityL1
      : '';
  return addressLine2;
};

const setGeoAddressHelper = ({addressComponent, setGeoAddressWrapper}) => {
  // console.log('in geo helpers, address component is:>> ', addressComponent);
  const geoPincodeExists = addressComponent.some(
    x => x.types[0] === 'postal_code',
  );
  if (geoPincodeExists) {
    const geoPincode = addressComponent.find(
      x => x.types[0] === 'postal_code',
    ).long_name;
    // console.log('geo pincode is :>> ', geoPincode);
    setGeoAddressWrapper('geoPincode', geoPincode);
  }

  const geoCityExists = addressComponent.some(x => x.types[0] === 'locality');
  if (geoCityExists) {
    const geoCity = addressComponent.find(
      x => x.types[0] === 'locality',
    ).long_name;
    // console.log('geo city is :>> ', geoCity);
    setGeoAddressWrapper('geoCity', geoCity);
  }

  const geoStateExists = addressComponent.some(
    x => x.types[0] === 'administrative_area_level_1',
  );
  if (geoStateExists) {
    const geoState = addressComponent.find(
      x => x.types[0] === 'administrative_area_level_1',
    ).long_name;
    // console.log('geo state is :>> ', geoState);
    setGeoAddressWrapper('geoState', geoState);
  }

  const geoSubLocalityL1Exists = addressComponent.some(
    x => x.types[2] === 'sublocality_level_1',
  );
  if (geoSubLocalityL1Exists) {
    const geoSubLocalityL1 = addressComponent.find(
      x => x.types[2] === 'sublocality_level_1',
    ).long_name;
    // console.log('geo sub locality 1 is :>> ', geoSubLocalityL1Exists);
    setGeoAddressWrapper('geoSubLocalityL1', geoSubLocalityL1);
  }

  const geoSubLocalityL2Exists = addressComponent.some(
    x => x.types[2] === 'sublocality_level_2',
  );
  if (geoSubLocalityL2Exists) {
    const geoSubLocalityL2 = addressComponent.find(
      x => x.types[2] === 'sublocality_level_2',
    ).long_name;
    // console.log('geo sublocality 2 is :>> ', geoSubLocalityL2Exists);
    setGeoAddressWrapper('geoSubLocalityL2', geoSubLocalityL2);
  }

  const geoRouteExists = addressComponent.some(x => x.types[0] === 'route');
  if (geoRouteExists) {
    const geoRoute = addressComponent.find(
      x => x.types[0] === 'route',
    ).long_name;
    // console.log('geo route is :>> ', geoRoute || '');
    setGeoAddressWrapper('geoRoute', geoRoute);
  }
};

export default addressLog;
export {getGeoAddressLine2, setGeoAddressHelper};
