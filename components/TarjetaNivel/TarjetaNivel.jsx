// TarjetaNivel.jsx
import { ImageBackground, Pressable, Text, View } from "react-native";
import styles from "../TarjetaNivel/TarjetaNivel.js";
import { useContext } from "react";
import { CartContext } from "../../Context/Context.jsx";
import { FontAwesome } from '@expo/vector-icons';

const TarjetaNivel = ({ data, nivel, tiempo, navigation }) => {
  const { closed, idiomaActual } = useContext(CartContext);

  const clavesNombre = {
    espana: "nombre",
    italia: "nombreItalia",
    francia: "nombreFrancia",
    bandera: "nombreAlemania",
    estadosUnidos: "nombreInglaterra",
    inglaterra: "nombreInglaterra",
    paisesBajos: "nombrePaisesBajos",
    portugal: "nombrePortugal",
  };

  const claveNombre = clavesNombre[idiomaActual] || "nombre";
  const rutaNivel = nivel[claveNombre] || nivel.nombre;

  const clavesTextoSecundario = {
    espana: "textoSecundario",
    italia: "textoSecundarioItalia",
    francia: "textoSecundarioFrancia",
    bandera: "textoSecundarioAlemania",
    estadosUnidos: "textoSecundarioEstadosUnidos",
    inglaterra: "textoSecundarioInglaterra",
    paisesBajos: "textoSecundarioPaisesBajos",
    portugal: "textoSecundarioPortugal",
  };

  const claveTextoSecundario = clavesTextoSecundario[idiomaActual] || "textoSecundario";
  const textoSecundario = nivel[claveTextoSecundario] || nivel.textoSecundario;

  return (
    <ImageBackground
      source={{
        uri:
          nivel.imagen ||
          "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747219924/4125b593-3b1a-446b-b222-6d9dd6945592_lymwxp.png",
      }}
      style={styles.fondoImagen}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.overlay} />

      <Pressable
        onPress={() => navigation.navigate("DetalleNivel", { rutaNivel, data })}
        style={styles.container__tarjetaNivel}
      >
        {/* Texto centrado */}
        <View style={styles.centroTexto}>
          <Text style={styles.text}>
            {rutaNivel}
          </Text>
        </View>

        {/* Estrellas alineadas a la derecha inferior */}
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 5, position: "absolute", bottom: 10, right: 10 }}>
          {data.data.estrellas.completas.map((_, index) => (
            <FontAwesome key={`full-${index}`} name="star" size={30} color="#34cee6" />
          ))}
          {data.data.estrellas.vacias.map((_, index) => (
            <FontAwesome key={`empty-${index}`} name="star-o" size={30} color="white" />
          ))}
        </View>
      </Pressable>
    </ImageBackground>
  );
};

export default TarjetaNivel;
