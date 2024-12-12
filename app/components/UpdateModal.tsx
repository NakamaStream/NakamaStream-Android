import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Linking } from 'react-native';

interface UpdateModalProps {
  visible: boolean;
  onClose: () => void;
  updateUrl: string;
  currentVersion: string;
  newVersion: string;
}

const UpdateModal = ({ visible, onClose, updateUrl, currentVersion, newVersion }: UpdateModalProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image 
            source={require('../../assets/images/icon.png')}
            style={styles.updateIcon}
          />
          <Text style={styles.title}>¡Nueva versión disponible!</Text>
          <Text style={styles.version}>
            Versión actual: {currentVersion}{'\n'}
            Nueva versión: {newVersion}
          </Text>
          <Text style={styles.message}>
            Actualiza para obtener las últimas mejoras y funcionalidades
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Más tarde</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.updateButton]}
              onPress={() => {
                Linking.openURL(updateUrl);
                onClose();
              }}
            >
              <Text style={styles.updateButtonText}>Actualizar ahora</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 25,
    width: width * 0.85,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  updateIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  version: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#ff6b6b',
    elevation: 3,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UpdateModal; 
