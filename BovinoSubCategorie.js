import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {List, ListItem} from '@ui-kitten/components';
import {useState} from 'react';

let bovino = [
  {key: 'Ternero Angus 1°'},
  {key: 'Ternero Angus 2°'},
  {key: 'Ternera Angus 1°'},
  {key: 'Ternera Angus 2°'},
  {key: 'Ternero Avileño 1°'},
  {key: 'Ternero Avileño 2°'},
  {key: 'Ternera Avileña 1°'},
  {key: 'Ternera Avileña 2°'},
  {key: 'Ternero Berrendo 1°'},
  {key: 'Ternero Berrendo 2°'},
  {key: 'Ternera Berrenda 1°'},
  {key: 'Ternera Berrenda 2°'},
  {key: 'Ternero Charolaise 1°'},
  {key: 'Ternero Charolaise 2°'},
  {key: 'Ternera Charolaise 1°'},
  {key: 'Ternera Charolaise 2°'},
  {key: 'Ternero Frisón 1°'},
  {key: 'Ternero Frisón 2°'},
  {key: 'Ternera Frisón 1°'},
  {key: 'Ternera Frisón 2°'},
  {key: 'Ternero Limousin 1°'},
  {key: 'Ternero Limousin 2°'},
  {key: 'Ternera Limousin 1°'},
  {key: 'Ternera Limousin 2°'},
  {key: 'Ternero Retinto 1°'},
  {key: 'Ternero Retinto 2°'},
  {key: 'Ternera retinta 1°'},
  {key: 'Ternera retinta 2°'},
  {key: 'Ternero País 1°'},
  {key: 'Ternero País 2° '},
  {key: 'Ternera País 1°'},
  {key: 'Ternera País 2°'},
  {key: 'Ternero cruzado 1°'},
  {key: 'Ternero cruzado 2°'},
  {key: 'Ternera cruzada 1°'},
  {key: 'ternera cruzada 2°'},
  {key: 'Vaca Angus'},
  {key: 'Vaca Avileña'},
  {key: 'Vaca Charolaise'},
  {key: 'Vaca Berrenda'},
  {key: 'Vaca Frisona'},
  {key: 'Vaca de lidia'},
  {key: 'Vaca Limousin'},
  {key: 'Vaca Retinta'},
  {key: 'Vaca pais'},
  {key: 'Vaca Cruzada'},
  {key: 'Toro Angus'},
  {key: 'Toro Avileño'},
  {key: 'Toro Berrendo'},
  {key: 'Toro Charolaise'},
  {key: 'Toro Frisón'},
  {key: 'Toro de lidia'},
  {key: 'Toro Limousin'},
  {key: 'Toro Retinto'},
  {key: 'Toro pais'},
  {key: 'Toro cruzado'},
  {key: 'Vaca Desvieje'},
  {key: 'Toro Desvieje'},
];

export default function BovinoSubCategorie({navigation, route}) {
  console.log(route.params.paramName);
  const {actionName} = route.params;
  console.log(`${actionName}`);
  // console.log(`${item.key}`);

  const renderItem = ({item, index}) => (
    <ListItem
      style={index % 2 === 0 ? styles.item : styles.itemGrey}
      title={`${item.key}`}
      onPress={() =>
        navigation.navigate(`${actionName}`, {
          itemId: 'Bovino',
          subCategoria: `${item.key}`,
        })
      }
    />
  );

  return (
    <List style={styles.container} data={bovino} renderItem={renderItem} />
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
