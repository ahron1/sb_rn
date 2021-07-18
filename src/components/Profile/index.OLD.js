import {loadOptions} from '@babel/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {Button, Text, View} from 'react-native';
import RNLocation from 'react-native-location';
// import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import LocationEnabler from 'react-native-location-enabler';
import addressLog from '../../utils/addressLog';
import credUpdate from '../../context/actionCreators/auth/credUpdate';
import { GlobalContext } from '../../context/Provider';

Geocoder.init('AIzaSyBw1Ua3oGDMs8WwJyNXLRkpsJSq6Vup0bo'); // use a valid API key

RNLocation.configure({
  distanceFilter: 0, // set to 2 later.
  desiredAccuracy: {
    android: 'highAccuracy',
  },
  androidProvider: 'standard',
  // interval: 100,
  // maxWaitTime: 100,
});

const ProfileComponent = () => {
  const {authDispatch, authState} = useContext(GlobalContext);
  const [currentAddress, setCurrentAddress] = useState({});
  const [storedAddress, setStoredAddress] = useState({});
  const [wasStoredAddressUpdated, setWasStoredAddressUpdated] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const [storedLocation, setStoredLocation] = useState({});
  const [isLocationDifferent, setIsLocationDifferent] = useState(false);
  const [wasStoredLocationUpdated, setWasStoredLocationUpdated] =
    useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@userLocation').then(value => {
      setStoredLocation(JSON.parse(value));
    });
    console.log('in profile component use effect');
    AsyncStorage.getItem('@userAddress').then(value => {
      setStoredAddress(JSON.parse(value));
      console.log(
        'in profile component. stored address is: >> ',
        JSON.stringify(JSON.parse(value)),
      );
    });
    credUpdate()(authDispatch);
  }, []);

  useEffect(() => {
    if (JSON.stringify(currentLocation) !== '{}') {
      if (
        currentLocation.latitude === storedLocation?.latitude &&
        currentLocation.longitude === storedLocation?.longitude
      ) {
        setIsLocationDifferent(false);
      } else {
        setIsLocationDifferent(true);
      }
    }
  }, [currentLocation, currentAddress]);

  const storeCurrentLocation = async () => {
    await AsyncStorage.setItem(
      '@userLocation',
      JSON.stringify(currentLocation),
    );
    setStoredLocation(currentLocation);
    setWasStoredLocationUpdated(true);
  };
  const storeCurrentAddress = async () => {
    await AsyncStorage.setItem('@userAddress', JSON.stringify(currentAddress));
    setStoredLocation(currentAddress);
    setWasStoredAddressUpdated(true);
  };

  const getAddressFromCoordinates = async ({lat, lng}) => {
    Geocoder.from(lat, lng)
      .then(json => {
        var addressComponent = json.results[0].address_components;
        console.log('coordinates are: lat: ', lat, ' lng: ', lng);
        addressLog(addressComponent);
        // console.log('results: >> ', JSON.stringify(json.results));
      })
      .catch(error => console.log(error));
  };

  const getAndSetLocation = async () => {
    let userLocation;
    userLocation = await RNLocation.getLatestLocation({timeout: 30000});
    if (userLocation) {
      setCurrentLocation(JSON.parse(JSON.stringify(userLocation)));
      console.log('current location is ', userLocation);
      // var lat = JSON.parse(JSON.stringify(userLocation)).latitude;
      // var long = JSON.parse(JSON.stringify(userLocation)).longitude;

      var addressString = '3A Rustombagh main road s r layout bangalore 560017';
      // var addressString = 'Rijksmuseum, Amsterdam, The Netherlands';
      Geocoder.from(addressString)
        .then(json => {
          var location = json.results[0].geometry.location;
          console.log(
            'coordinates of address, ',
            addressString,
            ' are: ',
            location,
          );
          // console.log(
          // 'result of geocoding for address is:>> ',
          // JSON.stringify(json),
          // );
          getAddressFromCoordinates(location);
        })
        .catch(error => console.warn(error));
    } else {
      console.log('could not get location. ');
    }
  };

  const {
    PRIORITIES: {HIGH_ACCURACY},
    useLocationSettings,
  } = LocationEnabler;

  const [locationEnabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */,
  );

  const locationHandler = async () => {
    if (!locationEnabled) {
      requestResolution();
    } else {
      let permission = await RNLocation.checkPermission({
        ios: 'always',
        android: {
          detail: 'fine',
        },
      });
      if (!permission) {
        console.log('asking for permission ');
        permission = await RNLocation.requestPermission({
          ios: 'always',
          android: {
            detail: 'fine',
            rationale: {
              title: 'We need to access your location',
              message:
                'Your location is needed to check for stores in your area',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          },
        });
        console.log('just got permission ', permission);
        getAndSetLocation();
      } else {
        console.log('permission already ok', permission);
        getAndSetLocation();
      }
    }
  };

  return (
    <View>
      {storedLocation ? (
        <>
          <View>
            <Text>Your saved location is:</Text>
            <Text>Latitude: {storedLocation?.latitude} </Text>
            <Text>Longitude: {storedLocation?.longitude} </Text>
          </View>
        </>
      ) : (
        <View>
          <Text>You have no saved locations. Please add a location</Text>
        </View>
      )}

      {!wasStoredLocationUpdated && (
        <>
          <View>
            <Text>Do you want to update your location? </Text>
            <Button title="Get current location" onPress={locationHandler} />

            <View>
              {JSON.stringify(currentLocation) !== '{}' && (
                <>
                  <Text>Your current location is</Text>
                  <Text>Latitude: {currentLocation.latitude} </Text>
                  <Text>Longitude: {currentLocation.longitude} </Text>
                  <Text>Accuracy: {currentLocation.accuracy} </Text>
                </>
              )}
            </View>
          </View>

          <View>
            {isLocationDifferent
              ? JSON.stringify(currentLocation) !== '{}' && (
                  <>
                    <Text> old and new are different </Text>
                    <Button
                      title="Save new location"
                      onPress={storeCurrentLocation}
                    />
                  </>
                )
              : JSON.stringify(currentLocation) !== '{}' && (
                  <>
                    <Text> old and new are same</Text>
                  </>
                )}
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileComponent;
