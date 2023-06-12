import React from "react";
import { StyleSheet, ImageBackground, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function LoadingScreen() {

    const { t } = useTranslation();

    return (
        <ImageBackground
            // TODO: replace this image with our loading logo
            source={require("../assets/images/splash-screen.png")}
            style={styles.background}
        >
            <Text style={styles.text}>{t(`sura.loading`)}</Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
        zIndex: 100000000000,
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        fontFamily: 'regularFont',
        fontSize: 25,
        flex: 1,
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'flex-end',
        padding: 50,
    }
});
