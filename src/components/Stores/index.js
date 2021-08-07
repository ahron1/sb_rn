import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Pressable,
  View,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import sendOrder from '../../context/actions/sendOrder';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../components/common/Icon';
import {GlobalContext} from '../../context/Provider';
import {
  ALLORDERS,
  ORDERITEMS,
  PROFILE,
  REWARDS,
} from '../../constants/routeNames';
import OrderSend from '../OrderSend';
import styles from './styles';
import FloatingCenterButton from '../common/FloatingCenterButton';
import colors from '../../assets/theme/colors';
import CustomButtonSmall from '../common/CustomButtonSmall';
import ListItemSeparatorComponent from '../common/ListItemSeparator';
import ListItemSeparatorComponentThick from '../common/ListItemSeparatorThick';
import {yupToFormErrors} from 'formik';
import LoadingView from '../LoadingView';
import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';

const StoresComponent = ({storesLoading, storesData, orderId}) => {
  const [modalVisibleOrderFinal, setModalVisibleOrderFinal] = useState(false);
  const [selectedStoreDetails, setSelectedStoreDetails] = useState({});
  const {navigate} = useNavigation();
  const {authState} = useContext(GlobalContext);
  const {ordersDispatch, ordersState} = useContext(GlobalContext);
  let viewStoreComponent;

  const renderItem = ({item}) => {
    const {
      store_id: storeId,
      name: storeName,
      offers_delivery: offersDelivery,
      offers_pickup: offersPickup,
      address_line1: addressLine1,
      address_line2: addressLine2,
      pincode: pincode,
      city: city,
      state: state,
      mobile_number: storePhoneNumber,
    } = item;

    // console.log('in store component, item is: ', item);

    return (
      <View>
        <Pressable
          onPress={() =>
            storeSelect({
              storeId,
              storeName,
              offersDelivery,
              offersPickup,
              storePhoneNumber,
            })
          }>
          <View style={[styles.listRow, styles.headerRow]}>
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemContentBold]}> {storeName}</Text>
            </View>
          </View>

          <View style={styles.listRow}>
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitleLong]}>Services: </Text>
              <Text style={[styles.rowItemContentRegular]}>
                Delivery{' '}
                {offersDelivery ? (
                  <Icon
                    type="fontAwesome"
                    name="check"
                    style={styles.checkMark}
                  />
                ) : (
                  <Icon
                    type="fontAwesome"
                    name="remove"
                    style={styles.crossMark}
                  />
                )}
              </Text>
              <Text style={[styles.rowItemContent]}>
                Pickup{' '}
                {offersPickup ? (
                  <Icon
                    type="fontAwesome"
                    name="check"
                    style={styles.checkMark}
                  />
                ) : (
                  <Icon
                    type="fontAwesome"
                    name="remove"
                    style={styles.crossMark}
                  />
                )}
              </Text>
            </View>
          </View>
          <View style={styles.listRow}>
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitle]}>Address: </Text>
              <Text style={[styles.rowItemContent]}>
                {addressLine1}
                {', '}
                {addressLine2}
                {', '}
                {city}
                {', '}
                {pincode}
                {', '}
                {state}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View style={styles.emptyListView}>
        <Text style={styles.emptyListText}>
          Recommend your favorite local store to us and earn rewards!{' '}
        </Text>
        <View style={styles.buttonWithText}>
          {/* <Text style={styles.emptyListText}>Earn rewards: </Text> */}
          <CustomButtonSmall
            style={[styles.button, {backgroundColor: colors.color1_4}]}
            primary
            title="Refer new store"
            onPress={() => {
              Linking.openURL(
                'whatsapp://send?text=' +
                  "Hello, I want to refer my favorite local store to you and earn rewards. I am sharing the store's name and number \n\n" +
                  '&phone=91' +
                  '8883672999',
              );
            }}
          />
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <>
        <View>
          <View style={styles.emptyListView}>
            <Text style={styles.emptyListText}>
              Sorry! There are currently no stores servicing your area.
            </Text>
            <Text style={styles.emptyListText}>
              Please check back soon as we are adding new stores. Contact us to
              know more.
            </Text>
            <View style={styles.buttonWithText}>
              <Text style={styles.emptyListText}>Get in touch: </Text>
              <CustomButtonSmall
                style={[styles.button, {backgroundColor: colors.color4_2}]}
                primary
                title="Contact us"
                onPress={() => {
                  Linking.openURL(
                    'whatsapp://send?text=' +
                      "Hello, I want to refer my favorite local store to you and earn rewards. I am sharing the store's name and number \n\n" +
                      '&phone=91' +
                      '8883672999',
                  );
                }}
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  const storeSelect = ({
    storeId,
    storeName,
    offersDelivery,
    offersPickup,
    storePhoneNumber,
  }) => {
    if (orderId) {
      // console.log('store ', storeName, 'selected for order.', orderId);
      setSelectedStoreDetails({
        storeId: storeId,
        storeName: storeName,
        offersDelivery: offersDelivery,
        offersPickup: offersPickup,
        storePhoneNumber: storePhoneNumber,
      });

      setModalVisibleOrderFinal(true);
    } else {
      // console.log('store details show.', storeName);

      Alert.alert(
        storeName,
        storeName + ' is happy to serve you.\n\nPlace an order or contact us.',

        [
          {
            text: 'Cancel',
            // onPress: () => Linking.openURL(`tel:${storePhoneNumber}`),
          },
          {
            text: 'WhatsApp',
            onPress: () =>
              Linking.openURL(
                'whatsapp://send?text=' +
                  'Hello, I want to check about my order status.. \n\n' +
                  '&phone=91' +
                  `${storePhoneNumber}`,
              ),
          },
          {
            text: 'Order',
            onPress: () => navigate(ALLORDERS),
          },
        ],
        {cancelable: true},
      );
    }
  };

  if (authState.latitude && authState.longitude) {
    if (storesLoading) {
      viewStoreComponent = <LoadingView />;
    } else if (!storesLoading) {
      viewStoreComponent = (
        <>
          <View style={styles.dashboard}>
            <View style={styles.dashboardItem}>
              <View>
                <Text style={styles.dashboardItemTitleFreeFlow}>
                  {orderId ? 'Choose from  ' : 'There are  '}
                </Text>
              </View>
              <View>
                <Text style={[styles.dashboardItemContent]}>
                  {storesData.length}
                </Text>
              </View>
              <View>
                <Text style={styles.dashboardItemTitleFreeFlow}>
                  {'  '}
                  stores in your area.
                </Text>
              </View>
            </View>
          </View>

          <FlatList
            data={storesData}
            renderItem={renderItem}
            keyExtractor={item => String(item.store_id)}
            ItemSeparatorComponent={ListItemSeparatorComponentThick}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={ListFooterComponent}
          />

          <OrderSend
            modalVisibleOrderFinal={modalVisibleOrderFinal}
            setModalVisibleOrderFinal={setModalVisibleOrderFinal}
            orderId={orderId}
            selectedStoreDetails={selectedStoreDetails}
            // storeId={storeId}
          />
        </>
      );
    }
  } else {
    // console.log('in stores component. address not yet updated .');
    viewStoreComponent = (
      <View style={styles.emptyContainer}>
        <View styles={styles.emptyTextIndicator}>
          <Text style={styles.emptyText}>
            Please first update your address on the profile page.
          </Text>
        </View>
        <View style={styles.buttonSection}>
          <CustomButtonMedium
            style={styles.button}
            backgroundColor={colors.color1_4}
            primary
            title="OK"
            onPress={() => {
              navigate(PROFILE);
            }}
          />
        </View>
      </View>
    );
  }

  return viewStoreComponent;
};

export default StoresComponent;
