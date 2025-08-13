import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // para que el View padre ocupe toda la pantalla
  },
  container__detalleNivel: {
    flex: 1, // para que ScrollView ocupe el espacio disponible
    backgroundColor: 'transparent', // quitar el negro para ver la imagen
  },
  contentContainer: {
    paddingTop: 50, // espacio arriba
    paddingBottom: 20, // espacio abajo
    paddingHorizontal: 30,
    display: 'flex',
    gap: 8,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImageStyle: {
    borderRadius: 0, // o el que quieras
  },
});

export default styles;
