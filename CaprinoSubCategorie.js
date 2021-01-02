import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {List, ListItem} from '@ui-kitten/components';
import {useState} from 'react';

let caprino = [
  {key: 'Cabrito Florido'},
  {key: 'Cabrito Granadino'},
  {key: 'Cabrito Malagueño'},
  {key: 'Cabrito Murciano'},
  {key: 'Cabrito Murciano Granadino'},
  {key: 'Cabrito Retinto'},
  {key: 'Cabrito verato'},
  {key: 'Cabrito cruzado'},
  {key: 'Cabra Florida'},
  {key: 'Cabra Granadina'},
  {key: 'Cabra Malagueña'},
  {key: 'Cabra Murciana'},
  {key: 'Cabra Murciano Granadina'},
  {key: 'Cabra Retinta'},
  {key: 'Cabra Verata'},
  {key: 'Cabra cruzada'},
  {key: 'Desvieje'},
];

export default function CaprinoSubcategorie({navigation, route}) {
  console.log(route.params.paramName);
  const {actionName} = route.params;

  const renderItem = ({item, index}) => (
    <ListItem
      style={index % 2 === 0 ? styles.item : styles.itemGrey}
      title={`${item.key}`}
      onPress={() =>
        navigation.navigate(`${actionName}`, {
          itemId: 'Caprino',
          subCategoria: `${item.key}`,
        })
      }
    />
  );

  return (
    <List style={styles.container} data={caprino} renderItem={renderItem} />
  );
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
