import React from 'react';
import { View } from 'react-native';
import { GradientButton } from './GradientButton';
import { colors } from '../../../theme/theme';
import styles from '../styles';

interface CallControlsProps {
    isConnected: boolean;
    hasPermissions: boolean;
    isAudioOn: boolean;
    isVideoOn: boolean;
    handleStartCall: () => Promise<void>;
    toggleAudio: () => Promise<void>;
    toggleVideo: () => Promise<void>;
    handleEndCall: () => Promise<void>;
}

export const CallControls: React.FC<CallControlsProps> = ({
    isConnected,
    hasPermissions,
    isAudioOn,
    isVideoOn,
    handleStartCall,
    toggleAudio,
    toggleVideo,
    handleEndCall,
}) => {
    return (
        <View style={styles.controlsContainer}>
            {!isConnected ? (
                <GradientButton
                    iconName="videoCall"
                    iconSize={28}
                    iconColor={hasPermissions ? colors.white : colors.gray[400]}
                    text={hasPermissions ? 'Iniciar' : 'Iniciar (Sin permisos)'}
                    gradientColors={
                        hasPermissions
                            ? [colors.pink[500], colors.amethyst[500]]
                            : [colors.gray[500], colors.gray[600]]
                    }
                    style={[styles.controlButton, styles.startButton]}
                    onPress={handleStartCall}
                    disabled={false}
                />
            ) : (
                <>
                    <GradientButton
                        iconName={isAudioOn ? 'microfone' : 'microfoneOff'}
                        iconSize={24}
                        text={isAudioOn ? 'Mute' : 'Sonido'}
                        gradientColors={
                            isAudioOn
                                ? [colors.gray[600], colors.gray[700]]
                                : [colors.red[500], colors.red[600]]
                        }
                        style={styles.controlButton}
                        onPress={toggleAudio}
                    />
                    <GradientButton
                        iconName={isVideoOn ? 'camera' : 'cameraOff'}
                        iconSize={24}
                        text={isVideoOn ? 'Video' : 'Cámara'}
                        gradientColors={
                            isVideoOn
                                ? [colors.gray[600], colors.gray[700]]
                                : [colors.red[500], colors.red[600]]
                        }
                        style={styles.controlButton}
                        onPress={toggleVideo}
                    />
                    <GradientButton
                        iconName="phoneOff"
                        iconSize={24}
                        text="Colgar"
                        gradientColors={[colors.red[500], colors.red[600]]}
                        style={[styles.controlButton, styles.endCallButton]}
                        onPress={handleEndCall}
                    />
                </>
            )}
        </View>
    );
};