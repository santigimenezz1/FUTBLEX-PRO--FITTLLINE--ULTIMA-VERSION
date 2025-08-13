import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  ImageBackground,
} from 'react-native';
import TarjetaNivelDetalle from './TarjetaNivelDetalle/TarjetaNivelDetalle';
import styles from './DetalleNivelStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalCodigoDesbloqueo from '../../../components/ModalCodigoDesbloqueo/ModalCodigoDesbloqueo';

const DetalleNivel = () => {
  const navigation = useNavigation();
  const route = useRoute(); // usamos useRoute para acceder a los parámetros pasados a la pantalla (el nivel)
  const { rutaNivel, data } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: rutaNivel });
  }, [navigation, rutaNivel]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1749081022/Dise%C3%B1o_sin_t%C3%ADtulo_41_lwxxcd.png',
        }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        {/* Capa oscura */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 1,
          }}
        />

        {/* Contenido */}
        <ScrollView
          style={[styles.container__detalleNivel, { zIndex: 2 }]}
          contentContainerStyle={styles.contentContainer}
        >
          {data &&
            data.data.ejercicios.map((ejercicio, index) => (
              <ModalCodigoDesbloqueo
                key={index}
                nivel={rutaNivel}
                tiempo={ejercicio.tiempo}
                navigation={navigation}
                ejercicio={ejercicio}
                numero={index + 1}
              />
            ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default DetalleNivel;
