import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function LoadingScreen() {
    const [mensaje, setMensaje] = useState('');

    const mensajesAleatorios = [
        "Cargando recursos...",
        "Preparando contenido...",
        "Obteniendo información...",
        "Sincronizando datos...", 
        "Iniciando servicios..."
    ];

    useEffect(() => {
        // Seleccionar mensaje aleatorio
        const mensajeRandom = mensajesAleatorios[Math.floor(Math.random() * mensajesAleatorios.length)];
        setMensaje(mensajeRandom);

        // Timer de 5 segundos
        const timer = setTimeout(() => {
            // Aquí puedes agregar la lógica para ocultar el LoadingScreen
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/BHAH.gif')}
                style={styles.animation}
            />
            <Text style={styles.texto}>{mensaje}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        zIndex: 999,
    },
    animation: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    texto: {
        marginTop: 20,
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
    }
});
