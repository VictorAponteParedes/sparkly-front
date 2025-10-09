import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useMeeting, RTCView } from "@videosdk.live/react-native-sdk";
import styles from '../styles';

const LocalVideoView: React.FC = () => {
    const {
        localWebcamOn,
        toggleWebcam,
        localMicOn,
        toggleMic,
        localParticipant
    } = useMeeting();

    // Solo mostrar si está unido
    if (!localParticipant) {
        return null;
    }

    return (
        <View style={styles.localVideoContainer}>
            <Text style={styles.videoLabel}>Tu cámara</Text>
            {localWebcamOn ? (
                <RTCView
                    streamURL={"local"}
                    style={styles.localVideo}
                    objectFit="cover"
                    mirror={true}
                />
            ) : (
                <View style={styles.videoPlaceholder}>
                    <Text style={styles.placeholderText}>📹 Cámara</Text>
                    <Text style={styles.placeholderSubtext}>
                        {localWebcamOn ? "Activada" : "Apagada"}
                    </Text>
                </View>
            )}
            <View style={styles.localControls}>
                <TouchableOpacity
                    style={[styles.controlButton, !localWebcamOn && styles.controlButtonOff]}
                    onPress={toggleWebcam}
                >
                    <Text style={styles.controlText}>
                        {localWebcamOn ? "📹" : "📹❌"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.controlButton, !localMicOn && styles.controlButtonOff]}
                    onPress={toggleMic}
                >
                    <Text style={styles.controlText}>
                        {localMicOn ? "🎤" : "🎤❌"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LocalVideoView;