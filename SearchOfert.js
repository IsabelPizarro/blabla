import React, {useState, useEffect} from 'react';
import {SearchBar} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';

export default function SearchOfert(props) {


  return (
    <View>
      <SearchBar
        placeholder="Busca por Código Postal..."
        // eslint-disable-next-line react-n{ative/no-inline-styles
        // inputStyle={{backgroundColor: 'white'}}
        onChangeText={text => props.searchSet(text)}
        // containerStyle={{backgroundColor: 'white'}}
        value={props.search}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  seachBar: {
    marginBottom: 6,
    backgroundColor: 'white',
  },
});
