import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { CHOOSESTORE, ORDERITEMS } from '../../constants/routeNames';
import addOrder from '../../context/actions/addOrder';
import { GlobalContext } from '../../context/Provider';
import LoadingView from '../LoadingView';
import styles from './styles';

const ChooseCategoryComponent = ({storesLoading, storesData, userLoyaltyCode}) => {

  // console.log('in choose category. stores are ', storesData);
  console.log('in choose category. user loyalty code is ', JSON.parse(userLoyaltyCode));
  console.log('in choose category. store loyalty codes are ', storesData.map(a => a.loyalty_code));

  let choiceComponent;
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
      category: 'medicine',
      text: 'MEDICINES',
      src: require('../../assets/images/logo3.png'),
    },
    {
      id: 2,
      category: 'fruit',
      text: 'FRUITS',
      src: require('../../assets/images/logo3.png'),
    },
    {
      id: 3,
      category: 'vegetable',
      text: 'VEGETABLES',
      src: require('../../assets/images/logo3.png'),
    },
  ];

  const CategoryAvailability = [
    {
      category: 'grocery',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.category).grocery == true;
        }).length > 0
          ? true
          : false,
    },
    {
      category: 'medicine',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.category).medicine == true;
          // return store.category.medicine == true;
        }).length > 0
          ? true
          : false,
      // availability: false,
    },
    {
      category: 'fruit',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.category).fruit == true;
          // return store.category.fruit == true;
        }).length > 0
          ? true
          : false,
      // availability: false,
    },
    {
      category: 'vegetable',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.category).vegetable == true;
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
                    console.log('in choosecategory. category choosen is ' + item.category);
                    const storesServingCategory = storesData.filter(
                        function (store) {
                            return JSON.parse(store.category)[item.category] == true;
                        }
                    );

                    console.log('in choosecategory. stores servicing category choosen is ' 
                      + JSON.stringify(storesServingCategory.map(store => store.name)));

                     
                    const storesServingCategoryLoyalCustomer = userLoyaltyCode.includes(item.category) ? storesServingCategory.filter(
                        function (store) {
                            console.log('in choosecategory - matching codes in  ',store.loyalty_code, ' and ', userLoyaltyCode);
                            console.log('XXXXXX  user loyalty code includes ', item.category, ' ', userLoyaltyCode.includes(item.category));
                            // return store.loyalty_code[1] == userLoyaltyCode[0];
                            return store.loyalty_code.filter(code => userLoyaltyCode.includes(code)).length == true
                        }
                    ) : storesServingCategory ;
                    // console.log('in categorychoose. stores serving category is ', storesServingCategory);
                  /*  addOrder()(ordersDispatch)(orderId => {
                      navigate(ORDERITEMS, {orderId});
                    }); */
                    navigate(CHOOSESTORE, {
                      storesServingCategory: storesServingCategoryLoyalCustomer, 
                      // storesServingCategory: storesServingCategory, 
                      category: item.category,
                    })
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

export default ChooseCategoryComponent;