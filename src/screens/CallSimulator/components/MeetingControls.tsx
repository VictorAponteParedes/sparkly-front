import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import styles from '../styles';

interface MeetingControlsProps {
    onEndCall: () => void;
    meetingId: string;
}

const MeetingControls: React.FC<MeetingControlsProps> = ({ onEndCall, meetingId }) => {
    const {
        leave,
        toggleWebcam,
        toggleMic,
        localWebcamOn,
        localMicOn,
        localParticipant
    } = useMeeting();

    // Solo mostrar controles si está unido
    if (!localParticipant) {
        return null;
    }

    return (
        <View style={styles.controlsContainer}>
            <Text style={styles.controlsTitle}>Controles</Text>
            <View style={styles.controlsRow}>
                <TouchableOpacity
                    style={[styles.controlButton, !localMicOn && styles.controlButtonOff]}
                    onPress={toggleMic}
                >
                    <Text style={styles.controlText}>
                        {localMicOn ? "🎤" : "🎤❌"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.controlButton, !localWebcamOn && styles.controlButtonOff]}
                    onPress={toggleWebcam}
                >
                    <Text style={styles.controlText}>
                        {localWebcamOn ? "📹" : "📹❌"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.controlButton, styles.endCallButton]}
                    onPress={() => {
                        leave();
                        onEndCall();
                    }}
                >
                    <Text style={[styles.controlText, styles.endCallText]}>📞 Colgar</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.meetingId}>Sala: {meetingId}</Text>
        </View>
    );
};

export default MeetingControls;