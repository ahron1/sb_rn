import { useNavigation } from '@react-navigation/core';
import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {View, FlatList, Text, StyleSheet, Pressable, Image} from 'react-native';
import { ORDERITEMS } from '../../constants/routeNames';
import addOrder from '../../context/actions/addOrder';
import { GlobalContext } from '../../context/Provider';

const CategoryAvailability = [
  {
    category: 'grocery',
    availability: false,
  },
  {
    category: 'medicines',
    availability: false,
  },
  {
    category: 'fruits',
    availability: false,
  },
  {
    category: 'vegetables',
    availability: true,
  },
];

const Categories = [
  {
    id: 0,
    category: 'grocery',
    text: 'GROCERY',
    src: require('../../assets/images/pic1.jpg'),
  },
  {
    id: 1,
    category: 'medicines',
    text: 'MEDICINES',
    src: require('../../assets/images/logo3.png'),
  },
  {
    id: 2,
    category: 'fruits',
    text: 'FRUITS',
    src: require('../../assets/images/logo3.png'),
  },
  {
    id: 3,
    category: 'vegetables',
    text: 'VEGETABLES',
    src: require('../../assets/images/logo3.png'),
  },
];

const availablityUpdate = category => {
  category.availability = CategoryAvailability.find(
    item => item.category == category.category,
  ).availability;
};

Categories.forEach(availablityUpdate);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // justifyContent: 'center',
    // backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: 130,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  itemView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 200,
  },
  labelText: {
    paddingTop: 5,
    fontSize: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const CategoryChoose = () => {
  const {ordersDispatch, ordersState, authState} = useContext(GlobalContext);
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={Categories}
          renderItem={({item}) =>
            item.availability && (
              <View style={styles.itemView}>
                <Pressable
                  onPress={() => {
                    console.log('in category choose ' + item.category);
                    addOrder()(ordersDispatch)(orderId => {
                      navigate(ORDERITEMS, {orderId});
                    });
                    //
                  }}>
                  <View>
                    <Image source={item.src} style={styles.imageThumbnail} />
                    <Text style={styles.labelText}>{item.text}</Text>
                  </View>
                </Pressable>
              </View>
            )
          }
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default CategoryChoose;
