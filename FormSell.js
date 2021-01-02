/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid4 from 'uuid/v4';
import Iconito from 'react-native-vector-icons/FontAwesome';
import {
  IndexPath,
  Layout,
  Select,
  Datepicker,
  SelectItem,
} from '@ui-kitten/components';

export default function FormSell({navigation, route}) {
  const {itemId} = route.params;
  const {subCategoria} = route.params;
  const [city, setCity] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [faults, setFaults] = useState();
  const [PayDay, setPayDay] = useState();
  const [createByUserEmail, setCreateByUserEmail] = useState(null);
  const [offer, setOffer] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [selectedIndexTwo, setSelectedIndexTwo] = useState(new IndexPath(0));
  const dataTwo = ['€/kg', '€/libra', '€/@', '€/unidad'];

  const data = ['Transferencia', 'Cheque', 'Pagaré'];
  const displayValue = data[selectedIndex.row];
  const displayValueTwo = dataTwo[selectedIndexTwo.row];

  // <i class="fas fa-euro-sign"></i>
  const CalendarIcon = () => <Iconito name="calendar" size={20} color="grey" />;
  var CurrentDate = new Date();

  const maxDate = new Date(
    CurrentDate.getFullYear(),
    CurrentDate.getMonth(),
    CurrentDate.getDate() + 91,
  );
  const renderOption = title => <SelectItem title={title} />;
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setCreateByUserEmail(user.email);
    });
  }, []);

  function checkNumbers() {
    console.log(faults);
    let regex = new RegExp('^[a-zA-Z ]+$');

    if (regex.test(faults)) {
      console.log('esta bien');
      return false;
    } else {
      console.log('es numero');
      return true;
    }
  }

  function addOffer() {
    var uuid = uuid4();
    console.log('Añadiendo oferta...');
    if (price === undefined || price === '') {
      Alert.alert('El campo precio es obligatorios');
    } else if (quantity === undefined || quantity === '') {
      Alert.alert('El campo cantidad es obligatorios');
    } else if (weight === undefined || weight === '') {
      Alert.alert('El campo peso es obligatorios');
    } else if (age === undefined || age === '') {
      Alert.alert('El campo edad es obligatorios');
    } else if (city === undefined || city === '') {
      Alert.alert('El campo Localidad es obligatorios');
    } else if (date === undefined || date === '') {
      Alert.alert('El campo fecha es obligatorios');
    } else if (PayDay === undefined || PayDay === '') {
      Alert.alert('El campo método de pago es obligatorios');
    } else if (checkNumbers()) {
      console.log(checkNumbers());
      Alert.alert('No puedes poner números en defectos');
    } else {
      var firstTwoDigits = city.toString().substring(0, 2);
      console.log(firstTwoDigits);
      // console.log(date);

      // console.log(date.toLocaleDateString());

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      var correctDate =
        month < 10 ? `${day}/0${month}/${year}` : `${day}/${month}/${year}`;
      console.log(correctDate);

      console.log(city);
      const Oferta = {
        categoria: `${itemId}`,
        subcategoria: `${subCategoria}`,
        fechaDeSalida: date,
        localidad: city,
        precio: price,
        cantidad: quantity,
        peso: weight,
        typeWeight: displayValueTwo,
        edad: age,
        defectos: faults,
        metodoPago: displayValue,
        diaDePago: PayDay,
        createByUserEmail: createByUserEmail,
        uuid: uuid,
        photoUrl: 'nada',
        createdAt: firestore.FieldValue.serverTimestamp(),
        hasOfert: false,
        cp: firstTwoDigits,
        correctDate: correctDate,
      };
      setOffer(Oferta);
      navigation.navigate('UpPhoto', {
        itemId: Oferta,
      });
    }
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <Text style={styles.welcome}>Información de venta</Text>
        <View style={styles.containerInput}>
          <Text placeholder="Nombre" style={styles.textInput}>
            {itemId}
          </Text>
        </View>
        <View style={styles.viewInput}>
          <Text placeholder="Nombre" style={styles.textInput}>
            {subCategoria}
          </Text>
        </View>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="C.P. Localidad"
            maxLength={5}
            keyboardType={'numeric'}
            style={styles.textInput}
            onChangeText={text => setCity(text)}
          />
        </View>
        <View style={styles.viewInput}>
          <Layout style={styles.container} level="1">
            <Select
              style={styles.select}
              placeholder="Default"
              value={displayValue}
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}>
              {data.map(renderOption)}
            </Select>
          </Layout>
        </View>
        <View>
          <Layout style={styles.container} level="1">
            <Datepicker
              label="Fecha aprox. de salida"
              placeholder="Pick Date"
              date={date}
              max={maxDate}
              onSelect={nextDate => setDate(nextDate)}
              accessoryRight={CalendarIcon}
            />
          </Layout>
        </View>
        {/* <View style={styles.containerInputs}> */}
        <View style={styles.viewInputWeightAndQuantity}>
          <TextInput
            placeholder="Peso"
            keyboardType={'numeric'}
            maxLength={4}
            style={styles.textInputWeight}
            onChangeText={text => setWeight(text)}
          />
          <View style={styles.viewInputSelect}>
            {/* <Layout style={styles.container} level="1"> */}
            <Select
              style={styles.select}
              placeholder="Default"
              value={displayValueTwo}
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndexTwo(index)}>
              {dataTwo.map(renderOption)}
            </Select>
            {/* </Layout> */}
          </View>
        </View>
        {/* </View> */}
        <View style={styles.containerInputs}>
          <View style={styles.viewInputWeightAndQuantity}>
            <TextInput
              placeholder="Cantidad"
              maxLength={4}
              keyboardType={'numeric'}
              style={styles.textInputWeight}
              onChangeText={text => setQuantity(text)}
            />
            <Text style={styles.mask}> /uds</Text>
          </View>
          <View style={styles.viewInputWeightAndQuantity}>
            <TextInput
              maxLength={2}
              placeholder="A pagar en"
              keyboardType={'numeric'}
              style={styles.textInputWeight}
              onChangeText={text => setPayDay(text)}
            />
            <Text style={styles.mask}> días</Text>
          </View>
        </View>
        <View style={styles.containerInputs}>
          <View style={styles.viewInputWeightAndQuantity}>
            <TextInput
              maxLength={4}
              placeholder="Precio"
              keyboardType={'numeric'}
              style={styles.textInputWeight}
              onChangeText={text => setPrice(text)}
            />
            <Text style={styles.mask}> €</Text>
          </View>
          <View style={styles.viewInputWeightAndQuantity}>
            <TextInput
              maxLength={4}
              placeholder="Edad"
              keyboardType={'numeric'}
              style={styles.textInputWeight}
              onChangeText={text => setAge(text)}
            />
            <Text style={styles.mask}> meses</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Obervaciones/Defectos"
            multiline={true}
            maxLength={50}
            numberOfLines={2}
            style={styles.textInput}
            onChangeText={text => setFaults(text)}
          />
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: 'black',
              padding: 10,
              borderRadius: 30,
              fontWeight: 900,
            }}
            onPress={() => {
              navigation.navigate('MainCategories');
            }}>
            <Text style={{color: 'white'}}> Volver </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#336535',
              padding: 10,
              borderRadius: 30,
              fontWeight: 'bold',
            }}
            onPress={addOffer}>
            <Text style={{color: 'white'}}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: '#F7F7F8',
    alignContent: 'center',
    alignItems: 'center',
    margin: 0,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 12,
  },
  // container: {
  //   minHeight: 360,
  // },

  welcome: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#336535',
    marginTop: 15,
    marginBottom: 30,
  },
  textInput: {
    padding: 9,
    backgroundColor: '#fff',
    width: 310,
    // borderRadius: 50,
  },
  viewInput: {
    marginTop: 14,
    backgroundColor: '#fff',
  },
  textInputWeight: {
    padding: 9,
    backgroundColor: '#fff',
    width: 89,
  },
  viewInputWeightAndQuantity: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewInputSelect: {
    width: 110,
  },
});
