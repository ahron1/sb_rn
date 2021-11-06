import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';

const Categories = [
  {id: 0, category: 'Grocery'},
  {id: 1, category: 'Medicines'},
  {id: 2, category: 'Fruits'},
  {id: 3, category: 'Vegetables'},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

const CategoryChoose = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Categories}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 1,
            }}>
            <Text>item.category</Text>
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default CategoryChoose;
