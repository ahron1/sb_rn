import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { ORDERITEMS } from '../../constants/routeNames';
import addOrder from '../../context/actions/addOrder';
import { GlobalContext } from '../../context/Provider';
import LoadingView from '../LoadingView';
import styles from './styles';

const CategoryChooseComponent = ({storesLoading, storesData}) => {
  let choiceComponent;
  const {ordersDispatch, ordersState, authState} = useContext(GlobalContext);
  const {navigate} = useNavigation();

  // this is the static list of categories.
  // after the list of stores has been fetched, the next function will update this list with available categories
  // TODO - a useeffect for making the network call and subsequently calling the update function.
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

  const CategoryAvailability = [
    {
      category: 'grocery',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.categories).grocery == true;
        }).length > 0
          ? true
          : false,
    },
    {
      category: 'medicines',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.categories).medicines == true;
          return store.categories.medicines == true;
        }).length > 0
          ? true
          : false,
      // availability: false,
    },
    {
      category: 'fruits',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.categories).fruits == true;
          return store.categories.fruits == true;
        }).length > 0
          ? true
          : false,
      // availability: false,
    },
    {
      category: 'vegetables',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.categories).vegetables == true;
        }).length > 0
          ? true
          : false,
      // availability: true,
    },
  ];

  // this is the static list of categories.
  // after the list of stores has been fetched, the next function will update this list with available categories
  // TODO - a useeffect for making the network call and subsequently calling the update function.

  const availablityUpdate = category => {
    category.availability = CategoryAvailability.find(
      item => item.category == category.category,
    ).availability;
  };
  Categories.forEach(availablityUpdate);


  if (storesLoading) {
    choiceComponent= <LoadingView />;
  } else if (!storesLoading) {
      choiceComponent = 
    (
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
                    console.log('in categorychoose. storesdata is ', storesData.filter(
                        function (store) {
                            return JSON.parse(store.categories)[item.category] == true;
                            // return JSON.parse(store.categories).grocery == true;
                        }
                    ));
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
  )};
  return choiceComponent;
}

export default CategoryChooseComponent;