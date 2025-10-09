import React from "react";
import { View, Text } from "react-native";
import { useParticipant, RTCView } from "@videosdk.live/react-native-sdk";
import styles from '../styles';

interface RemoteVideoViewProps {
    participantId: string;
}

const RemoteVideoView: React.FC<RemoteVideoViewProps> = ({ participantId }) => {
    const { webcamStream, webcamOn, displayName, isLocal } = useParticipant(participantId);

    // No mostrar el participante local
    if (isLocal) return null;

    return (
        <View style={styles.remoteVideoContainer}>
            <Text style={styles.videoLabel}>{displayName || "Usuario remoto"}</Text>
            {webcamOn && webcamStream ? (
                <RTCView
                    streamURL={webcamStream.toURL()}
                    style={styles.remoteVideo}
                    objectFit="cover"
                />
            ) : (
                <View style={styles.videoPlaceholder}>
                    <Text style={styles.placeholderText}>👤 {displayName}</Text>
                </View>
            )}
        </View>
    );
};

export default RemoteVideoView;