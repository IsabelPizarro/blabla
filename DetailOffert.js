/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CarouselImg from './CarouselImg';
import auth from '@react-native-firebase/auth';
import {Button, Card, Modal} from '@ui-kitten/components';
import ModalEditOffert from '../../formsGetBack/ModalEditOfert';
import ModalContraOferta from '../../contraofertasLogic/ModalContraOferta';

export default function DetailOffert({route, navigation}) {
  const {itemId} = route.params;
  const itemToPay = itemId.item;
  const fecha = itemId.item.fechaDeSalida;
  const date = fecha.toDate();
  const finalDate = date.toLocaleDateString('en-US');
  console.log(finalDate);
  const [userEmail, setUserEmail] = useState();
  const [visible, setVisible] = useState(false);
  // const vi = visible;
  const sendClose = () => {
    console.log('pika');
    setVisible(false);
  };

  useEffect(() => {
    auth().onAuthStateChanged(currentUser => {
      setUserEmail(currentUser.email);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View>
          <CarouselImg
            photoUrl={itemId.item.photoUrl}
            height={300}
            width={410}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.titleCard}>
            {itemId.item.categoria} / {itemId.item.subcategoria}
          </Text>
          <Text style={styles.text}>Precio: {itemId.item.precio}</Text>
          <Text style={styles.text}>Cantidad: {itemId.item.cantidad}</Text>
          <Text style={styles.text}>Peso: {itemId.item.peso}</Text>
          <Text style={styles.text}>Fecha de salida aprox: {finalDate}</Text>
          <Text style={styles.text}>Meses: {itemId.item.edad}</Text>
          <Text style={styles.text}>C.P: {itemId.item.localidad}</Text>
          <Text style={styles.text}>
            Método de pago {itemId.item.metodoPago}
          </Text>
          <Text style={styles.text}>
            A pagar en {itemId.item.diaDePago} días.
          </Text>
          <View />
        </View>
        {itemId.item.createByUserEmail === userEmail ? (
          <View>
            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}>
              <Card disabled={true}>
                <ModalEditOffert itemId={itemId} sendClose={sendClose} />
                <View />
              </Card>
            </Modal>
            <View style={styles.containerBtn}>
              <TouchableOpacity
                style={{
                  width: 155,
                  alignItems: 'center',
                  backgroundColor: '#336535',
                  padding: 10,
                  borderRadius: 17,
                  fontWeight: 'bold',
                  // margin: 10,
                }}
                onPress={() => setVisible(true)}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 155,
                  alignItems: 'center',
                  backgroundColor: '#E6B54A',
                  padding: 10,
                  borderRadius: 17,
                }}
                onPress={() => {
                  navigation.navigate('DeleteOfert', {
                    itemId: {itemId},
                  });
                }}>
                <Text style={{color: '#336535', fontWeight: 'bold'}}>
                  Borrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.containerBtn}>
              <TouchableOpacity
                style={{
                  width: 155,
                  alignItems: 'center',
                  backgroundColor: '#336535',
                  padding: 10,
                  borderRadius: 17,
                  fontWeight: 'bold',
                  // marginBottom: 10,
                }}
                onPress={() => {
                  console.log('este de debajo .item');
                  console.log(itemToPay);
                  navigation.navigate('Payment', {
                    itemToPay,
                    secondToPay: false,
                  });
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Aceptar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  alignItems: 'center',
                  backgroundColor: '#E6B54A',
                  padding: 10,
                  borderRadius: 30,
                  fontWeight: 'bold',
                  width: 155,
                }}
                onPress={() => setVisible(true)}>
                <Text style={{color: '#336535', fontWeight: 'bold'}}>
                  Contraoferta
                </Text>
              </TouchableOpacity>
            </View>
            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}>
              <Card disabled={true}>
                <ModalContraOferta itemId={itemId} sendClose={sendClose} />
                <View />
              </Card>
            </Modal>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7F7F8',
    // marginBottom: 2,
  },
  titleCard: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 13,
    marginBottom: 15,
  },
  containerText: {
    flex: 1,
    paddingLeft: 34,
  },
  text: {
    fontFamily: 'sans-serif',
    marginBottom: 8,
    fontSize: 16,
  },
  containerBtn: {
    display: 'flex',
    // flex: 1,
    marginRight: 28,
    marginLeft: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  welcomeContainer: {
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
});
