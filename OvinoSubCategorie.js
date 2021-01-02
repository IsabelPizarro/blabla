import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {List, ListItem} from '@ui-kitten/components';
import {useState} from 'react';

let ovino = [
  {key: 'Cordero Fleischschaf'},
  {key: 'Cordero Ile de France'},
  {key: 'Cordero Manchego'},
  {key: 'Cordero Merino'},
  {key: 'Cordero Merino precoz'},
  {key: 'Cordero Talaverano'},
  {key: 'Oveja Fleischschaf'},
  {key: 'Oveja Ile de France'},
  {key: 'Oveja Manchega'},
  {key: 'Oveja Merina'},
  {key: 'Oveja Merino Precoz'},
  {key: 'Oveja Talaverana'},
  {key: 'Macho Fleischschaf'},
  {key: 'Macho Ile de France'},
  {key: 'Macho Manchego'},
  {key: 'Macho Merino'},
  {key: 'Macho Merino Precoz'},
  {key: 'Macho Talaverano'},
  {key: 'Desvieje'},
];

export default function OvinoSubcategorie({navigation, route}) {
  console.log(route.params.paramName);
  console.log(route.params.actionName);
  const {actionName} = route.params;

  const renderItem = ({item, index}) => (
    <ListItem
      style={index % 2 === 0 ? styles.item : styles.itemGrey}
      title={`${item.key}`}
      onPress={() =>
        navigation.navigate(`${actionName}`, {
          itemId: 'Ovino',
          subCategoria: `${item.key}`,
        })
      }
    />
  );

  return <List style={styles.container} data={ovino} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  item: {
    fontWeight: '900',
    fontSize: 35,
    height: 50,
    textTransform: 'uppercase',
    // backgroundColor: "grey",
  },
  itemGrey: {
    fontWeight: '800',
    color: 'white',
    fontSize: 48,
    textTransform: 'uppercase',
    // fontStyle: 'bold',
    // backgroundColor: '#d9d9d9',
    backgroundColor: '#c4c0b5',
    height: 50,
  },
});
