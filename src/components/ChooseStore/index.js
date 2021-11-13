import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  Pressable,
  View,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
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
import addOrder from '../../context/actions/addOrder';

const ChooseStoreComponent = ({storesData }) => {
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

    return (
      <View>
        <Pressable
          onPress={() =>
            addOrder()(ordersDispatch)(orderId => {
              navigate(ORDERITEMS, {orderId});
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
                  "Hello Storebhai team, I want to refer my favorite local store to you and earn rewards. I am sharing the store's name and number \n\n" +
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
                      "Hello Storebhai team, I want to refer my favorite local store to you and earn rewards. I am sharing the store's name and number \n\n" +
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

      viewStoreComponent = (
        <>
          <View style={styles.dashboard}>
            <View style={styles.dashboardItem}>
              <View>
                <Text style={styles.dashboardItemTitleFreeFlow}>
                  {'There are  '}
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
            selectedStoreDetails={selectedStoreDetails}
            // storeId={storeId}
          />
        </>
      );
      

  return viewStoreComponent;
};

export default ChooseStoreComponent;
