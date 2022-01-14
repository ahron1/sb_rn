import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import AppModal from '../common/AppModal';
import CustomButtonSmall from '../common/CustomButtonSmall';
import deleteOrderItem from '../../context/actions/deleteOrderItem';
import {GlobalContext} from '../../context/Provider';
import colors from '../../assets/theme/colors';
import styles from './styles';
import Icon from '../../components/common/Icon';

const ViewItem = ({
  item,
  modalVisibleViewItem,
  setModalVisibleViewItem,
  currentCodeNumber: orderStatusCodeNumber,
}) => {
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);

  const {
    order_item_id: orderItemId,
    name: orderItemName,
    quantity: orderItemQuantity,
    price: orderItemPrice,
    available: orderItemAvailable,
  } = item;
  // console.log('in view item component. item is:>> ', item);
  // console.log('in view item component. item price is:>> ', orderItemPrice);

  const canDeleteItem = orderStatusCodeNumber > 500 ? false : true;

  return (
    <AppModal
      modalVisible={modalVisibleViewItem}
      setModalVisible={setModalVisibleViewItem}
      modalTitle={'Item details'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      onModalClose={() => {
        // console.log('modal closed');
      }}
      modalBody={
        <View>
          <View>
            <View style={styles.orderItem}>
              <Text style={styles.orderItemTitle}>Item: </Text>
              <Text style={styles.orderItemContent}> {orderItemName}</Text>
            </View>
            <View style={styles.orderItem}>
              <Text style={styles.orderItemTitle}>Quantity: </Text>
              <Text style={styles.orderItemContent}> {orderItemQuantity}</Text>
            </View>

            <View style={styles.orderItem}>
              <Text style={styles.orderItemTitle}>Price: </Text>
              <Text style={[styles.orderItemContent, styles.price]}>
                {' '}
                {orderItemPrice === null ? (
                  'Waiting for store '
                ) : (
                  <>
                    <Icon
                      type="materialCommunity"
                      name="currency-inr"
                      style={styles.price}
                    />
                    {orderItemPrice}
                  </>
                )}
              </Text>
            </View>

            <View style={styles.orderItem}>
              <Text style={styles.orderItemTitle}>Available: </Text>
              {/* <Text style={styles.orderItemContent}> */}
              <Text style={[styles.orderItemContent, styles.price]}>
                {' '}
                {orderItemAvailable === null
                  ? 'Waiting for store '
                  : orderItemAvailable
                  ? 'Yes'
                  : 'No'}
              </Text>
            </View>
          </View>
          {canDeleteItem && (
            <CustomButtonSmall
              title="Delete item"
              backgroundColor={colors.color3_1}
              style={styles.buttonSection}
              loading={orderItemsState.deleteOrderItem.loading}
              disabled={orderItemsState.deleteOrderItem.loading}
              onPress={() => {
                // console.log(
                // 'custom delete button pressed on item id:>> ',
                // orderItemId,
                // );
                deleteOrderItem({orderItemId})(orderItemsDispatch)(() => {
                  // console.log('deleted order item');
                  setModalVisibleViewItem(false);
                });
              }}
            />
          )}
        </View>
      }
    />
  );
};

export default ViewItem;
