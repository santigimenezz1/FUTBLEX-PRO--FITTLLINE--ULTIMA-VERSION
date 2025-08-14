import { Pressable, Text, View, Alert, Image, ImageBackground, ScrollView } from "react-native";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/Context.jsx";
import { Query, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from "../../firebaseConfig.js";
import { showMessage } from "react-native-flash-message";

const Perfil = () => {
  const { setUsuarioOn, userRegistro, eliminarUsuario, idiomaActual, setIdiomaActual } = useContext(CartContext);
  const [userPerfil, setUserPerfil] = useState();
  const [idioma, setIdioma] = useState("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/espana_wyfm4p.png");
  const { userOnline } = useContext(CartContext);

  useEffect(() => {
    {idiomaActual === "espana" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/espana_wyfm4p.png")}
    {idiomaActual === "italia" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984646/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/italia_r7gxfl.png")}
    {idiomaActual === "francia" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/francia_bluayx.png")}
    {idiomaActual === "bandera" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/bandera_ykvinl.png")}
    {idiomaActual === "paisesBajos" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1746973779/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/paisesBajos_fo5ey6.png")}
    {idiomaActual === "inglaterra" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/inglaterra_vgobrt.png")}
    {idiomaActual === "estadosUnidos" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747076206/estadosUnidos_x4bgrp.png")}
    {idiomaActual === "portugal" && setIdioma("https://res.cloudinary.com/dcf9eqqgt/image/upload/v1746808357/portugal_ynpltt.png")}
  }, []);

  const obtenerNombrePais = (url) => {
    const match = url.match(/\/([^\/_]+)_\w+\.png$/);
    const pais = match ? match[1].replace(/-/g, " ") : null;
    setIdiomaActual(pais)
  };

  const actualizarPaisUsuario = async (idioma) => {
    try {
      const userCollectionRef = collection(db, "usuarios");
      const q = query(userCollectionRef, where("email", "==", userOnline.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userDocRef = userDoc.ref;
        await updateDoc(userDocRef, { pais: idioma });
        console.log("País actualizado correctamente a:", idioma);
      } else {
        console.error("Usuario no encontrado.");
      }
    } catch (error) {
      console.error("Error al actualizar el país:", error);
    }
  };

  const cambiarIdioma = async (idioma) => {
    setIdioma(idioma);
    const match = idioma.match(/\/([^\/_]+)_\w+\.png$/);
    const pais = match ? match[1].replace(/-/g, " ") : null;

    showMessage({
      message: '✅',
      type: 'success',
      style: {
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },
      titleStyle: {
        fontSize: 20,
        textAlign: 'center',
      },
    });

    actualizarPaisUsuario(pais);
    setIdiomaActual(pais);
  };

  const urlIdiomas = {
    españa: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/espana_wyfm4p.png",
    italia: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984646/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/italia_r7gxfl.png",
    francia: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/francia_bluayx.png",
    inglaterra: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/inglaterra_vgobrt.png",
    estadosUnidos: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1747076206/estadosUnidos_x4bgrp.png",
    paisesBajos: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1746973779/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/paisesBajos_fo5ey6.png",
    alemania: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1725984645/APP%20ALFOMBRA%20DE%20FUTBOL%20AMAZON/bandera_ykvinl.png",
    portugal: "https://res.cloudinary.com/dcf9eqqgt/image/upload/v1746808357/portugal_ynpltt.png"
  };

  useEffect(() => {
    const fetchUserByEmail = async (email) => {
      const userCollectionRef = collection(db, "usuarios");
      const q = query(userCollectionRef, where("email", "==", userRegistro.email));
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUserPerfil(userDoc.data());
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUserByEmail("test3@gmail.com");
  }, []);

  const handleEliminarCuenta = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar tu cuenta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aceptar",
          onPress: () => {
            eliminarUsuario();
            showMessage({
              message: 'Cuenta eliminada con éxito',
              type: 'success',
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

return (
  <ImageBackground
    source={{ uri: 'https://res.cloudinary.com/dcf9eqqgt/image/upload/v1754508619/Dise%C3%B1o_sin_t%C3%ADtulo_40_x7dgir.png' }}
    style={{ flex: 1 }}
    imageStyle={{ opacity: 1 }}
  >
    {/* Capa negra encima para oscurecer el fondo */}
    <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />

    <ScrollView contentContainerStyle={{ padding: 20, zIndex: 2 }}>
      <NavBar />
      <View style={{ marginTop: 20 }}>
        {idiomaActual === "espana" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Cambiar idioma</Text>}
        {idiomaActual === "italia" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Cambiare lingua</Text>}
        {idiomaActual === "francia" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Changer de langue</Text>}
        {idiomaActual === "bandera" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Sprache wechseln</Text>}
        {idiomaActual === "inglaterra" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Change language</Text>}
        {idiomaActual === "estadosUnidos" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Change language</Text>}
        {idiomaActual === "paisesBajos" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Gesproken talen</Text>}
        {idiomaActual === "portugal" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Alterar idioma</Text>}

        <View style={{ alignItems: "center", gap: 10, marginTop: 15 }}>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
            <Pressable onPress={() => cambiarIdioma(urlIdiomas.españa)}><Image width={70} height={60} source={{ uri: urlIdiomas.españa }} /></Pressable>
            <Pressable onPress={() => cambiarIdioma(urlIdiomas.italia)}><Image width={70} height={60} source={{ uri: urlIdiomas.italia }} /></Pressable>
            <Pressable onPress={() => cambiarIdioma(urlIdiomas.francia)}><Image width={70} height={60} source={{ uri: urlIdiomas.francia }} /></Pressable>
            <Pressable onPress={() => cambiarIdioma(urlIdiomas.inglaterra)}><Image width={70} height={60} source={{ uri: urlIdiomas.inglaterra }} /></Pressable>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", gap: 10, marginTop: 10 }}>
            <Pressable onPress={() => cambiarIdioma(urlIdiomas.estadosUnidos)}><Image width={70} height={60} source={{ uri: urlIdiomas.estadosUnidos }} /></Pressable>
            <Pressable onPress={() => cambiarIdioma(urlIdiomas.paisesBajos)}><Image width={70} height={60} source={{ uri: urlIdiomas.paisesBajos }} /></Pressable>
            <Pressable onPress={() => cambiarIdioma(urlIdiomas.alemania)}><Image width={70} height={60} source={{ uri: urlIdiomas.alemania }} /></Pressable>
            <Pressable onPress={() => cambiarIdioma(urlIdiomas.portugal)}><Image width={70} height={60} source={{ uri: urlIdiomas.portugal }} /></Pressable>
          </View>
        </View>

        {idiomaActual === "espana" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Idioma actual</Text>}
        {idiomaActual === "italia" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Lingua attuale</Text>}
        {idiomaActual === "francia" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Langue actuelle</Text>}
        {idiomaActual === "bandera" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Aktuelle Sprache</Text>}
        {idiomaActual === "paisesBajos" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Huidige taal</Text>}
        {idiomaActual === "inglaterra" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Current language</Text>}
        {idiomaActual === "estadosUnidos" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Current language</Text>}
        {idiomaActual === "portugal" && <Text style={{ color: "white", fontSize: 20, textAlign: "center", letterSpacing: 2 }}>Idioma atual</Text>}

        <View style={{ alignItems: "center", gap: 5, marginTop: 15 }}>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 15 }}>
            <Pressable>
              <Image width={70} height={60} source={{ uri: idioma }} />
            </Pressable>
          </View>

          {idiomaActual === "espana" && <Text style={{ color: "white", fontSize: 16, textAlign: "center", letterSpacing: 2 }}>España</Text>}
          {idiomaActual === "italia" && <Text style={{ color: "white", fontSize: 16, textAlign: "center", letterSpacing: 2 }}>Italia</Text>}
          {idiomaActual === "francia" && <Text style={{ color: "white", fontSize: 16, textAlign: "center", letterSpacing: 2 }}>France</Text>}
          {idiomaActual === "bandera" && <Text style={{ color: "white", fontSize: 16, textAlign: "center", letterSpacing: 2 }}>Germany</Text>}
          {idiomaActual === "inglaterra" && <Text style={{ color: "white", fontSize: 16, textAlign: "center", letterSpacing: 2 }}>England</Text>}
          {idiomaActual === "estadosUnidos" && <Text style={{ color: "white", fontSize: 16, textAlign: "center", letterSpacing: 2 }}>United States</Text>}
          {idiomaActual === "paisesBajos" && <Text style={{ color: "white", fontSize: 16, textAlign: "center", letterSpacing: 2 }}>Netherlands</Text>}
          {idiomaActual === "portugal" && <Text style={{ color: "white", fontSize: 16, textAlign: "center", letterSpacing: 2 }}>Portugal</Text>}
        </View>
      </View>
    </ScrollView>
  </ImageBackground>
);


};

export default Perfil;