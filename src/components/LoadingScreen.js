import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

export default function LoadingScreen() {
    return (
        <ImageBackground
            // TODO: replace this image with our loading logo
            source={{ uri: 'https://media3.giphy.com/media/feN0YJbVs0fwA/giphy.gif'}}
            resizeMode="center"
            style={styles.background}
        />
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
