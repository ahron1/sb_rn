import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from '../common/Icon';
import styles from './styles';
import {array} from 'yup';
import colors from '../../assets/theme/colors';

const vw = responsiveWidth;
const vh = responsiveHeight;
const fs = responsiveFontSize;

const statusCodes = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const OrderStatusComponent = ({
  orderStatusCode,
  orderColorCode,
  orderId,
  storeName,
  orderSentTime,
}) => {
  // console.log('in order status component. status code is:>> ', orderStatusCode);
  const currentCodeNumber = Number(orderStatusCode.substr(7, 3));
  const colorDone = colors.color4_3;
  const textColorDone = colors.normalgrey;
  const colorWaiting = colors.lightgrey;
  const textColorWaiting = colors.lightgrey;
  const colorWip = colors.color2_2_3;
  const textColorWip = colors.color4_2;
  const isCurrentStatus = sectionStatus => {
    const currentCodeIndex = statusCodes.indexOf(currentCodeNumber);
    const sectionCodeIndex = statusCodes.indexOf(sectionStatus);
    const returnValue =
      sectionCodeIndex - currentCodeIndex === 1 ? true : false;
    return returnValue;
  };
  const isFutureStatus = sectionStatus => {
    const currentCodeIndex = statusCodes.indexOf(currentCodeNumber);
    const sectionCodeIndex = statusCodes.indexOf(sectionStatus);
    const returnValue = sectionCodeIndex - currentCodeIndex > 1 ? true : false;
    return returnValue;
  };
  const isOldStatus = sectionStatus => {
    const currentCodeIndex = statusCodes.indexOf(currentCodeNumber);
    const sectionCodeIndex = statusCodes.indexOf(sectionStatus);
    const returnValue = sectionCodeIndex - currentCodeIndex < 1 ? true : false;
    return returnValue;
  };

  const getColor = sectionStatus => {
    const color = isOldStatus(sectionStatus)
      ? colorDone
      : isCurrentStatus(sectionStatus)
      ? colorWip
      : colorWaiting;
    return color;
  };
  const getTextcolor = sectionStatus => {
    const color = isOldStatus(sectionStatus)
      ? textColorDone
      : isCurrentStatus(sectionStatus)
      ? textColorWip
      : textColorWaiting;
    return color;
  };
  const getStatusIconType = sectionStatus => {
    const iconType = isOldStatus(sectionStatus)
      ? 'fa'
      : isCurrentStatus(sectionStatus)
      ? 'entypo'
      : 'materialCommunity';
    return iconType;
  };
  const getStatusIconName = sectionStatus => {
    const iconName = isOldStatus(sectionStatus)
      ? 'check'
      : isCurrentStatus(sectionStatus)
      ? 'hour-glass'
      : 'progress-clock';
    return iconName;
  };
  const getStatusText = sectionStatus => {
    const text = isOldStatus(sectionStatus)
      ? 'Done'
      : isCurrentStatus(sectionStatus)
      ? 'In progress'
      : 'Waiting...';
    return text;
  };

  return (
    <ScrollView>
      {/* <View style={styles.container}> */}
      <View style={[styles.dashboard, {backgroundColor: orderColorCode}]}>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardTextTitle}>Order Id: </Text>
          <Text style={styles.dashboardTextDetail}>{orderId}</Text>
        </View>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardTextTitle}>Store: </Text>
          <Text style={styles.dashboardTextDetail}>{storeName}</Text>
        </View>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardTextTitle}>Order time:</Text>
          <Text style={styles.dashboardTextDetail}>{orderSentTime}</Text>
        </View>

        {/* orderColorCode, */}
      </View>
      <View style={styles.container}>
        <View>
          {/* 000 */}
          <View style={{flexDirection: 'row'}}>
            {/*
            <View style={styles.sectionWho}>
              <Icon
                type="ionicon"
                name="person-circle-outline"
                style={[styles.iconTiny, {color: getColor(100)}]}
              />
            </View>
              */}
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa5"
                name="house-user"
                style={[styles.iconSmall, {color: colors.color2_0}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(100)}]}>
                  You need stuff at home
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(100)},
                  ]}>
                  {/* {getStatusText(100)} */}
                  Use the Storebhai app
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              {/*
              <Icon
                type="materialCommunity"
                name="playlist-edit"
                style={[styles.iconMedium, {color: getColor(100)}]}
              />
              */}
              <View>
                <Image
                  height={1}
                  width={1}
                  source={require('../../assets/images/logo_storebhai.png')}
                  // style={styles.logoImage}
                  style={{
                    height: 60,
                    width: 60,
                    padding: 5,
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>
            {/*
            <View style={styles.sectionStatusIcon}>
              <Icon
                type={getStatusIconType(100)}
                name={getStatusIconName(100)}
                style={[styles.iconTiny, {color: getColor(100)}]}
              />
            </View>
              */}
          </View>
        </View>

        <View>
          {/* 100 */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.sectionWho}>
              <Icon
                type="ionicon"
                name="person-circle-outline"
                style={[styles.iconTiny, {color: getColor(100)}]}
              />
            </View>
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa"
                name="long-arrow-down"
                style={[styles.iconXLarge, {color: getColor(100)}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(100)}]}>
                  Make new order
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(100)},
                  ]}>
                  {getStatusText(100)}
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              <Icon
                type="materialCommunity"
                name="playlist-edit"
                style={[styles.iconMedium, {color: getColor(100)}]}
              />
            </View>
            <View style={styles.sectionStatusIcon}>
              {/* <Icon type="entypo" name="hour-glass" style={styles.iconSmall} /> */}
              <Icon
                // type="fa"
                // name="check"
                type={getStatusIconType(100)}
                name={getStatusIconName(100)}
                style={[styles.iconTiny, {color: getColor(100)}]}
              />
            </View>
          </View>
        </View>

        <View>
          {/* 200 */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.sectionWho}>
              <Icon
                type="ionicon"
                name="person-circle-outline"
                style={[styles.iconTiny, {color: getColor(200)}]}
              />
            </View>
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa"
                name="long-arrow-down"
                style={[styles.iconXLarge, {color: getColor(200)}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(200)}]}>
                  Send order to store
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(200)},
                  ]}>
                  {getStatusText(200)}
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              <Icon
                type="fa"
                name="send"
                style={[styles.iconXSmall, {color: getColor(200)}]}
              />
            </View>
            <View style={styles.sectionStatusIcon}>
              <Icon
                type={getStatusIconType(200)}
                name={getStatusIconName(200)}
                style={[styles.iconTiny, {color: getColor(200)}]}
              />
            </View>
          </View>
        </View>

        <View>
          {/* 300 */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.sectionWho}>
              <Icon
                type="fontisto"
                name="shopping-store"
                style={[styles.iconTiny, {color: getColor(300)}]}
              />
            </View>
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa"
                name="long-arrow-down"
                style={[styles.iconXLarge, {color: getColor(300)}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(300)}]}>
                  Store checks order
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(300)},
                  ]}>
                  {getStatusText(300)}
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              <Icon
                type="material"
                name="receipt-long"
                style={[styles.iconSmall, {color: getColor(300)}]}
              />
            </View>
            <View style={styles.sectionStatusIcon}>
              <Icon
                type={getStatusIconType(300)}
                name={getStatusIconName(300)}
                style={[styles.iconTiny, {color: getColor(300)}]}
              />
            </View>
          </View>
        </View>

        <View>
          {/* 400 */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.sectionWho}>
              <Icon
                type="fontisto"
                name="shopping-store"
                style={[styles.iconTiny, {color: getColor(400)}]}
              />
            </View>
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa"
                name="long-arrow-down"
                style={[styles.iconXLarge, {color: getColor(400)}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(400)}]}>
                  Store fulfills order
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(400)},
                  ]}>
                  {getStatusText(400)}
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              <Icon
                type="materialCommunity"
                name="cart-arrow-right"
                style={[styles.iconSmall, {color: getColor(400)}]}
              />
            </View>
            <View style={styles.sectionStatusIcon}>
              <Icon
                type={getStatusIconType(400)}
                name={getStatusIconName(400)}
                style={[styles.iconTiny, {color: getColor(400)}]}
              />
            </View>
          </View>
        </View>
        <View>
          {/* 500 */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.sectionWho}>
              <Icon
                type="ionicon"
                name="person-circle-outline"
                style={[styles.iconTiny, {color: getColor(500)}]}
              />
            </View>
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa"
                name="long-arrow-down"
                style={[styles.iconXLarge, {color: getColor(500)}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(500)}]}>
                  Customer receives items
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(500)},
                  ]}>
                  {getStatusText(500)}
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              <Icon
                type="fontisto"
                name="shopping-bag-1"
                style={[styles.iconXSmall, {color: getColor(500)}]}
              />
            </View>
            <View style={styles.sectionStatusIcon}>
              <Icon
                type={getStatusIconType(500)}
                name={getStatusIconName(500)}
                style={[styles.iconTiny, {color: getColor(500)}]}
              />
            </View>
          </View>
        </View>
        <View>
          {/* 600 */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.sectionWho}>
              <Icon
                type="ionicon"
                name="person-circle-outline"
                style={[styles.iconTiny, {color: getColor(600)}]}
              />
            </View>
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa"
                name="long-arrow-down"
                style={[styles.iconXLarge, {color: getColor(600)}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(600)}]}>
                  Customer makes payment
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(600)},
                  ]}>
                  {getStatusText(600)}
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              <Icon
                type="fa"
                name="inr"
                style={[styles.iconXSmall, {color: getColor(600)}]}
              />
            </View>
            <View style={styles.sectionStatusIcon}>
              <Icon
                type={getStatusIconType(600)}
                name={getStatusIconName(600)}
                style={[styles.iconTiny, {color: getColor(600)}]}
              />
            </View>
          </View>
        </View>
        <View>
          {/* 700 */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.sectionWho}>
              <Icon
                type="fontisto"
                name="shopping-store"
                style={[styles.iconTiny, {color: getColor(700)}]}
              />
            </View>
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa"
                name="long-arrow-down"
                style={[styles.iconXLarge, {color: getColor(700)}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(700)}]}>
                  Store confirms payment
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(700)},
                  ]}>
                  {getStatusText(700)}
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              <Icon
                type="fa"
                name="inr"
                style={[styles.iconXSmall, {color: getColor(700)}]}
              />
            </View>
            <View style={styles.sectionStatusIcon}>
              <Icon
                type={getStatusIconType(700)}
                name={getStatusIconName(700)}
                style={[styles.iconTiny, {color: getColor(700)}]}
              />
            </View>
          </View>
        </View>
        <View>
          {/* 900 */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.sectionWho} />
            <View style={styles.sectionProgressArrow}>
              <Icon
                type="fa"
                name="thumbs-up"
                style={[styles.iconSmall, {color: getColor(900)}]}
              />
            </View>
            <View style={styles.description}>
              <View style={styles.sectionDesc}>
                <Text
                  style={[styles.sectionDescText, {color: getTextcolor(900)}]}>
                  Order complete
                </Text>
              </View>
              <View style={styles.sectionDesc}>
                <Text
                  style={[
                    styles.sectionStatusDescText,
                    {color: getTextcolor(900)},
                  ]}>
                  All done
                </Text>
              </View>
            </View>
            <View style={styles.sectionActionIcon}>
              <Icon
                type="fa5"
                name="handshake"
                style={[styles.iconSmall, {color: getColor(900)}]}
              />
            </View>
            <View style={styles.sectionStatusIcon}>
              {/* <Icon
                type="ionicon"
                name="checkmark-done-circle"
                style={[styles.iconXSmall, {color: getColor(900)}]}
              /> */}
            </View>
          </View>
        </View>
      </View>

      <View>
        {/* rewards */}
        <View style={{flexDirection: 'row'}}>
          <View style={styles.sectionWho} />
          <View style={styles.sectionProgressArrow}>
            <Icon
              type="fa5"
              name="award"
              style={[styles.iconMedium, {color: getColor(900)}]}
            />
          </View>
          <View style={styles.description}>
            <View style={styles.sectionDesc}>
              <Text
                style={[
                  styles.sectionStatusDescText,
                  {color: getTextcolor(900)},
                ]}>
                {' '}
                WIN REWARDS!
              </Text>
            </View>
          </View>
          <View style={styles.sectionActionIcon}>
            <Icon
              type="entypo"
              name="trophy"
              style={[styles.iconLarge, {color: getColor(900)}]}
            />
          </View>
          <View style={styles.sectionStatusIcon}>
            {/* <Icon
                type="ionicon"
                name="checkmark-done-circle"
                style={[styles.iconXSmall, {color: getColor(900)}]}
              /> */}
          </View>
        </View>
      </View>
      <View>
        <Text />
        <Text />
        <Text />
        <Text />
      </View>
    </ScrollView>
  );
};

export default OrderStatusComponent;
