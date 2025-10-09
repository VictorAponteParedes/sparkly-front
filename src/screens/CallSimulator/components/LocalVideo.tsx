import React from 'react';
import { View, Text } from 'react-native';
import { LocalVideoTrack } from 'twilio-video';
import { Icon } from '../../../components/common/Icon';
import { colors } from '../../../theme/theme';
import styles from '../styles';

interface LocalVideoProps {
    hasPermissions: boolean;
    isVideoOn: boolean;
    localVideoTrack: LocalVideoTrack | null;
}

export const LocalVideo: React.FC<LocalVideoProps> = ({
    hasPermissions,
    isVideoOn,
    localVideoTrack,
}) => {
    if (!hasPermissions) {
        return (
            <View style={styles.videoPlaceholder}>
                <Text style={styles.videoPlaceholderText}>🔒 Sin permisos</Text>
            </View>
        );
    }

    if (!isVideoOn || !localVideoTrack) {
        return (
            <View style={styles.videoOffContainer}>
                <Icon name="profile" size={40} color={colors.gray[400]} />
                <Text style={styles.videoOffText}>Cámara apagada</Text>
            </View>
        );
    }

    return (
        <VideoTrack
            style={styles.video}
            track={localVideoTrack}
            enabled={isVideoOn}
        />
    );
};