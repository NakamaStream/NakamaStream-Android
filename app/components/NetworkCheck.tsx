import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function NetworkCheck({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Image 
            source={require('../../assets/images/icon.png')}
          style={styles.image}
        />
        <Text style={styles.text}>No hay conexión a Internet</Text>
        <Text style={styles.subText}>Por favor, verifica tu conexión</Text>
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
}); 
