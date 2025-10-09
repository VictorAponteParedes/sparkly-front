import React from "react";
import { View, Text } from "react-native";
import { useParticipant, RTCView } from "@videosdk.live/react-native-sdk";

interface RemoteVideoViewProps {
    participantId: string;
}

const RemoteVideoView: React.FC<RemoteVideoViewProps> = ({ participantId }) => {
    const { webcamStream, webcamOn, displayName, isLocal } = useParticipant(participantId);

    // No renderizar el participante local
    if (isLocal) return null;

    console.log(`Rendering participant ${participantId}: webcamOn=${webcamOn}`);

    return (
        <View style={{ flex: 1, margin: 10, backgroundColor: "#000" }}>
            <Text style={{ color: "#fff", padding: 5 }}>{displayName || "Usuario remoto"}</Text>
            {webcamOn && webcamStream ? (
                <RTCView
                    streamURL={webcamStream.toURL()}
                    style={{ flex: 1 }}
                    objectFit="cover"
                />
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#333" }}>
                    <Text style={{ color: "#fff" }}>Cámara apagada o sin stream</Text>
                </View>
            )}
        </View>
    );
};

export default RemoteVideoView;