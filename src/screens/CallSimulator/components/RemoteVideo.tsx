import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

interface RemoteVideoProps {
    isConnected: boolean;
    remoteConnected: boolean;
}

export const RemoteVideo: React.FC<RemoteVideoProps> = ({
    isConnected,
    remoteConnected,
}) => {
    if (!isConnected) {
        return (
            <View style={styles.videoPlaceholder}>
                <Text style={styles.videoPlaceholderText}>👤 Conectando...</Text>
            </View>
        );
    }

    if (!remoteConnected) {
        return (
            <View style={styles.videoPlaceholder}>
                <Text style={styles.videoPlaceholderText}>🔍 Buscando persona...</Text>
            </View>
        );
    }

    return (
        <View style={styles.videoPlaceholder}>
            <Text style={styles.videoPlaceholderText}>👤 Simulación de usuario remoto</Text>
        </View>
    );
};