import React, {useContext} from 'react';
import {useState, useEffect} from 'react';
import {Alert, FlatList, Linking, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ViewItem from '../ViewItem';
import AddItemGrocery from '../AddItemModal/Grocery';
import MakePayment from '../MakePayment';
import FloatingLeftButton from '../common/FloatingLeftButton';
import FloatingRightButton from '../common/FloatingRightButton';
import FloatingCenterButton from '../common/FloatingCenterButton';
import ListFooterComponent from '../common/ListFooter';
import styles from './styles';
import colors from '../../assets/theme/colors';
import Icon from '../../components/common/Icon';
import ListItemSeparatorComponent from '../common/ListItemSeparator';
import {ALLORDERS, ORDERSTATUS} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import deleteOrder from '../../context/actions/deleteOrder';
import getOrderStatus from '../../helpers/orderStatus';
import LoadingView from '../LoadingView';
import getDateTime from '../../helpers/dateTimeString';
import CustomButtonSmall from '../common/CustomButtonSmall';
import OrderSend from '../OrderSend';

// const OrderItemsComponent = ({orderStatusDetails, dataOrderItems}) => {
const OrderItemsComponent = ({
  orderId,
  chosenStoreDetails,
  dataOrderItems,
  loadingGetOrderItems,
}) => {
  const {ordersDispatch, ordersState} = useContext(GlobalContext);
  const [currentItem, setCurrentItem] = useState({});
  const [modalVisibleViewItem, setModalVisibleViewItem] = useState(false);
  const [modalVisibleAddItem, setModalVisibleAddItem] = useState(false);
  const [modalVisibleMakePayment, setModalVisibleMakePayment] = useState(false);
  const [modalVisibleOrderFinal, setModalVisibleOrderFinal] = useState(false);
  const [selectedStoreDetails, setSelectedStoreDetails] = useState({});
  const {navigate} = useNavigation();

  const {
    store_id: chosenStoreId,
    store_name: chosenStoreName,
    offers_delivery: chosenOffersDelivery,
    offers_pickup: chosenOffersPickup,
    mobile_number: chosenStorePhoneNumber,
  } = chosenStoreDetails ? chosenStoreDetails : {};

  console.log(
    'in order items component. chosen store details is ',
    chosenStoreDetails,
  );
  console.log('in order items component. order id is ', orderId);

  const [order] = ordersState.getOrders.data.filter(
    x => x.order_id === orderId,
  );

  //  console.log(
  //    'in orderitems component. orders state is:>> ',
  //    ordersState.getOrders.data.filter(x => x.order_id === orderId),
  //    order,
  //  );

  const {
    time_100_created,
    time_200_customer_sent,
    is_delivery: isDelivery,
    is_pickup: isPickup,
    store_name: storeName,
    store_number: storeNumber,
    store_id: storeId,
    customer_note: orderComments,
  } = order ? order : {};
  // the conditional assignment is to take care of deletion where the order item details are no longer found after deletion

  const {
    orderStatusText: orderStatusText,
    orderStatusNext: orderStatusNext,
    orderColorCode: orderColorCode,
    orderStatusCode: orderStatusCode,
    orderColorText: orderColorText,
  } = order ? getOrderStatus(order) : {};

  const currentCodeNumber = orderStatusCode
    ? Number(orderStatusCode.substr(7, 3))
    : 100;
  // console.log(
  // 'in order items. order status code is :> ',
  // orderStatusCode,
  // 'number is ',
  // currentCodeNumber,
  // );
  // the conditional assignment is to take care of deletion where the order item details are no longer found after deletion

  let total;
  if (Array.isArray(dataOrderItems) && dataOrderItems.length > 0) {
    let prices = dataOrderItems.map(a => a.price * a.available);
    total = prices.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  }

  // const {orderId, orderPrice, orderDate, orderStatus, orderRatingStars} = order;

  const navigateOrderStatus = () => {
    navigate(ORDERSTATUS, {
      orderStatusCode: orderStatusCode,
      orderColorCode: orderColorCode,
      orderId: orderId,
      storeName: storeName,
      time_200_customer_sent: time_200_customer_sent,
    });
  };

  //todo - move to helper function
  const OrderItemsButtons = () => {
    // console.log(
    // 'in order items component. orderstatuscode is:>> ',
    // orderStatusCode,
    // orderStatusText,
    // );
    var buttons;
    switch (orderStatusCode) {
      case 'status_900_order_complete':
        // console.log('in order items component. buttons func. status 500');
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Earn rewards"
                iconType="entypo"
                iconName="trophy"
                circleColor={colors.color3_3}
                iconColor={colors.color2_4}
                onPress={() => {
                  Linking.openURL(
                    'whatsapp://send?text=' +
                      'Hello Storebhai team, I completed an order on the app.' +
                      ' I want to ask about your rewards program.' +
                      '&phone=91' +
                      '8883672999',
                  );
                }}
              />
            </View>
          </View>
        );
        break;

      case 'status_700_payment_received':
        // console.log('in order items component. buttons func. status 500');
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Earn rewards"
                iconType="entypo"
                iconName="trophy"
                circleColor={colors.color3_3}
                iconColor={colors.color2_4}
                onPress={() => {
                  Linking.openURL(
                    'whatsapp://send?text=' +
                      'Hello Storebhai team, I completed an order on the app.' +
                      ' I want to ask about the rewards program.' +
                      '&phone=91' +
                      '8883672999',
                  );
                }}
              />
            </View>
          </View>
        );
        break;

      case 'status_600_payment_made':
        // console.log('in order items component. buttons func. status 500');
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Check status"
                iconType="ant"
                iconName="questioncircle"
                circleColor={colors.color4_2}
                iconColor={colors.color2_4}
                onPress={() => {
                  // console.log('in order items component. check status pressed');
                  navigateOrderStatus();
                }}
              />
            </View>
          </View>
        );
        break;

      case 'status_500_customer_received':
      case 'status_400_store_fulfilled':
      case 'status_300_store_checked':
        // console.log('in order items component. buttons func. status 500');
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Make payment"
                iconType="fontisto"
                iconName="inr"
                iconColor={colors.color2_3}
                circleColor={colors.color3_4}
                onPress={() => {
                  // console.log('in order items component. payment pressed');
                  setModalVisibleMakePayment(true);
                }}
              />
            </View>
          </View>
        );
        break;

      case 'status_200_customer_sent':
        buttons = (
          <View>
            <View>
              <FloatingLeftButton
                buttonText="Add item"
                iconType="materialCommunity"
                // iconName="cart-arrow-down"
                iconName="cart-plus"
                circleColor={colors.color2_2_4}
                iconColor={colors.color1_3}
                onPress={() => {
                  // console.log('in order items component. + pressed');
                  setModalVisibleAddItem(true);
                }}
              />

              <FloatingRightButton
                buttonText="Status"
                iconType="ant"
                iconName="questioncircle"
                iconColor={colors.color2_4}
                circleColor={colors.color4_2}
                onPress={() => {
                  // console.log(
                  // 'in order items component. check status pressed. order status code is:>> ',
                  // orderStatusCode,
                  // );
                  navigateOrderStatus();
                }}
              />
            </View>
            <View>
              <FloatingRightButton
                buttonText="Status"
                iconType="ant"
                iconName="questioncircle"
                iconColor={colors.color2_4}
                circleColor={colors.color4_2}
                onPress={() => {
                  // console.log(
                  // 'in order items component. check status pressed. order status code is:>> ',
                  // orderStatusCode,
                  // );
                  navigateOrderStatus();
                }}
              />
            </View>
          </View>
        );
        break;

      // IMP - the default case is called on newly created orders.
      // default case is same as for status_100_customer_started
      // .. compare the navigate(ORDERITEMS) func in addOrderPressed with the
      // .. onPress function in the renderItem pressable in AllOrdersComponent
      // todo - this is very hackish. fix it so new orders get the right status.
      default:
        // console.log('in order items component. buttons func. status default');
        if (dataOrderItems.length > 0) {
          buttons = (
            <View>
              <View>
                <FloatingRightButton
                  buttonText="Send order"
                  iconType="fontAwesome"
                  iconName="send"
                  circleColor={colors.color4_3}
                  // iconColor={colors.color1_2}
                  iconColor={colors.color2_4}
                  onPress={() => {
                    // navigate(STORES, {orderId: orderId});

                    setSelectedStoreDetails({
                      storeId: chosenStoreId,
                      storeName: chosenStoreName,
                      offersDelivery: chosenOffersDelivery,
                      offersPickup: chosenOffersPickup,
                      storePhoneNumber: chosenStorePhoneNumber,
                    });

                    setModalVisibleOrderFinal(true);
                  }}
                />
                <FloatingLeftButton
                  buttonText="Add item"
                  iconType="materialCommunity"
                  // iconName="cart-arrow-down"
                  iconName="cart-plus"
                  circleColor={colors.color2_2_4}
                  iconColor={colors.color1_3}
                  onPress={() => {
                    // console.log('in order items component. + pressed');
                    setModalVisibleAddItem(true);
                  }}
                />
              </View>
            </View>
          );
        } else {
          buttons = (
            <View>
              <View>
                <FloatingRightButton
                  buttonText="Delete order"
                  iconType="materialCommunity"
                  // iconName="cart-off"
                  iconName="playlist-remove"
                  circleColor={colors.color3_2}
                  iconColor={colors.color2_3}
                  loading={ordersState.deleteOrder.loading}
                  disabled={ordersState.deleteOrder.loading}
                  onPress={() => {
                    // console.log('in order items component. delete pressed');
                    deleteOrder({orderId})(ordersDispatch)(() => {
                      // console.log('in order items components. deleted order');
                      navigate(ALLORDERS);
                    });
                  }}
                />
                <FloatingLeftButton
                  buttonText="Add item"
                  iconType="materialCommunity"
                  // iconName="cart-arrow-down"
                  iconName="cart-plus"
                  circleColor={colors.color2_2_4}
                  iconColor={colors.color1_3}
                  onPress={() => {
                    // console.log('in order items component. + pressed');
                    setModalVisibleAddItem(true);
                  }}
                />
              </View>
            </View>
          );
        }
    }

    return buttons;
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyListView}>
        <Text style={styles.emptyListText}>This order is empty.</Text>
        <Text style={styles.emptyListText}>
          Touch the "Add item" button to write your order.
        </Text>
        <Text style={styles.emptyListText}>
          After you finish adding items, you can send the order to your local
          store.
        </Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    const message =
      'Namaskar, ' + storeName
        ? storeName
        : '' + '. I want to update about ...';

    return (
      <View>
        <View style={[styles.statusboard, {backgroundColor: orderColorCode}]}>
          <View style={styles.dashboardItem}>
            <Text style={[styles.dashboardItemTitle, {color: orderColorText}]}>
              Order Id:{' '}
            </Text>
            <Text
              style={[styles.dashboardItemContent, {color: orderColorText}]}>
              {orderId}
            </Text>
          </View>
          <View style={styles.dashboardItem}>
            <Text style={[styles.dashboardItemTitle, {color: orderColorText}]}>
              Order time:{' '}
            </Text>
            <Text
              style={[styles.dashboardItemContent, {color: orderColorText}]}>
              {time_200_customer_sent
                ? getDateTime(new Date(time_200_customer_sent))
                : getDateTime(new Date(time_100_created))}
            </Text>
          </View>
          {storeName && (
            <View>
              <View style={styles.dashboardItem}>
                <Text
                  style={[styles.dashboardItemTitle, {color: orderColorText}]}>
                  Store:{' '}
                </Text>
                <Text
                  style={[
                    styles.dashboardItemContent,
                    {color: orderColorText},
                  ]}>
                  {storeName}
                </Text>
              </View>
              {storeNumber && (
                <View style={styles.dashboardItem}>
                  <View style={styles.dashboardButton}>
                    <CustomButtonSmall
                      style={styles.button}
                      primary
                      title="Contact store"
                      onPress={() => {
                        // console.log('contact touched ', customerName);
                        Alert.alert(storeName, 'Number: ' + storeNumber, [
                          {
                            text: 'Cancel',
                          },
                          {
                            text: 'Call',
                            onPress: () => {
                              Linking.openURL(`tel:${storeNumber}`);
                            },
                          },
                          {
                            text: 'WhatsApp',
                            onPress: () => {
                              Linking.openURL(
                                'whatsapp://send?text=' +
                                  message +
                                  '&phone=' +
                                  storeNumber,
                              );
                            },
                          },
                        ]);
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          )}

          {(isPickup || isDelivery) && (
            <View style={styles.dashboardItem}>
              <Text
                style={[styles.dashboardItemTitle, {color: orderColorText}]}>
                Order type:{' '}
              </Text>
              <Text
                style={[styles.dashboardItemContent, {color: orderColorText}]}>
                {isDelivery || isPickup
                  ? 'Delivery'
                  : isPickup
                  ? 'Pickup'
                  : 'Unknown'}
              </Text>
            </View>
          )}
          {orderComments && (
            <View style={styles.dashboardItem}>
              <Text
                style={[styles.dashboardItemTitle, {color: orderColorText}]}>
                Your note:{' '}
              </Text>
              <Text
                style={[styles.dashboardItemContent, {color: orderColorText}]}>
                {orderComments}
              </Text>
            </View>
          )}

          <View style={styles.dashboardItem}>
            <Text style={[styles.dashboardItemTitle, {color: orderColorText}]}>
              Status:{' '}
            </Text>
            <Text
              style={[styles.dashboardItemContent, {color: orderColorText}]}>
              {orderStatusText}
            </Text>
          </View>
          <View style={styles.dashboardItem}>
            <Text
              style={[
                styles.dashboardItemTitle,
                // eslint-disable-next-line react-native/no-inline-styles
                {fontWeight: '700'},
                {color: orderColorText},
              ]}>
              Next step:{' '}
            </Text>
            <Text
              style={[styles.dashboardItemContent, {color: orderColorText}]}>
              {orderStatusNext}
            </Text>
          </View>
        </View>

        <View style={styles.columnHeaders}>
          <Text style={styles.availabilityInfo}> </Text>
          <Text style={styles.itemTitle}>Item</Text>
          <Text style={styles.quantityTitle}>Qty </Text>
          <Text style={styles.priceTitle}> {'\u20B9'} </Text>
          {/* <Text style={styles.priceTitle}> </Text> */}
        </View>
      </View>
    );
  };

  //TODO / TOTEST
  useEffect(() => {
    // console.log(
    // 'in order items component. there are now ',
    // dataOrderItems.length,
    // ' items in this order',
    // );
  }, [dataOrderItems]);
  // console.log(
  //   'in order items component. dataorderitems is:>> ',
  //   dataOrderItems,
  // );

  const renderItem = ({item}) => {
    const {
      name: itemName,
      quantity: itemQuantity,
      price: itemPrice,
      available: itemAvailable,
      // customerComment: itemCustomerComment,
    } = item;

    return (
      <View>
        <View style={styles.listItem}>
          <Pressable
            onPress={() => {
              setCurrentItem(item);
              setModalVisibleViewItem(true);
            }}>
            <View>
              <View style={styles.listRowItem}>
                <Text style={styles.availabilityInfo}>
                  {itemAvailable !== null ? (
                    itemAvailable === true ? (
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
                    )
                  ) : (
                    ''
                  )}
                </Text>

                <Text style={styles.itemInfo}>{itemName}</Text>
                <Text style={styles.quantityInfo}> {itemQuantity}</Text>
                <Text style={styles.priceInfo}>
                  {' '}
                  {itemPrice && (
                    <Text>
                      {'\u20B9'} {itemPrice}
                    </Text>
                  )}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>
        <OrderSend
          modalVisibleOrderFinal={modalVisibleOrderFinal}
          setModalVisibleOrderFinal={setModalVisibleOrderFinal}
          orderId={orderId}
          selectedStoreDetails={selectedStoreDetails}
        />
      </View>
    );
  };

  return loadingGetOrderItems ? (
    <LoadingView />
  ) : (
    <>
      <View style={styles.dashboard}>
        {/* <View style={styles.dashboardItem}>
          <Text style={styles.dashboardItemTitle}>Order Id: </Text>
          <Text style={styles.dashboardItemContent}>{orderId}</Text>
        </View> */}

        <View style={styles.dashboardItem}>
          <Text style={[styles.dashboardItemContentFreeFlow, styles.price]}>
            {dataOrderItems.length}
          </Text>
          <Text style={styles.dashboardItemTitleFreeFlow}> items. </Text>
          <Text style={styles.dashboardItemTitleFreeFlow}>
            {/* Total price: {'\u20B9 '} */}
            Total price:{' '}
          </Text>
          <Text style={[styles.dashboardItemContentFreeFlow, styles.price]}>
            {total ? (
              <>
                <Icon
                  type="materialCommunity"
                  name="currency-inr"
                  style={styles.price}
                />
                {total}
              </>
            ) : (
              'waiting'
            )}
          </Text>
        </View>
      </View>

      <FlatList
        style={styles.list}
        data={dataOrderItems}
        // extraData={dataOrderItems.map(x => x.status_200_customer_sent)}
        keyExtractor={item => String(item.order_item_id)}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ListItemSeparatorComponent}
      />

      <OrderItemsButtons />

      <ViewItem
        modalVisibleViewItem={modalVisibleViewItem}
        setModalVisibleViewItem={setModalVisibleViewItem}
        item={currentItem}
        orderId={orderId}
        currentCodeNumber={currentCodeNumber}
      />
      <AddItemGrocery
        modalVisibleAddItem={modalVisibleAddItem}
        setModalVisibleAddItem={setModalVisibleAddItem}
        orderId={orderId}
      />

      <MakePayment
        modalVisibleMakePayment={modalVisibleMakePayment}
        setModalVisibleMakePayment={setModalVisibleMakePayment}
        orderId={orderId}
        total={total}
        storeId={storeId ? storeId : null}
      />
    </>
  );
};

export default OrderItemsComponent;
