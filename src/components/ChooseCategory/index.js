import React, {useContext, useState} from 'react';
import {GlobalContext} from '../../context/Provider';
import {useNavigation} from '@react-navigation/native';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {CHOOSESTORE} from '../../constants/routeNames';
import LoadingView from '../LoadingView';
import LoyaltyCodeForCategory from '../LoyaltyCodeForCategory';
import styles from './styles';

const ChooseCategoryComponent = ({storesLoading, storesData}) => {
  const {navigate} = useNavigation();

  let choiceComponent;
  let storesList;
  const {authState} = useContext(GlobalContext);
  const [modalVisibleLoyalty, setModalVisibleLoyalty] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(null);

  const userLoyaltyCode = authState.loyalty_code.code;

  // this is the static list of categories.
  // after the list of stores has been fetched, the next function will update this list with available categories
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
        }).length > 0
          ? true
          : false,
    },
    {
      category: 'fruit',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.category).fruit == true;
        }).length > 0
          ? true
          : false,
    },
    {
      category: 'vegetable',
      availability:
        storesData.filter(function (store) {
          return JSON.parse(store.category).vegetable == true;
        }).length > 0
          ? true
          : false,
    },
  ];

  const availablityUpdate = category => {
    category.availability = CategoryAvailability.find(
      item => item.category == category.category,
    ).availability;
  };
  Categories.forEach(availablityUpdate);

  if (storesLoading) {
    choiceComponent = <LoadingView />;
  } else if (!storesLoading) {
    choiceComponent = (
      <>
        <View style={styles.container}>
          <View>
            <FlatList
              data={Categories}
              renderItem={({item}) =>
                item.availability && (
                  <View style={styles.itemView}>
                    <Pressable
                      onPress={() => {
                        setChosenCategory(item.category);

                        const storesServingCategory = storesData.filter(
                          function (store) {
                            return (
                              JSON.parse(store.category)[item.category] == true
                            );
                          },
                        );
                        const storesServingCategoryLoyalCustomer =
                          userLoyaltyCode.includes(item.category)
                            ? storesServingCategory.filter(function (store) {
                                /*
                                return (
                                  store.loyalty_code.filter(code =>
                                    authState.loyalty_code.code.includes(code),
                                  ).length > 0
                                );

                                return (
                                  store.loyalty_code.filter(function (code) {
                                    return authState.loyalty_code.code.includes(
                                      code,
                                    );
                                  }).length > 0
                                );
                                */
                                /*
                                console.log(
                                  'users codes are  ',
                                  authState.loyalty_code.code,
                                );

                                console.log(
                                  'stores codes are  ',
                                  store.loyalty_code,
                                );
                                console.log(
                                  '------- stores codes filtered are  ',
                                  store.loyalty_code.filter(code =>
                                    authState.loyalty_code.code.includes(code),
                                  ).length > 0,
                                );
                                */
                                return (
                                  store.loyalty_code.filter(function (code) {
                                    /*
                                    console.log('code is ', code);
                                    console.log(
                                      'array  is ',
                                      authState.loyalty_code.code,
                                    );
                                    console.log(
                                      'array contains code is ',
                                      authState.loyalty_code.code.includes(
                                        code,
                                      ),
                                    );
                                    */
                                    return authState.loyalty_code.code.includes(
                                      code,
                                    );
                                  }).length > 0
                                );
                              })
                            : storesServingCategory;

                        // Note 1 ---
                        // if user has entered the code for store1 under category A,
                        // and the store also serves category B,
                        // then when the user chooses category B, he is shown store1

                        // Note 2 --
                        // If the user entered code for store1 under category A,
                        // and code for store2 under category B,
                        // and both store1 and store2 serve category C
                        // then when the user chooses category C, he is shown both store1 and store2

                        // Note 3 ---
                        // if user has loyalty code(s) but none of the stores
                        // for which he has the code(s) service the category
                        // then user is shown zero stores.
                        // then user should be shown all stores which service the category (regardless of code)
                        //

                        storesList =
                          storesServingCategoryLoyalCustomer.length > 0
                            ? storesServingCategoryLoyalCustomer
                            : storesServingCategory;

                        if (userLoyaltyCode.includes(item.category)) {
                          navigate(CHOOSESTORE, {
                            storesData: storesList,
                            category: item.category,
                          });
                        } else {
                          setModalVisibleLoyalty(true);
                        }
                      }}>
                      <View>
                        <Image
                          source={item.src}
                          style={styles.imageThumbnail}
                        />
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

        <LoyaltyCodeForCategory
          modalVisibleLoyalty={modalVisibleLoyalty}
          setModalVisibleLoyalty={setModalVisibleLoyalty}
          storesList={storesList}
          category={chosenCategory}
          userLoyaltyCode={userLoyaltyCode}
        />
      </>
    );
  }
  return choiceComponent;
};

export default ChooseCategoryComponent;
