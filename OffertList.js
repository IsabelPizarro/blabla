import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Card, Image} from 'react-native-elements';
import SearchOfert from './SearchOfert';

function OffertList({navigation, route}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [offers, setOffers] = useState([]); // Initial empty array of offers
  const {subCategoria} = route.params;
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  console.log(search);
  // const {itemId} = route.params;
  const searchSet = text => {
    console.log('search funciton at offertList');
    setSearch(text);
    // console.log(search);
    filterSearch();
  };
  const filterSearch = () => {
    console.log('filter');
    console.log({search});
    console.log({offers});
    const results = offers.filter(item => item.localidad.includes(search));
    // const resultFiltered = results.includes(search);
    console.log(results);
    // console.log(resultFiltered);
    // setOffers(results);

    console.log(results.length);
    if (search === '') {
      console.log('llamar a firestone que traiga los datos');
      setFilter(offers);
    } else {
      setFilter(results);
    }
  };

  useEffect(() => {
    firestore()
      .collection('oferts')
      .where('subcategoria', '==', `${subCategoria}`)
      .get()
      .then(querySnapshot => {
        const allOferts = [];
        querySnapshot.forEach(documentSnapshot => {
          allOferts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setOffers(allOferts);
        setFilter(allOferts);
        setLoading(false);
      });
  }, [subCategoria]);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (offers.length < 1) {
    return <Text>No hay nada aún ninguna oferta creada de esta categoría</Text>;
  }

  return (
    <View>
      <SearchOfert search={search} searchSet={searchSet} />
      <FlatList
        data={filter}
        renderItem={({item}) => (
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              if (!item.blockOfert) {
                navigation.navigate('DetailOffert', {
                  itemId: {item},
                });
              } else {
                console.log('nada');
              }
            }}>
            <Card
              // eslint-disable-next-line react-native/no-inline-styles
              containerStyle={{padding: 10, borderRadius: 10}}>
              <Image
                source={{uri: item.photoUrl[0]}}
                style={{width: 344, height: 170, borderRadius: 10}}
                PlaceholderContent={<ActivityIndicator />}
              />
              <View>
                <Text style={styles.titleCard}>
                  {item.subcategoria}/ {item.categoria}
                </Text>
                <Text style={styles.priceText}>Precio: {item.precio}</Text>
                <Text style={styles.priceText}>Fecha</Text>
                <Text style={styles.priceText}>
                  Código postal: {item.localidad}
                </Text>
                <Text style={styles.priceText}>
                  Número de animales {item.cantidad}
                </Text>

                {item.blockOfert ? (
                  <View style={styles.ofertBlock}>
                    <Text style={styles.textBlock}>Oferta en trato</Text>
                  </View>
                ) : (
                  <View style={styles.containerBtn}>
                    <TouchableOpacity
                      style={styles.touchable}
                      onPress={() => {
                        navigation.navigate('DetailOffert', {
                          itemId: {item},
                        });
                      }}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Ver anuncio
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Card>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleCard: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 6,
  },
  containerCard: {
    backgroundColor: 'pink',
    borderRadius: 50,
  },
  priceText: {
    marginBottom: 1,
  },
  containerBtn: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#336535',
    padding: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    width: 150,
  },
  ofertBlock: {
    backgroundColor: 'grey',
    opacity: 0.6,
  },
  textBlock: {
    padding: 8,
    margin: 0,
  },
});

export default OffertList;
