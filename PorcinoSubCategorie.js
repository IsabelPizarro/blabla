import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {List, ListItem} from '@ui-kitten/components';
import {useState} from 'react';

let porcino = [
  {key: 'Toston Iberico'},
  {key: 'Lechon 100%'},
  {key: 'Lechon 50%'},
  {key: 'Lechon 50% sin norma'},
  {key: 'Marrano 3-5@ 50%'},
  {key: 'Marrano 3-5@ 100%'},
  {key: 'Primales 50%'},
  {key: 'Primales 100%'},
  {key: 'Bellota 100% Iberico'},
  {key: 'Bellota 75% Iberico'},
  {key: 'Bellota 50% Iberico'},
  {key: 'D.O. Bellota 100% Iberico'},
  {key: 'D.O. Bellota 75% Iberico'},
  {key: 'Cebo Campo'},
  {key: 'Cebo'},
  {key: 'Cebado sin Norma'},
  {key: 'Reproductora Ibérica -6 meses'},
  {key: 'Reproductora Iberica +6meses'},
  {key: 'Verraco Iberico'},
  {key: 'Verracos Duroc'},
  {key: 'Cochinillo Blanco'},
  {key: 'Lechon Blanco'},
  {key: 'Vivo normal'},
  {key: 'Graso +130Kg'},
  {key: 'Desvieje'},
];

export default function PorcinoSubcategorie({navigation, route}) {
  console.log(route.params.paramName);
  console.log(route.params.actionName);
  const {actionName} = route.params;

  const renderItem = ({item, index}) => (
    <ListItem
      style={index % 2 === 0 ? styles.item : styles.itemGrey}
      title={`${item.key}`}
      onPress={() =>
        navigation.navigate(`${actionName}`, {
          itemId: 'Porcino',
          subCategoria: `${item.key}`,
        })
      }
    />
  );

  return (
    <List style={styles.container} data={porcino} renderItem={renderItem} />
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
