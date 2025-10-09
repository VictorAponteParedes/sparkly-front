import React from 'react';
import { View, Text } from 'react-native';
import { formatTime } from '../../../utils/timeUtils';
import styles from '../styles';

interface CallInfoProps {
    isConnected: boolean;
    callDuration: number;
    remoteConnected: boolean;
    hasPermissions: boolean;
}

export const CallInfo: React.FC<CallInfoProps> = ({
    isConnected,
    callDuration,
    remoteConnected,
    hasPermissions,
}) => {
    return (
        <View style={styles.callInfo}>
            <Text style={styles.durationText}>
                {isConnected ? formatTime(callDuration) : '00:00'}
            </Text>
            <Text style={styles.statusText}>
                {isConnected
                    ? remoteConnected
                        ? 'Conectado'
                        : 'Buscando persona...'
                    : hasPermissions
                        ? 'Listo para iniciar'
                        : 'Solicitando permisos...'}
            </Text>
        </View>
    );
};