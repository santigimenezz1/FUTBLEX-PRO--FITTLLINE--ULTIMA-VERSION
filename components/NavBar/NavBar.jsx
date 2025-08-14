import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './NavBarStyles';
import SelectorIdioma from '../SelectorIdioma/SelectorIdioma.jsx';

const NavBar = () => {

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container__navBar}>
                <View style={styles.container__navBar__titulo}>
                    <Image width={230} height={45} source={{uri:"https://res.cloudinary.com/dcf9eqqgt/image/upload/v1755174940/Dise%C3%B1o_sin_t%C3%ADtulo_97_n3vrvd.png"}}>   
                    </Image>
                </View>
                <View style={styles.container__navBar__menu}>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NavBar;
