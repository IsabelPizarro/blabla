/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {Avatar, Badge} from 'react-native-elements';
import uuid4 from 'uuid/v4';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export default function UpPhoto({route, navigation}) {
  const {itemId} = route.params;
  const [foto, setFoto] = useState();
  const [id, setId] = useState(itemId.uuid);
  const [offer, setOffer] = useState(itemId);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const upImage = async () => {
    console.log('subiendo...');

    const options = {
      // noData: true,
      title: 'Selecciona una foto',
      takePhotoButtonTitle: 'Hacer foto',
      chooseFromLibraryButtonTitle: 'Elegir foto de la galería',
      cancelButtonTitle: 'Cancelar',
      mediaTyoe: 'photo',
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        let saveUri = response.path;
        console.log(saveUri);
        setImagesSelected([...imagesSelected, response.uri]);
        setFoto(source);
        const fileExtension = saveUri.split('.').pop();
        var uuid = uuid4();
        const fileName = `FOTOSOFERTAS/${uuid}.${fileExtension}`;
        // console.log(fileName);
      }
    });
  };

  function UploadImages() {
    let pepa = imagesSelected;
    return (
      <View style={styles.viewImages}>
        {pepa.length < 4 && (
          <Icon
            name="camera"
            size={26}
            color="#7a7a7a"
            style={styles.containerIcon}
            onPress={upImage}
          />
        )}
        {pepa.map((item, index) => (
          <View>
            <Avatar
              key={index}
              style={styles.miniImg}
              source={{uri: item}}
              onPress={() => removeImage(item)}
            />
            <Badge
              badgeStyle={{backgroundColor: 'grey'}}
              value="+"
              containerStyle={{position: 'absolute', top: -4, right: -4}}
            />
          </View>
        ))}
      </View>
    );
  }
  const removeImage = image => {
    const arrayImg = imagesSelected;
    console.log(image);
    Alert.alert(
      'Eliminar Imagen',
      '¿Estás seguro de que quieres eliminar la imagen?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            const newImages = arrayImg.filter(img => img !== image);
            setImagesSelected(newImages);
            console.log(newImages);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const arrayImages = async => {
    if (imagesSelected.length < 1) {
      Alert.alert(
        'Tienes que subir la menos una foto para que tu oferta se publique',
      );
    } else {
      setLoading(true);
      const imageBlog = [];
      imagesSelected.map(async img => {
        const response = await fetch(img);
        const blob = await response.blob();
        // eslint-disable-next-line prettier/prettier
      const ref = firebase.storage().ref('fotosArray').child(uuid4());
        await ref.put(blob).then(async result => {
          await firebase
            .storage()
            .ref(`fotosArray/${result.metadata.name}`)
            .getDownloadURL()
            .then(photoUrl => {
              imageBlog.push(photoUrl);
              firestore()
                .collection('oferts')
                .doc(`${id}`)
                .set({
                  photoUrl: imageBlog,
                  categoria: offer.categoria,
                  subcategoria: offer.subcategoria,
                  fechaDeSalida: offer.fechaDeSalida,
                  localidad: offer.localidad,
                  precio: offer.precio,
                  cantidad: offer.cantidad,
                  peso: offer.peso,
                  typeWeight: offer.typeWeight,
                  edad: offer.edad,
                  defectos: offer.defectos,
                  metodoPago: offer.metodoPago,
                  diaDePago: offer.diaDePago,
                  createByUserEmail: offer.createByUserEmail,
                  uuid: offer.uuid,
                  createdAt: firestore.FieldValue.serverTimestamp(),
                  hasOfert: false,
                  cp: offer.cp,
                  correctDate: offer.correctDate,
                })
                .then(querySnapshot => {
                  setLoading(false);
                  console.log('oferta con  foto añadida!');
                  Alert.alert(
                    'Gracias por subir la oferta puedes gestionar todas tus ofertas en el panel de usuario. Gracias',
                  );
                  navigation.navigate('CompraVenta');
                });
            });
        });
      });
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcome}>Añade tus fotos</Text>
      <View style={styles.upPhotoContainer}>
        {foto ? (
          <View>
            <Image
              source={foto}
              style={{width: 380, height: 234, borderRadius: 9}}
            />
          </View>
        ) : (
          <View style={{padding: 25}}>
            <Text style={styles.textInf}>
              Las fotografías y su calidad son importantes. Por ello, te
              recomendamos que sigas las siguientes indicaciones antes de
              publicar tu fotografía:
            </Text>
            <Text style={styles.textInf}> -Hazlas cuando haya mucha luz. </Text>
            <Text style={styles.textInf}>
              -Asegúrate de que en ella aparecen todos los animales. -Sube
              varias fotografías desde diferentes perspectivas.
            </Text>
            <Text style={styles.textInf}>
              ¿Tienes problemas en subir fotografías? Puedes escrbirnos a
              info@bysapp.es. ¡Te ayudamos!
            </Text>
          </View>
        )}
      </View>
      <UploadImages />
      <View
        style={{
          marginTop: 10,
          borderTopRadius: 10,
          width: 100,
          flex: 1,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#336535',
            padding: 10,
            borderRadius: 30,
            fontWeight: 'bold',
          }}
          onPress={arrayImages}>
          <Text style={{color: 'white'}}>Subir fotos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7F7F8',
    alignContent: 'center',
    alignItems: 'center',
    margin: 0,
  },

  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#336535',
    marginTop: 15,
  },
  upPhotoContainer: {
    backgroundColor: '#AEC3A0',
    borderRadius: 10,
    margin: 25,
    // padding: 25,
    // height: 300,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 15,
  },
  viewImages: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginRight: 16,
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    // marginRight: 10,
    paddingLeft: 22,
    paddingTop: 23,
    height: 70,
    width: 70,
    backgroundColor: '#e3e3e3',
  },
  miniImg: {
    marginLeft: 10,
    height: 70,
    width: 70,
  },
  textInf: {
    marginTop: 5,
    fontSize: 14,
  },
});
